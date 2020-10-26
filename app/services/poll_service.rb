# frozen_string_literal: true

# Service for managing poll
class PollService
  NEEDED_FOR_ANSWERS = %i[poll_options categories].freeze

  def initialize(user)
    @user = user
  end

  # Revisit includes doesn't seem to work
  def users_polls
    Poll.where(user: @user).includes(NEEDED_FOR_ANSWERS)
  end

  def polls_for_user
    polls_rel = polls_rel

    # when user is not logged in
    return polls_rel unless @user

    user_details = @user.details

    return polls_rel unless user_details # currently not creating user details by default

    qry = ''
    binds = []

    age_group = user_details.age_group
    if age_group.present?
      qry += 'age_group_ids && Array[?]::Integer[]'
      binds << [age_group]
    end

    if (category_ids = @user.category_ids).present?
      polls_rel = polls_rel.joins(:categories)
      qry += 'OR categories.id IN (?)'
      binds << category_ids
    end

    polls_rel.where(qry, *binds)
  end

  def answers_for_poll(poll_id)
    Poll.includes(NEEDED_FOR_ANSWERS).find_by_id(poll_id)
  end

  def user_responded_polls
    @user.responded_polls.includes(NEEDED_FOR_ANSWERS)
  end

  def answer_poll(poll_id, option_id)
    po_id = PollOption.find_by(poll_id: poll_id, option_id: option_id).id
    answer = @user.poll_answers.joins(:poll).where('polls.id = ?', poll_id).take

    PollAnswer.create(poll_option_id: po_id, user_id: @user.id) and return unless answer

    return if answer.poll_option_id == po_id # user responded for same answer

    answer.poll_option_id = po_id
    answer.save
  end

  def create(params)
    poll_params = params.slice('question', 'category_ids', 'age_group_ids')
    if poll_params['age_group_ids']
      poll_params['age_group_ids'] = (poll_params['age_group_ids'].map(&:to_i) & Poll::Age::GROUPING.keys)
    end
    poll = Poll.new(poll_params)
    poll.user_id = @user.id
    poll.options_attributes = params['options'].each_with_object([]) do |opts, opt|
      existing_opt = Option.find_by_name(opt)
      existing_opt ? poll.options << existing_opt : opts << { name: opt }
    end
    poll.save
    poll
  end

  def destroy(params)
    poll = @user.polls.find_by_id(params[:id])

    return false unless poll

    poll.destroy

    poll.destroyed?
  end

  def search_polls(terms)
    polls_rel = polls_rel
    search(polls_rel, terms)
  end

  def search_users_polls(terms)
    # avoid calling child class (Web::PollService/Api::PollService) method
    polls_rel = PollService.instance_method(:users_polls).bind(self).call
    search(polls_rel, terms)
  end

  def search_user_responded_polls(terms)
    # avoid calling child class (Web::PollService/Api::PollService) method
    polls_rel = PollService.instance_method(:user_responded_polls).bind(self).call
    search(polls_rel, terms)
  end

  private

  def polls_rel
    Poll.includes(%i[categories options])
  end

  # Guess its time to pull this into a query builder ?
  def search(polls_rel, terms)
    # If the age_group is empty or contains only group - All then dont filter based on age_group
    terms = (terms.is_a?(String) ? JSON.parse(terms) : terms).with_indifferent_access # why is this happening, analyze
    if (age_group = terms[:age_group_ids]).present?
      age_group = age_group.map(&:to_i)
      age_all = Poll::Age::GROUPING.key(Poll::Age::ALL)
      unless age_group.include?(age_all)
        age_group << age_all # include age_group - All, for all.
        polls_rel = polls_rel.where('age_group_ids && Array[?]::Integer[]', age_group)
      end
    end
    if terms[:category_ids].present?
      polls_rel = polls_rel.joins(:categories).where('categories.id IN (?)', terms[:category_ids])
    end

    polls_rel = polls_rel.where('polls.question ilike ?', "%#{terms[:term]}%") if terms[:term].present?

    polls_rel.distinct.reorder(:created_at)
  end
end

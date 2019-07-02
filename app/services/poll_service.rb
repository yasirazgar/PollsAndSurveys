class PollService
  NEEDED_FOR_ANSWERS = [:polls_options, :categories]

  def initialize(user)
    @user = user
  end

  def get_users_polls # Revisit includes doesn't seem to work
    Poll.where(user: @user)
        .includes(NEEDED_FOR_ANSWERS)
  end
  alias_method :users_polls, :get_users_polls

  def get_polls_for_user
    # user_details = @user.details
    Poll.includes([:categories, :options])
  end
  alias_method :polls_for_user, :get_polls_for_user

  def get_answers_for_poll(poll_id)
    Poll.includes(NEEDED_FOR_ANSWERS).find_by_id(poll_id)
  end

  def get_user_responded_polls
    @user.responded_polls.includes(NEEDED_FOR_ANSWERS)
  end
  alias_method :user_responded_polls, :get_user_responded_polls

  def answer_poll(poll_id, option_id)
    po_id = PollsOptions.find_by(poll_id: poll_id, option_id: option_id).id
    answer = @user.poll_answers.joins(:poll).where("polls.id = ?", poll_id).take
    unless answer
      PollAnswer.create(polls_options_id: po_id, user_id: @user.id)
      return
    end

    if answer.polls_options_id != po_id # user responded for same answer
      answer.polls_options_id = po_id
      answer.save
    end
  end

  def create(params)
    poll_params = params.slice(:question, :category_ids, :age_group_ids)
    if poll_params[:age_group_ids]
      poll_params[:age_group_ids] = (poll_params[:age_group_ids].map(&:to_i) & Poll::Age::GROUPING.keys)
    end
    poll = Poll.new(poll_params.slice(:question, :category_ids, :age_group_ids))
    poll.user_id = @user.id
    poll.options_attributes = params[:options].inject([]) do |opts, opt|
      if (existing_opt = Option.find_by_name(opt))
        poll.options << existing_opt
      else
        opts << {name: opt}
      end
      opts
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
    polls_rel = polls_for_user
    search(polls_rel, terms)
  end

  def search_users_polls(terms)
    polls_rel = users_polls
    search(polls_rel, terms)
  end

  def search_user_responded_polls(terms)
    polls_rel = user_responded_polls
    search(polls_rel, terms)
  end

  private

  # Guess its time to pull this into a query builder ?
  def search(polls_rel, terms)
    # If the age_group is empty or contains only group - All then dont filter based on age_group
    if (age_group = terms[:age_group_ids]).present?
      age_group = age_group.map(&:to_i)
      age_all = Poll::Age::GROUPING.key(Poll::Age::ALL)
      unless age_group.include?(age_all)
        age_group << age_all # include age_group - All, for all.
        polls_rel = polls_rel.where("age_group_ids && Array[?]::Integer[]", age_group)
      end
    end
    if terms[:category_ids].present?
      polls_rel = polls_rel.joins(:categories).where("categories.id IN (?)", terms[:category_ids])
    end
    if terms[:term].present?
      polls_rel = polls_rel.where("polls.question ilike ?", "%#{terms[:term]}%")
    end

    polls_rel
  end
end

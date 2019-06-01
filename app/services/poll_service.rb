class PollService
  NEEDED_FOR_ANSWERS = [:polls_options, :categories]

  def initialize(user)
    @user = user
  end

  def get_users_polls # Revisit includes doesn't seem to work
    Poll.where(user: @user)
        .includes(NEEDED_FOR_ANSWERS)
  end

  def get_polls_for_user
    # user_details = @user.details
    Poll.includes([:categories, :options])
  end

  def get_answers_for_poll(poll_id)
    Poll.includes(NEEDED_FOR_ANSWERS).find_by_id(poll_id)
  end

  def get_user_responded_polls
    @user.poll_answers.includes(poll: NEEDED_FOR_ANSWERS)
  end

  def answer_poll(poll_id, option_id)
    po_id = PollsOptions.find_by(poll_id: poll_id, option_id: option_id).id
    PollAnswer.create(polls_options_id: po_id, user_id: @user.id)
  end

  def create(params)
    poll = Poll.new(params.slice(:question, :category_ids))
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

end
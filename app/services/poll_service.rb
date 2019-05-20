class PollService
  def initialize(user)
    @user = user
  end

  def get_users_polls # Revisit includes doesn't seem to work
    Poll.where(user: @user)
        .includes([:categories, :polls_options])
  end

  def get_polls_for_user
    # user_details = @user.details
    Poll.includes([:categories, :options])
  end

  def get_answers_for_poll(poll)
    poll.includes(poll_answers: :option)
  end

  def get_user_responded_polls
    PollAnswer.where(user: @user).includes(polls_options: [:option, :poll_answers])
  end

  def create(params)
    poll = Poll.new(params.slice(:question, :category_ids))
    poll.user_id = @user.id
    poll.options_attributes = params[:options].inject([]) do |opts, opt|
      if (existing_opt = Option.find_by_option(opt))
        poll.options << existing_opt
      else
        opts << {option: opt}
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
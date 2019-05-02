module PollsHelper
  def get_users_polls
    Poll.where(user: user)
        .eager_load(:options, {:poll_answers => :option}) # Need to use join and load
        .where("poll_answers.user_id = ?", user.id)
  end

  def get_polls_for_user(user)
    # user_details = user.details
    Poll.includes(polls_options: :option)
  end

  def get_answers_for_poll(poll)
    poll.includes(poll_answers: :option)
  end

  def get_user_responded_polls
    PollAnswer.where(user: current_user).includes(polls_options: [:option, :poll_answers])
  end

  def create_poll
    poll_params = params.require(:poll).permit(:question, category_ids: [], options: [])

    poll = Poll.new(poll_params.slice(:question, :category_ids))
    poll.user_id = current_user.id
    poll.options_attributes = poll_params[:options].inject([]) do |opts, opt|
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
end

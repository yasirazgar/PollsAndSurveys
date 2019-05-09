class PollsController < ApplicationController
  include PollsHelper #change this to service
  include PollsFormater

  def index
    polls = get_polls_for_user

    render json: {polls: format_polls(polls)} #pull categories into separate controller
  end

  def create
    poll = create_poll

    if poll.errors.present?
      render json: {message: poll.errors.full_messages.join(',')}
    else
      render json: {poll_id: poll.id, message: 'Poll created successfully'}
    end
  end

  def destroy
    Poll.destroy(params[:id])

    render json: {message: "Poll destroyed successfully"}
  end

end

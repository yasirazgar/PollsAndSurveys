class PollsController < ApplicationController
  def index
    polls = poll_service.get_polls_for_user

    render json: {polls: polls}
  end

  def create
    poll = poll_service.create(params)

    if poll.errors.present?
      render json: {message: poll.errors.full_messages.join(',')}, status: :bad_request
    else
      render json: {poll_id: poll.id, message: 'Poll created successfully'}
    end
  end

  def destroy
    poll = current_user.polls.find_by_id(params[:id])

    if poll && poll.destroy
      render json: {message: "Poll destroyed successfully"}
      return
    end

    render json: {message: "Error destroying poll"}, status: :not_found
  end

  private

  def poll_service
    @poll_service ||= Web::PollService.new(current_user)
  end

end

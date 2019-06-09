class PollsController < ApplicationController
  include PollsConcern

  def index
    polls = poll_service.get_polls_for_user

    render json: {polls: polls}
  end

  def create
    poll_params = params.require(:poll).permit(:question, category_ids: [], options: [], age_group: [])
    poll = poll_service.create(poll_params)

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

  def answer
    poll_with_ans = poll_service.answer_poll(params[:id], params[:option_id])

    render json: {poll: poll_with_ans, message: "Answer recorded successfully"}
  end

  def search
    type = params[:type]
    polls = poll_service.send('search_'+type, params[:terms])

    render json: {polls: polls}
  end

end

class PollsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index]

  include PollsConcern

  def index
    if current_user
      polls = poll_service.get_polls_for_user
    else
      polls = Web::PollService.get_polls
    end

    render json: {polls: polls}
  end

  def create
    poll_params = params.require(:poll).permit(:question, category_ids: [], options: [], age_group_ids: [])
    poll = poll_service.create(poll_params)

    if poll.errors.present?
      render json: {message: poll.errors.full_messages.join(',')}, status: :bad_request
    else
      render json: {poll_id: poll.id}
    end
  end

  def destroy
    poll = current_user.polls.find_by_id(params[:id])

    if poll && poll.destroy
      render json: {}
      return
    end

    render json: {}, status: :not_found
  end

  def answer
    poll_with_ans = poll_service.answer_poll(params[:id], params[:option_id])

    render json: {poll: poll_with_ans}
  end

  # maybe its good to split this into three separate methods for each type
  def search
    type = params[:type]
    polls = poll_service.send('search_'+type, params[:terms])

    render json: {polls: polls}
  end

end

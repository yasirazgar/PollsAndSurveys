class UserController < ApplicationController
  include PollsConcern

  def polls
    polls = poll_service.get_users_polls

    render json: {polls: polls}
  end

  def responded_polls
    polls = poll_service.get_user_responded_polls

    render json: {polls: polls}
  end
end

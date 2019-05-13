class UserController < ApplicationController
  def polls
    polls = Web::PollService.new(current_user).get_users_polls

    render json: {polls: polls}
  end
end

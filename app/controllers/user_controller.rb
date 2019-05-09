class UserController < ApplicationController
  include PollsHelper
  include PollsFormater

  def create
  end

  def update
  end

  def polls
    polls = get_users_polls

    render json: {polls: format_users_polls(polls)}
  end
end

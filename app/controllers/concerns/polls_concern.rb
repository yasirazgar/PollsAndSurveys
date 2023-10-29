# frozen_string_literal: true

module PollsConcern
  private

  def poll_service
    @poll_service ||= Web::PollService.new(current_user)
  end
end

module Api::V1::PollsConcern
  private

  def poll_service
    @poll_service ||= Api::V1::PollService.new(current_user)
  end

end

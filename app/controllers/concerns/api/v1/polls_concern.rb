# frozen_string_literal: true

module Api
  module V1
    module PollsConcern
      private

      def poll_service
        @poll_service ||= Api::V1::PollService.new(current_user)
      end
    end
  end
end

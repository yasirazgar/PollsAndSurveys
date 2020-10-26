# frozen_string_literal: true

module Api
  module V1
    class PollsController < ApplicationController
      include Api::V1::PollsConcern

      skip_before_action :authenticate_request, only: [:index]

      def index
        polls = poll_service.polls_for_user

        render json: { polls: polls }
      end

      def create
        poll = poll_service.create(create_params)

        if poll.errors.present?
          render json: { message: poll.errors.full_messages.join(',') }, status: :bad_request
        else
          render json: { poll_id: poll.id, message: t('actions.poll.create.success') }
        end
      end

      def destroy
        poll = current_user.polls.find_by_id(params[:id])

        if poll&.destroy
          render json: { polls: poll_service.users_polls }
          return
        end

        render json: {}, status: :not_found
      end

      def answer
        poll_with_ans = poll_service.answer_poll(params[:id], params[:option_id])

        render json: { poll: poll_with_ans }
      end

      # maybe its good to split this into three separate methods for each type
      def search
        type = params[:type]
        polls = poll_service
                .send('search_' + type, params[:terms].permit(:term, age_group_ids: [], category_ids: []).to_h)

        render json: { polls: polls }
      end

      private

      def create_params
        params.require(:poll).permit(:question, category_ids: [], options: [], age_group_ids: []).to_h
      end
    end
  end
end

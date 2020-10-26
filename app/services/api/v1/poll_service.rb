# frozen_string_literal: true

module Api
  module V1
    # Api poll service
    class PollService < PollService
      def polls_for_user
        polls = super
        format_polls(polls)
      end

      def users_polls
        polls = super
        format_polls_with_answer(polls)
      end

      def answer_poll(poll_id, option_id)
        super
        answers_for_poll(poll_id)
      end

      def answers_for_poll(poll_id)
        poll = super
        format_poll_with_answer(poll)
      end

      def user_responded_polls
        polls = super
        format_polls_with_answer(polls)
      end

      def create(params)
        super
      end

      def search_polls(terms)
        polls = super
        format_polls(polls)
      end

      def search_users_polls(terms)
        polls = super
        format_polls_with_answer(polls)
      end

      def search_user_responded_polls(terms)
        polls = super
        format_polls_with_answer(polls)
      end

      private

      def format_polls(polls)
        polls.map(&method(:format_poll))
      end

      def format_poll(poll)
        {
          poll_id: poll.id,
          question: poll.question,
          categories: poll.categories.ids_codes,
          options: poll.options.each_with_object({}) do |hash, opt|
            hash[opt.name] = { option_id: opt.id }
          end
        }
      end

      def format_polls_with_answer(polls)
        polls.map(&method(:format_poll_with_answer))
      end

      def format_poll_with_answer(poll)
        { poll_id: poll.id,
          question: poll.question,
          categories: poll.categories.ids_codes,
          options: answer_data(poll)
        }
      end

      # convert to query
      def answer_data(poll)
        total = poll.poll_answers.count

        return populate_answer_data(poll, total) unless total.zero?

        h = Hash.new do |hash, option|
          if option.is_a?(Array)
            option.each { |opt| hash[opt] }
          else
            hash[option.name] = { option_id: option.id, percentage: 0.0, selected: false }
          end
        end
        h[poll.options.to_a]
        h
      end

      def populate_answer_data(poll, total)
        data = poll.poll_options.each_with_object({}) do |hash, po|
          answer_details(po, hash, total)
        end

        user_ans = poll.poll_answers.includes(:option).find_by_user_id(@user.id)
        data[user_ans.option.name][:selected] = true if user_ans

        data
      end

      def answer_details(poll_option, total_answers)
        option = poll_option.option
        percentage = ((poll_option.poll_answers.count.to_f / total_answers) * 100).round(1)
        hash[option.name] = { option_id: option.id, percentage: percentage, selected: false }
      end
    end
  end
end

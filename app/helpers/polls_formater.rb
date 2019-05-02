module PollsFormater
  def format_polls(polls)
    polls.map(&method(:format_poll))
  end

  def format_poll(poll)
    {
      question: poll.question,
      categories: poll.categories,
      options: poll.options.map(&:option)
    }
  end

  def format_poll_with_answer(poll)
    {
      question: poll.question,
      categories: poll.categories,
      options: poll.poll_answers.inject({}){|h,a|
        count = h[a.polls_options.option.option] ||= 0
        h[a.polls_options.option.option] = count + 1
        h
      } # poll.poll_answers.join(:options).group('options.option').count # convert to group query
    }
  end

  def format_polls_with_answer(polls)
    polls.map(&method(:format_poll_with_answer))
  end

  def format_users_polls(polls)
    polls.map(&method(:format_user_poll))
  end

  def format_users_poll(poll)
    {
      question: poll.question,
      categories: poll.categories,
      options: poll.poll_ansers.inject({}){ |h,a|
        h[a.polls_options.option.option] ||= [0, false]
        count = h[a.polls_options.option.option][0] + 1
        h[a.polls_options.option.option][0] = count
        h[a.polls_options.option.option][1] = true if poll.poll_answers.user_id == current_user.id
      }
    }
  end
end

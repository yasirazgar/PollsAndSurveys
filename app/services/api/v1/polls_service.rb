class Api::V1::PollsService < PollsService

  def get_users_polls
    polls = super()
    format_polls(polls)
  end

  def get_polls_for_user
    polls = super()
    format_users_polls(polls)
  end

  def get_answers_for_poll(poll)
    polls = super()
  end

  def get_user_responded_polls
    polls = super()
  end

  def create
    poll = super()
  end

  def format_polls(polls)
    polls.map(&method(:format_poll))
  end

  def format_poll(poll)
    {
      poll_id: poll.id,
      question: poll.question,
      categories: poll.categories,
      options: poll.options.map(&:option)
    }
  end

  def format_poll_with_answer(poll)
    { poll_id: poll.id,
      question: poll.question,
      categories: poll.categories,
      options: poll.poll_answers.inject({}){|h,a|
        count = h[a.polls_options.option.name] ||= 0
        h[a.polls_options.option.name] = count + 1
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

  def format_user_poll(poll)
    {
      poll_id: poll.id,
      question: poll.question,
      categories: poll.categories,
      options: poll.poll_answers.inject({}){ |h,ans| # convert to query
        h[ans.polls_options.option.name] ||= [0, false]
        count = h[ans.polls_options.option.name][0] + 1
        h[ans.polls_options.option.name][0] = count
        h[ans.polls_options.option.name][1] = true if ans.user_id == current_user.id
        h
      }
    }
  end

  def user_answer_data(poll)
    total = poll.poll_answers.count
    hash = poll.poll_answers.inject({}){ |h,ans| # convert to query
      h[ans.polls_options.option.name] ||= [0, false]
      count = h[ans.polls_options.option.name][0] + 1
      h[ans.polls_options.option.name][0] = count
      h[ans.polls_options.option.name][1] = true if ans.user_id == current_user.id
      h
    }
    hash.keys.each do |opt|
      count = hash[opt][0]
      percentage = ((count.to_f/total.to_f) * 100).round(2)
      selected = hash[opt][0]
      hash[opt] = {percentage: percentage, selected: selected}
    end

    hash
  end

end
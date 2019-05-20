class Web::PollService < PollService

  def get_users_polls
    polls = super()
    format_users_polls(polls)
  end

  def get_polls_for_user
    polls = super()
    format_polls(polls)
  end

  def get_answers_for_poll(poll)
    polls = super()
  end

  def get_user_responded_polls
    polls = super()
  end

  def create(params)
    poll = super(params)
  end

  def format_polls(polls)
    polls.map(&method(:format_poll))
  end

  def format_poll(poll)
    {
      poll_id: poll.id,
      question: poll.question,
      categories: poll.categories.pluck(:id, :name),
      options: poll.options.map(&:option)
    }
  end

  def format_poll_with_answer(poll)
    { poll_id: poll.id,
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

  def format_user_poll(poll)
    {
      poll_id: poll.id,
      question: poll.question,
      categories: poll.categories.pluck(:id, :name),
      options: answer_data(poll)
    }
  end

  # convert to query
  def answer_data(poll)
    total = poll.poll_answers.count
    return populate_answer_data(poll, total) unless total.zero?

    h = Hash.new { |hash, key| key.is_a?(Array) ? key.each{|h| hash[h]} : hash[key]={percentage: 0, selected: false} }
    h[poll.options.pluck(:option)]
    h
  end

  def populate_answer_data(poll, total)
    data = poll.polls_options.inject({}){ |hash,po|
      option = po.option.option
      hash[option] = {
        percentage: ((po.poll_answers.count.to_f/total.to_f) * 100).round(1),
        selected: false
      }

      hash
    }
    if user_ans = poll.poll_answers.includes(:option).find_by_user_id(@user.id)
      data[user_ans.option.option][:selected] = true
    end

    data
  end

end
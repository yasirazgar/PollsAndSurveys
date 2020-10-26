class Api::V1::PollService < PollService
  def get_polls_for_user
    polls = super
    format_polls(polls)
  end

  def get_users_polls
    polls = super
    format_polls_with_answer(polls)
  end

  def answer_poll(poll_id, option_id)
    super
    get_answers_for_poll(poll_id)
  end

  def get_answers_for_poll(poll_id)
    poll = super
    format_poll_with_answer(poll)
  end

  def get_user_responded_polls
    polls = super
    format_polls_with_answer(polls)
  end

  def create(params)
    poll = super
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
      options: poll.options.inject({}){|hash, opt|
        hash[opt.name]={option_id: opt.id}
        hash}
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
    unless total.zero?
      return populate_answer_data(poll, total)
    end

    h = Hash.new { |hash, option|
      option.is_a?(Array) ? option.each{|h| hash[h]} : hash[option.name]={option_id: option.id, percentage: 0.0, selected: false}
    }
    h[poll.options.to_a]
    h
  end

  def populate_answer_data(poll, total)
    data = poll.poll_options.inject({}){ |hash,po|
      option = po.option
      hash[option.name] = {
        option_id: option.id,
        percentage: ((po.poll_answers.count.to_f/total.to_f) * 100).round(1),
        selected: false
      }

      hash
    }
    if user_ans = poll.poll_answers.includes(:option).find_by_user_id(@user.id)
      data[user_ans.option.name][:selected] = true
    end

    data
  end

end
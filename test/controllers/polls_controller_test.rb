require 'test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    sign_in_as users(:yasir)

    Web::PollService.any_instance.expects(get_users_polls)

    get(polls_url, xhr: true)
    assert_response :success
  end

  test "create" do
    cat = categories(:it)
    sign_in_as users(:yasir)

    params = {
      poll: {
        question: 'My question',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: [cat.id],
      }
    }

    assert_difference('Poll.count', 1) do
      post(polls_url, params: params, xhr: true)
    end
    assert_response :success
    assert 'Poll created successfully', json_response[:message]

    poll = Poll.find_by_question params[:poll][:question]
    assert poll
    assert_equal params[:poll][:options].sort, poll.options.map(&:option).sort
    assert_equal params[:poll][:category_ids], poll.categories.map(&:id)
  end

  test "create-with duplicate question" do
    cat = categories(:it)
    user = users(:yasir)
    sign_in_as user
    dup_question = 'Fav snake'

    sign_in_as user

    params = {
      poll: {
        question: dup_question,
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: [cat.id],
      }
    }

    assert_difference('Poll.count', 0) do
      post(polls_url, params: params, xhr: true)
    end

    assert_response :bad_request
    assert 'Question is already used by you', json_response[:message]
  end

  test "destroy" do
    user = users(:yasir)
    poll = polls(:yasir_snake)

    sign_in_as user

    assert_difference('Poll.count', -1) do
      delete(poll_url(poll), xhr: true)
    end

    assert_response :success
    assert 'Poll destroyed successfully', json_response[:message]
  end

  test "destroy - other users polls" do
    user = users(:yasir)
    sign_in_as user
    other_user_poll = polls(:david_gems)

    assert_difference('Poll.count', 0) do
      delete(poll_url(other_user_poll), xhr: true)
    end

    assert_response :not_found
    assert 'Error destroying poll', json_response[:message]
  end
end

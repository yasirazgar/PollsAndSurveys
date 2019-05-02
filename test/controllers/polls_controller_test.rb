require 'test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    user = FactoryBot.create(:user)
    sign_in_as user

    get(polls_url, xhr: true)
    assert_response :success
  end

  test "create" do
    user = FactoryBot.create(:user)
    cat = Category.create(name: 'samp')

    sign_in_as user

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
    poll = Poll.find_by_question params[:poll][:question]
    assert poll
    assert_equal params[:poll][:options].sort, poll.options.map(&:option).sort
    assert_equal params[:poll][:category_ids], poll.categories.map(&:id)
  end

  test "destroy" do
    user = FactoryBot.create(:user)
    poll = Poll.create(question: 'Sample', user_id: user.id)

    sign_in_as user

    assert_difference('Poll.count', -1) do
      delete(poll_url(poll), xhr: true)
    end

    assert_response :success
  end
end

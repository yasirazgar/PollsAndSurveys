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
    sign_in_as user
    cat = Category.find_by(option: 'Gk')
    params = {
      question: 'My question',
      options: ['opt1', 'opt2', 'opt3', 'opt4'],
      categories: [cat.id]
    }

    post(create(params), xhr: true)
    assert_reponse :success
    poll = Poll.find_by_question params[:question]
    assert poll
    assert_equal params[:options].sort, poll.options.map(&:option).sort
    assert_equal params[:categories], poll.categories.map(&:id)
  end

  test "destroy" do
    user = FactoryBot.create(:user)
    sign_in_as user

    poll = Poll.create(:poll, option)
    assert_difference(Poll.count, -1) do
      delete({id: poll.id}, xhr: true)
    end
    assert_reponse :success
  end
end

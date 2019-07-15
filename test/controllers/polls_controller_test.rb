require 'test_helper'
require_relative '../helpers/polls_test_helper'
require_relative '../helpers/users_polls_test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest
  include PollsTestHelper

  setup do
    @yasir = users(:yasir)
    sign_in_as @yasir
  test "index - without signin" do
    Web::PollService.expects(:get_polls).returns(expected_polls_for_user['polls'])

    get(polls_url, xhr: true)
    assert_response :success
    assert_equal(expected_polls_for_user, json_response,
      'Should return polls as json')
  end

  test "index" do
    service_mock.expects(:get_polls_for_user).returns(expected_polls_for_user['polls'])

    get(polls_url, xhr: true)
    assert_response :success
    assert_equal(expected_polls_for_user, json_response,
      'Should return polls as json')
  end

  test "create" do
    service_mock.expects(:create).with(santize_create_params(create_params)).returns(polls(:yasir_snake))

    post(polls_url, params: create_params, xhr: true)
    assert_response :success
    assert_equal(
      {'poll_id' => 1, 'message' => 'Poll created successfully'},
      json_response,
      'Should return poll_id and success message')
  end

  test "create-with duplicate question" do
    assert_difference('Poll.count', 0, 'Should not create with duplicate question') do
      post(polls_url, params: create_dup_params, xhr: true)
    end

    assert_response :bad_request
    assert_equal('Question has already been taken', json_response['message'],
       'Should return a error message')
  end

  test "destroy" do
    poll = polls(:yasir_snake)

    assert_difference('Poll.count', -1, 'Should destroy the poll') do
      delete(poll_url(poll), xhr: true)
    end

    assert_response :success
    assert_equal('Poll destroyed successfully', json_response['message'],
      'Should return a success message')
  end

  test "destroy - other users polls" do
    other_user_poll = polls(:david_gems)

    assert_difference('Poll.count', 0, 'Should not destroy other users polls') do
      delete(poll_url(other_user_poll), xhr: true)
    end

    assert_response :not_found
    assert_equal('Error destroying poll', json_response['message'],
      'Should return a error message')
  end

  test "answer_poll" do
    poll_hash = UsersPollsTestHelper::YASIR_NO_ANS_ANS.clone
    poll_hash['options']["Crazy"]['percentage'] = 100
    poll_hash['options']["Crazy"]['selected'] = true

    expected_response = {
      'poll' => poll_hash,
      'message' => 'Answer recorded successfully'
    }

    assert_difference('PollAnswer.count', 1, 'Should create a new answer') do
      post(answer_poll_url(3, options(:crazy).id), xhr: true)
    end

    assert_response :success
    assert_equal(expected_response, json_response,
      'Should record the answer and return the updated polll answers')
  end

  ['polls', 'user_polls', 'user_responded_polls'].each do |type|
    test "search - #{type}" do
      params, sanitized_params, expected_response = search_reqs(type)
      service_mock.expects("search_#{type}").with(sanitized_params[:terms]).returns(expected_response['polls'])

      get(search_polls_url(params), xhr: true)
      assert_response :success
      assert_equal(expected_response, json_response,
        "Should return response based on the params")
    end
  end

  private

  def service_mock
    service = mock
    Web::PollService.expects(:new).with(@yasir).returns(service)
    service
  end

  def santize_create_params(params)
    ActionController::Parameters.new(params).require(:poll).permit(:question, category_ids: [], options: [], age_group_ids: [])
  end

  def search_reqs(type)
    params = {
      terms: {
        age_group_ids: ['1'],
        category_ids: ['1'],
        term: 'programming'
      },
      type: type
    }

    sanitized_params = ActionController::Parameters.new(params)

    expected_response = {
      'polls' => [YASIR_SNAKE]
    }

    [params, sanitized_params, expected_response]
  end

end

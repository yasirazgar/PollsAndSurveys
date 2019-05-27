require 'test_helper'
require_relative '../helpers/polls_test_helper'
require_relative '../helpers/users_polls_test_helper'

class PollsControllerTest < ActionDispatch::IntegrationTest
  include PollsTestHelper

  setup do
    @yasir = users(:yasir)
    sign_in_as @yasir
  end

  test "index" do
    service_mock.expects(:get_polls_for_user).returns(expected_polls_for_user['polls'])

    get(polls_url, xhr: true)
    assert_response :success
    assert_equal(json_response, expected_polls_for_user)
  end

  test "create" do
    service_mock.expects(:create).with(santize_create_params(create_params)).returns(polls(:yasir_snake))

    post(polls_url, params: create_params, xhr: true)
    assert_response :success
    assert_equal({'poll_id' => 1, 'message' => 'Poll created successfully'}, json_response)
  end

  test "create-with duplicate question" do
    assert_difference('Poll.count', 0) do
      post(polls_url, params: create_dup_params, xhr: true)
    end

    assert_response :bad_request
    assert 'Question is already used by you', json_response[:message]
  end

  test "destroy" do
    poll = polls(:yasir_snake)

    assert_difference('Poll.count', -1) do
      delete(poll_url(poll), xhr: true)
    end

    assert_response :success
    assert 'Poll destroyed successfully', json_response[:message]
  end

  test "destroy - other users polls" do
    other_user_poll = polls(:david_gems)

    assert_difference('Poll.count', 0) do
      delete(poll_url(other_user_poll), xhr: true)
    end

    assert_response :not_found
    assert 'Error destroying poll', json_response[:message]
  end

  test "answer_poll" do
    poll_hash = UsersPollsTestHelper::YASIR_NO_ANS_ANS.clone
    poll_hash['options']["Crazy"]['percentage'] = 100
    poll_hash['options']["Crazy"]['selected'] = true

    expected_response = {
      'poll' => poll_hash,
      'message' => 'Answer recorded successfully'
    }

    assert_difference('PollAnswer.count', 1) do
      post(answer_poll_url(3, options(:crazy).id), xhr: true)
    end

    assert_response :success
    assert_equal expected_response, json_response
  end

  private

  def service_mock
    service = mock
    Web::PollService.expects(:new).with(@yasir).returns(service)
    service
  end

  def santize_create_params(params)
    ActionController::Parameters.new(params).require(:poll).permit(:question, category_ids: [], options: [])
  end

end

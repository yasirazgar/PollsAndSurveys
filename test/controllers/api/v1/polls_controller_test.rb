require 'test_helper'
require_relative '../../../helpers/polls_test_helper'
require_relative '../../../helpers/users_polls_test_helper'

class Api::V1::PollsControllerTest < ActionDispatch::IntegrationTest
  include PollsTestHelper
  include UsersPollsTestHelper

  setup do
    @yasir = users(:yasir)
  end

  test "index - without signin" do
    get(api_v1_polls_url)
    assert_response :success
    assert_equal(expected_polls_for_user, json_response,
      'Should return polls as json without any filteration')
  end

  test "index" do
    expected = {
      'polls' => [yasir_it]
    }

    get(api_v1_polls_url, headers: { "Authorization" => token_for_user(@yasir) })
    assert_response :success
    assert_equal(expected, json_response,
      'Should return polls based on users preference, as json')
  end

  test "create" do
    service_mock.expects(:create).with(create_params[:poll]).returns(polls(:yasir_snake))

    post(api_v1_polls_url, params: create_params, headers: { "Authorization" => token_for_user(@yasir) })
    assert_response :success
    assert_equal(
      {'poll_id' => polls(:yasir_snake).id, 'message' => I18n.t('actions.poll.create.success')},
      json_response,
      'Should return poll_id and success message')
  end

  test "create-with duplicate question" do
    assert_difference('Poll.count', 0, 'Should not create with duplicate question') do
      post(api_v1_polls_url, params: create_dup_params, headers: { "Authorization" => token_for_user(@yasir) })
    end

    assert_response :bad_request
    assert_equal('Question has been already taken by you', json_response['message'],
       'Should return a error message')
  end

  test "destroy" do
    poll = polls(:yasir_snake)

    assert_difference('Poll.count', -1, 'Should destroy the poll') do
      delete(api_v1_poll_url(poll), headers: { "Authorization" => token_for_user(@yasir) })
    end

    assert_equal(
      [yasir_it_ans, yasir_no_ans_ans],
      json_response['polls'],
      "Should return all users polls except the deleted one")

    assert_response :success
  end

  test "destroy - other users polls" do
    other_user_poll = polls(:david_gems)

    assert_difference('Poll.count', 0, 'Should not destroy other users polls') do
      delete(api_v1_poll_url(other_user_poll), headers: { "Authorization" => token_for_user(@yasir) })
    end

    assert_response :not_found
  end

  test "answer_poll" do
    poll_hash = yasir_no_ans_ans.deep_dup
    poll_hash['options']["Crazy"]['percentage'] = 100
    poll_hash['options']["Crazy"]['selected'] = true

    assert_difference('PollAnswer.count', 1, 'Should create a new answer') do
      post(answer_api_v1_poll_url(polls(:yasir_no_ans).id, options(:crazy).id), headers: { "Authorization" => token_for_user(@yasir) })
    end

    assert_response :success
    assert_equal({'poll' => poll_hash}, json_response,
      'Should record the answer and return the updated polll answers')
  end

  ['polls', 'user_polls', 'user_responded_polls'].each do |type|
    test "search - #{type}" do
      params, expected_response = search_request(type)
      service_mock.expects("search_#{type}").with(params[:terms]).returns(expected_response['polls'])

      get(search_api_v1_polls_url(params), headers: { "Authorization" => token_for_user(@yasir) })
      assert_response :success
      assert_equal(expected_response, json_response,
        "Should return response based on the params")
    end
  end

  private

  def service_mock
    service = mock
    Api::V1::PollService.expects(:new).with(@yasir).returns(service)
    service
  end

  def search_request(type)
    params = {
      terms: {
        'term' => 'programming',
        'age_group_ids' => ['1'],
        'category_ids' => [categories(:it).id.to_s]
      },
      type: type
    }

    expected_response = {
      'polls' => [yasir_snake]
    }

    [params, expected_response]
  end

end

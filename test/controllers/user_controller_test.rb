require 'test_helper'
require_relative '../helpers/users_polls_test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  include UsersPollsTestHelper

  test "polls" do
    user = users(:yasir)
    sign_in_as(user)

    get(polls_user_url, xhr: true)

    Web::PollService.any_instance.stubs(:get_users_polls).returns(expected_users_poll)
    assert_equal({'polls' => expected_users_poll}, json_response)
  end

  test "resonded_polls" do
    user = users(:yasir)
    sign_in_as(user)

    get(responded_polls_user_url, xhr: true)

    Web::PollService.any_instance.stubs(:get_users_polls).returns(expected_users_poll)
    assert_equal({'polls' => expected_user_responded_polls}, json_response)
  end

end

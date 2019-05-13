require 'test_helper'
require_relative '../../helpers/users_polls_test_helper'

class Web::PollServiceTest < ActiveSupport::TestCase
  include UsersPollsTestHelper

  setup do
    @user = users(:yasir)
    @service = Web::PollService.new(@user)
  end

  test "users_poll" do
    assert_equal(expected_users_poll, @service.get_users_polls)
  end
end

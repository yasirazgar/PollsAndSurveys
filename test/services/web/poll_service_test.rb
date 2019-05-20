require 'test_helper'
require_relative '../../helpers/users_polls_test_helper'
require_relative '../../helpers/polls_test_helper'

class Web::PollServiceTest < ActiveSupport::TestCase
  include UsersPollsTestHelper
  include PollsTestHelper

  setup do
    @user = users(:yasir)
    @service = Web::PollService.new(@user)
  end

  test "users_poll" do
    assert_equal(expected_users_poll, @service.get_users_polls.map(&:deep_stringify_keys))
  end

  test "polls_for_user" do
    assert_equal(expected_polls_for_user['polls'], @service.get_polls_for_user.map(&:deep_stringify_keys))
  end

  test "destroy" do
    poll = polls(:yasir_snake)
    assert_difference('Poll.count', -1) do
      @service.destroy({id: poll.id})
    end
  end

  test "create" do
    poll = nil
    params = create_params[:poll]

    assert_difference('Poll.count', 1) do
      assert_difference('Option.count', 4) do
        poll = @service.create(params)
      end
    end

    assert_poll(poll, params)
  end

  test "create duplicate fails" do
    assert_difference('Poll.count', 0) do
      assert_difference('Option.count', 0) do
        @service.create(create_dup_params[:poll])
      end
    end
  end

  test "create with existing options" do
    poll = nil
    params = create_params[:poll]
    params[:options][0] = 'Python'

    assert_difference('Poll.count', 1) do
      assert_difference('Option.count', 3, "Should create only three options, as first option is already availabel") do
        poll = @service.create(params)
      end
    end

    assert_poll(poll, params)
  end

  private

  def assert_poll(poll, params)
    assert_equal params[:options].sort, poll.options.map(&:option).sort
    assert_equal params[:category_ids].map(&:to_i), poll.category_ids
  end
end

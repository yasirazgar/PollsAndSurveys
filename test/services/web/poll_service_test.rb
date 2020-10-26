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
    assert_equal(expected_users_poll, @service.get_users_polls.map(&:deep_stringify_keys),
      'Should return polls created by the user')
  end

  test "polls_for_user - without user" do
    assert_equal(
      [
        yasir_snake,
        yasir_it,
        yasir_no_ans,
        david_gems
      ], Web::PollService.new(nil).get_polls_for_user.map(&:deep_stringify_keys),
      'Should return polls created by the user')
  end

  test "polls_for_user" do
    assert_equal([yasir_it], @service.get_polls_for_user.map(&:deep_stringify_keys),
      'Should return polls for user based on users fields')
  end

  test "polls_for_user - with category_ids" do
    assert_equal([yasir_it], @service.get_polls_for_user.map(&:deep_stringify_keys),
      'Should return polls for user based on users fields')
  end

  test "polls_for_user - with age_group_ids and category_ids" do
    UserDetail.any_instance.expects(:age_group).returns(1)
    assert_equal([yasir_snake, yasir_it, david_gems], @service.get_polls_for_user.map(&:deep_stringify_keys),
      'Should return polls for user based on users fields')
  end

  test "polls_for_user - without user_details" do
    user = users(:sundar)
    service = Web::PollService.new(user)

    assert_equal(expected_polls_for_user['polls'], service.get_polls_for_user.map(&:deep_stringify_keys),
      'Should return all polls there are no parameters for filtering')
  end

  test "destroy" do
    poll = polls(:yasir_snake)
    assert_difference('Poll.count', -1, 'Should destroy the respective poll') do
      @service.destroy({id: poll.id})
    end
  end

  test "create" do
    poll = nil
    params = create_params[:poll]

    assert_difference('Poll.count', 1, 'Should create a poll') do
      assert_difference('Option.count', 4) do
        poll = @service.create(params)
      end
    end

    assert_poll(poll, params)
  end

  test "create duplicate fails" do
    assert_difference('Poll.count', 0,
      'Should not create a duplicate poll') do
      assert_difference('Option.count', 0,
        'Should not create options, when poll creation fails') do
          @service.create(create_dup_params[:poll])
      end
    end
  end

  test "create with existing options" do
    poll = nil
    params = create_params[:poll]
    params['options'][0] = 'Python'

    assert_difference('Poll.count', 1) do
      assert_difference('Option.count', 3, "Should create only three options, as first option is already availabel") do
        poll = @service.create(params)
      end
    end

    assert_poll(poll, params)
  end

  test "create - with invalid age_group" do
    poll = nil
    params = create_params[:poll]
    params['age_group_ids'] << '100'

    assert_difference('Poll.count', 1, 'Should create a poll') do
      assert_difference('Option.count', 4) do
        poll = @service.create(params)
      end
    end

    params['age_group_ids'] = params['age_group_ids'] - ['100']
    assert_poll(poll, params)
  end

  test "get_answers_for_poll" do
    assert_equal(yasir_snake_ans, @service.get_answers_for_poll(polls(:yasir_snake)).deep_stringify_keys,
      'Should return the answers for poll')
  end

  test "get_user_responded_polls" do
    assert_equal(expected_user_responded_polls, @service.get_user_responded_polls.map(&:deep_stringify_keys),
      'Should return the polls responded by the user')
  end

  test "answer_poll" do
    expected_hash = yasir_no_ans_ans.deep_dup
    expected_hash['options']["Crazy"]['percentage'] = 100
    expected_hash['options']["Crazy"]['selected'] = true

    assert_equal(expected_hash, @service.answer_poll(polls(:yasir_no_ans).id, options(:crazy).id).deep_stringify_keys,
      'Should record the answer for the poll and return the answers to poll')
  end

  test "answer_poll - user changes the answer" do
    expected_hash = yasir_it_ans.deep_dup
    expected_hash['options']["Ruby"]['percentage'] = 50.0
    expected_hash['options']["Ruby"]['selected'] = false
    expected_hash['options']["JavaScript"]['percentage'] = 25.0
    expected_hash['options']["JavaScript"]['selected'] = true

    assert_equal(expected_hash, @service.answer_poll(polls(:yasir_it).id, options(:javascript).id).deep_stringify_keys,
      'Should update the answer')
  end

  test "answer_poll - user chosses the same answer" do
    assert_equal(yasir_it_ans, @service.answer_poll(polls(:yasir_it).id, options(:ruby).id).deep_stringify_keys,
      'Should do nothing and return the same')
  end

  test "searcher - polls - age_group - empty" do
    assert_equal(
      [yasir_snake, yasir_it],
      @service.search_polls({
            category_ids: [categories(:it).id, categories(:programming_languages).id, categories(:animals).id],
            term: 'Fav'
      }).map(&:deep_stringify_keys),
      'Should return polls based on category_ids and search term')
  end

  test "search - polls - age_group - with all" do
    assert_equal(
      [yasir_snake, david_gems, yasir_it],
      @service.search_polls({
            age_group_ids: [Poll::Age::GROUPING.key(Poll::Age::ALL)],
            term: 'Fav'
      }).map(&:deep_stringify_keys),
      'Should return polls for all age_group with term Fav in question')
  end

  test "search - users_polls - without categories" do
    assert_equal(
      [],
      @service.search_users_polls({
        age_group_ids: [4,5],
        term: 'Dumb'
      }).map(&:deep_stringify_keys),
      'Should return polls based on category_ids and search term')
  end

  test "search - user_responded_polls - without search term" do
    assert_equal(
      [david_gems_ans],
      @service.search_user_responded_polls({
        age_group_ids: [1],
        category_ids: [categories(:gems).id]
      }).map(&:deep_stringify_keys),
      "Should include common age group (1) in all cases")
  end

  private

  def assert_poll(poll, params)
    assert_equal(params['options'].sort, poll.options.map(&:name).sort,
      'Should create options')
    assert_equal(params['category_ids'].map(&:to_i), poll.category_ids,
      'Should set categories')
    assert_equal(params['age_group_ids'].map(&:to_i), poll.age_group_ids,
      'Should set age_group')
  end
end

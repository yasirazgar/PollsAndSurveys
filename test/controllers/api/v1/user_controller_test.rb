# frozen_string_literal: true

require 'test_helper'
require_relative '../../../helpers/users_polls_test_helper'

class Api::V1::UserControllerTest < ActionDispatch::IntegrationTest
  include UsersPollsTestHelper

  setup do
    @yasir = users(:yasir)
    # sign_in_as @yasir
  end

  test 'polls' do
    get(polls_api_v1_user_url, headers: headers, xhr: true)
    assert_response :success

    Api::V1::PollService.any_instance.stubs(:users_polls).returns(expected_users_poll)
    assert_equal({ 'polls' => expected_users_poll }, json_response)
  end

  test 'resonded_polls' do
    get(responded_polls_api_v1_user_url, headers: headers, xhr: true)
    assert_response :success

    Api::V1::PollService.any_instance.stubs(:users_polls).returns(expected_users_poll)
    assert_equal({ 'polls' => expected_user_responded_polls }, json_response)
  end

  test 'update' do
    update_params = {
      locale: 'en',
      name: 'Azzu',
      email: 'yasirazzu@pas.com',
      nick_name: 'Azz'
    }

    patch(update_profile_api_v1_user_url, headers: headers, params: update_params, xhr: true)
    assert_response :success

    @yasir.reload
    update_params.each do |key, value|
      assert_equal(value, @yasir.send(key), "Should update #{key} to #{value}")
    end
  end

  test 'update_locale' do
    new_locale = 'ta'

    assert_not_equal(new_locale, @yasir.locale, "Should not be already set to #{new_locale}")

    patch(update_locale_api_v1_user_url, headers: headers, params: { locale: new_locale }, xhr: true)
    assert_response :success

    @yasir.reload
    assert_equal(new_locale, @yasir.reload.locale, "Should update to new locale #{new_locale}")
  end
end

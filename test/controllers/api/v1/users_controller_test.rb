# frozen_string_literal: true

require 'test_helper'

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest

  test 'create' do
    user_params = {
      user: {
        email: 'someuser@pas.com',
        password: 'Password@1',
        password_confirmation: 'Password@1',
        name: 'Yasir',
        nick_name: 'Yasir'
      }
    }
    assert_difference('User.count', 1) do
      post(api_v1_users_url, params: user_params, xhr: true)
    end
    user = User.find_by_email(user_params[:user][:email])
    assert_equal(user_params[:user][:name], user.name)
    assert_equal(user_params[:user][:nick_name], user.nick_name)
  end

  test 'create - Error' do
    yasir = users(:yasir)
    user_params = {
      user: {
        email: yasir.email,
        password: 'Password@1',
        password_confirmation: 'Password@1',
        name: 'Yasir',
        nick_name: 'Yasir'
      }
    }
    assert_difference('User.count', 0) do
      post(api_v1_users_url, params: user_params, xhr: true)
    end

    assert_response :bad_request

    assert_equal('Error in RegsitrationEmail has already been taken', json_response['error'])
  end

  test 'destroy' do
    assert_difference('User.count', -1) do
      delete(api_v1_user_url(users(:david)), headers: headers, xhr: true)
    end
  end

  # test 'destroy - should not allow to destroy self' do
  #   yasir = users(:yasir)

  #   assert_difference('User.count', 0) do
  #     delete(users_url(yasir), headers: headers, xhr: true)
  #   end
  # end
end

require 'test_helper'

class Api::V1::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "create - login - success" do
    user = users(:yasir)
    params = {
      email: 'yasir@pas.com',
      password: 'passworD%1'
    }

    post(api_v1_login_url, params: params, xhr: true)

    assert_response :success

    assert_equal(user.slice(:name, :nick_name, :email), json_response['user'])
    assert_equal('Successfully logged in', json_response['message'])
    assert_not_nil(json_response['jwt'])
  end

  test "create - login - failure" do
    user = users(:yasir)
    params = {
      email: 'yasir@pas.com',
      password: 'PassworD@1'
    }

    post(api_v1_login_url, params: params, xhr: true)

    assert_response :not_found

    assert_equal('Username or password incorrect', json_response['error'])

    assert_nil(json_response['jwt'])
  end
end

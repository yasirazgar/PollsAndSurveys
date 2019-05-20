require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "create - login - success" do
    user = users(:yasir)
    params = {
      email: 'yasir@pas.com',
      password: 'passworD%1'
    }

    post(login_url, params: params, xhr: true)

    assert_response :success
    assert_equal(user, @controller.send(:current_user))
    assert_equal(
      {'user' => user.slice(:name, :nick_name, :email), 'message' => "Successfully logged in"},
      json_response)
  end

  test "create - login - failure" do
    user = users(:yasir)
    params = {
      email: 'yasir@pas.com',
      password: 'PassworD@1'
    }

    post(login_url, params: params, xhr: true)

    assert_response :not_found
    assert_nil(@controller.send(:current_user))
  end

  test "destroy" do
    delete(logout_url, xhr: true)

    assert_response :success
    assert_equal({'message' => "Successfully logged out"}, json_response)
  end
end

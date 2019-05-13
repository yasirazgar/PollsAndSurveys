require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  test "create" do
    params = {
      email: 'yasir@pas.com',
      password: 'Password@1',
      password_confirmation: 'Password@1',
      name: 'Yasir'
    }
    assert_difference('User.count', 1) do
      post(users_url, params: params, xhr: true)
    end

    user = User.find_by_email(user_params[:email])
    assert_equal(user_params[:name], user.name)
  end

  test "destroy" do
    user = users(:yasir)

    assert_difference('User.count', -1) do
      delete(user_url(user), xhr: true)
    end
  end
end

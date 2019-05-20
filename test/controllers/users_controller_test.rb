require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "create" do
    user_params = {
      user:{
        email: 'someuser@pas.com',
        password: 'Password@1',
        password_confirmation: 'Password@1',
        name: 'Yasir',
        nick_name: 'Yasir'
      }
    }
    assert_difference('User.count', 1) do
      post(users_url, params: user_params, xhr: true)
    end
    user = User.find_by_email(user_params[:user][:email])
    assert_equal(user_params[:user][:name], user.name)
    assert_equal(user_params[:user][:nick_name], user.nick_name)
  end

  test "destroy" do
    assert_difference('User.count', -1) do
      delete(user_url(users(:david)), xhr: true)
    end
  end
end

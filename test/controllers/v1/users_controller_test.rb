class V1::UsersControllerTest < ActiveSupport::TestCase

  test "new" do    
    get(sign_up_url, xhr: true)
    assert_reponse :success
  end

  test "create" do
    user_params = {
      email: 'yasir@pas.com'
      password: 'Password@1',
      password_confirmation: 'Password@1',
      name: 'Yasir'
    }
    assert_difference(User.count, 1) do
      post(user_params, xhr: true)      
    end    
    user = User.find_by_email(user_params[:email])
    assert_equal(user_params[:name], user.name)
  end

  test "destroy" do
    user = FactoryBot.create(:user)
    assert_difference(User.count, -1) do
      delete({id: user.id}, xhr: true)
    end        
  end


end

class V1::SessionsControllerTest < ActiveSupport::TestCase

  setup do
    @user = FactoryBot.create(:user)
  end

  test "new - sign_in" do    
    get(sign_in_url, xhr: true)
    assert_reponse :success
  end

  test "create" do
    user_params = {

    }
    post(user_params, xhr: true)
    assert_reponse :success
  end

  test "destroy" do
    delete({id: @user.id}, xhr: true)
    assert_reponse :success
    

  end

end

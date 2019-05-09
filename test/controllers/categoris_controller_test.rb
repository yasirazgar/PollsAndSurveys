require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    user = FactoryBot.create(:user)
    sign_in_as user

    get(categories_url, xhr: true)
    assert_response :success
    flunck("needs test for json response")
  end
end

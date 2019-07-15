require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    user = FactoryBot.create(:user)

    get(categories_url, xhr: true)
    assert_response :success
    flunck("needs test for json response")
  end
end

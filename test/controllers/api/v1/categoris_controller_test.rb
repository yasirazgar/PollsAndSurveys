require 'test_helper'

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    user = users(:yasir)

    get(categories_url, xhr: true)
    assert_response :success
    assert_equal({
      "categories" => [[1, "It"], [2, "Programming languages"], [3, "Animals"], [4, "Gems"]]
    }, json_response)
  end
end

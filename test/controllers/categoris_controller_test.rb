require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest

  test "index" do
    user = users(:yasir)

    get(categories_url, xhr: true)
    assert_response :success
    assert_equal({
      'categories' => [
        [categories(:it).id, 'It'],
        [categories(:programming_languages).id, 'Programming languages'],
        [categories(:animals).id, 'Animals'],
        [categories(:gems).id, 'Gems']]
    }, json_response)
  end
end

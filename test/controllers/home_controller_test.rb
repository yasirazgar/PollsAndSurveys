require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest

  test 'index' do
    get(root_url)

    assert_response :success
  end

end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  # fixtures :all

  def signin(user)
    @controller.stubs(:current_user).returns(user)
  end

  # Add more helper methods to be used by all tests here...
end

module SignInHelper
  def sign_in_as(user)
    post login_url(email: user.email, password: 'passworD%1')
  end
end

class ActionDispatch::IntegrationTest
  include SignInHelper
end

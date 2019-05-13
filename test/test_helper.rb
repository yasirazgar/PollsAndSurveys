ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def json_response
    @json_response ||= JSON.parse(@response.body)
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

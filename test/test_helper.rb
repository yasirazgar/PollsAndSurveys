# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'
require 'json_web_token'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def json_response
    @json_response ||= JSON.parse(@response.body)
  end

  def token_for_user(user)
    "Bearer #{JsonWebToken.encode(user_id: user.id)}"
  end

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def headers(user = users(:yasir))
    { 'Authorization' => token_for_user(user) }
  end
end
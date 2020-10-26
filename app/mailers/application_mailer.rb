# frozen_string_literal: true

# Wrapper method for action mailer
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end

# frozen_string_literal: true

# Wrapper method for active record
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end

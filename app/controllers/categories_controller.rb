# frozen_string_literal: true

class CategoriesController < ApplicationController
  skip_before_action :authenticate_request

  def index
    render json: { categories: Category.ids_codes }
  end
end

class CategoriesController < ApplicationController

  def index
    render json: {categories: Category.pluck(:id, :name)}
  end

end

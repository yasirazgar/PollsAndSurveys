class CategoriesController < ApplicationController

  def index
    render json: {categories: Category.ids_codes}
  end

end

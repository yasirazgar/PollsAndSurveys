# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]
  def create
    user = User.create(create_params)

    if user.errors.blank?
      render json: { name: user.name, message: 'Regsitration successfully' }
    else
      render json: { error: 'Error in Regsitration' + user.errors.full_messages.join(', ') }, status: :bad_request
    end
  end

  def destroy
    User.destroy(params[:id])

    render json: { message: 'User destroyed' }
  end

  private

  def create_params
    params
      .require(:user)
      .permit(:email, :password, :password_confirmation, :name, :nick_name, :locale, :password_confirmation)
  end
end

class UsersController < ApplicationController
  def create
    user = User.create(create_params)
    if user
      render json: {name: user.name, message: 'Regsitration successfully'}
    else
      render json: {message: 'Error in Regsitration' + user.errors.full_messages.join('')}, status: :bad_request
    end
  end

  def destroy
    User.destroy(params[:id])
    render json: {message: 'User destroyed'}
  end

  private

  def create_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :nick_name, :locale)
  end
end

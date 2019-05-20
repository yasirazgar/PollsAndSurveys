class SessionsController < ApplicationController
  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {user: user, message: "Successfully logged in"}, status: :ok
    else
      render json: {user: nil, message: "Invalid email or password"}, status: :not_found
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {message: "Successfully logged out"}, status: :ok
  end

end

class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def create
    user = User.find_by_email(params[:email])

    if user && user.authenticate(params[:password])
      jwt = JsonWebToken.encode(user_id: user.id)
      # cookies.signed[:jwt] = {value:  created_jwt, httponly: true}
      render json: {user: user.slice(:name, :nick_name, :email), jwt: jwt, message: 'Successfully logged in'}
    else
      render json: {error: 'Username or password incorrect'}, status: 404
    end
  end
end

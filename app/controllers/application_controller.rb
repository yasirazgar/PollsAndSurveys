# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_request
  before_action :set_locale
  helper_method :current_user

  private

  def authenticate_request
    render json: { error: 'Not Authorized' }, status: 401 unless current_user
  end

  def current_user
    @current_user ||= fetch_user_from_token
    # @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def fetch_user_from_token
    (token = jwt.presence) &&
      (user_id = JsonWebToken.decode(token)[:user_id]) &&
      (User.find_by_id user_id)
  end

  def jwt
    # request.env["HTTP_AUTHORIZATION"].scan(/Bearer  (.*)$/).flatten.last
    request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
  end

  def jwt?
    !!jwt
  end

  def set_locale
    I18n.locale = appropriate_locale
    cookies[:locale] = I18n.locale
  end

  def appropriate_locale
    locale_from_params || locale_from_user || locale_from_cookies || I18n.default_locale
  end

  def locale_from_params
    params[:locale] if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym)
  end

  def locale_from_user
    current_user.locale if current_user && I18n.available_locales.include?(current_user.locale.to_sym)
  end

  def locale_from_cookies
    cookies[:locale] if cookies[:locale] && I18n.available_locales.include?(cookies[:locale].to_sym)
  end
end

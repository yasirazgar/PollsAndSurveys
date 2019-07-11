class ApplicationController < ActionController::Base
  before_action :set_locale
  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def set_locale
    I18n.locale = get_appropriate_locale
    cookies[:locale] = I18n.locale
  end

  def get_appropriate_locale
    return params[:locale] if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym)
    return current_user.locale if current_user && I18n.available_locales.include?(current_user.locale.to_sym)
    return cookies[:locale] if cookies[:locale] && I18n.available_locales.include?(cookies[:locale].to_sym)

    I18n.default_locale
  end
end

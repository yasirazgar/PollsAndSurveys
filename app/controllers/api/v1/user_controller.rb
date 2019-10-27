class Api::V1::UserController < ApplicationController
  include Api::V1::PollsConcern

  def polls
    polls = poll_service.get_users_polls

    render json: {polls: polls}
  end

  def responded_polls
    polls = poll_service.get_user_responded_polls

    render json: {polls: polls}
  end

  def update_profile
    attrs = update_params
    attrs.delete(:locale) unless I18n.available_locales.include?(attrs[:locale].try(:to_sym))

    current_user.update_attributes(attrs)
    render json: {}, status: :ok
  end

  def update_locale
    locale = params[:locale]
    current_user.update_column(:locale, locale) if I18n.available_locales.include?(locale.to_sym)
    render json: {}, status: :ok
  end

  private

  def update_params
    params.permit(:email, :password, :password_confirmation, :name, :nick_name, :locale)
  end
end
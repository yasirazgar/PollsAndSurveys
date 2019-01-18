Rails.application.routes.draw do
  namespace :v1 do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    get "signin", to: "sessions#new", as: "signin"
    post "login", to: "sessions#create", as: "login"
    get "logout", to: "sessions#destroy", as: "logout"
    get "signup", to: "users#new", as: "signup"
    resources :users, only: [:create, :update, :edit]
    root to: "home#index"
  end

  get "signin", to: "sessions#new", as: "signin"
  post "login", to: "sessions#create", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"
  get "signup", to: "users#new", as: "signup"
  resources :users, only: [:create, :update, :edit]
  root to: "home#index"
end

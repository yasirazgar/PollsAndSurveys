Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "signin", to: "sessions#new", as: "signin"
  post "login", to: "sessions#create", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"
  get "signup", to: "users#new", as: "signup"
  resource :user, :controller => :user, only: [:create, :update] do
    collection do
      get 'polls'
    end
  end
  resources :polls, except: [:new, :update]
  root to: "home#index"
end

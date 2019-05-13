Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "signin", to: "sessions#new", as: "signin"
  post "login", to: "sessions#create", as: "login"
  get "logout", to: "sessions#destroy", as: "logout"
  get "signup", to: "users#new", as: "signup"
  resources :users, only: [:create, :destroy, :update]
  resource :user, controller: :user, only: [] do
    collection do
      get 'polls'
    end
  end
  resources :polls, except: [:new, :update]
  resources :categories, only: [:index]
  root to: "home#index"
end

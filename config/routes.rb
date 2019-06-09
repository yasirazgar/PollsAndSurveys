Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "login", to: "sessions#create", as: "login"
  delete "logout", to: "sessions#destroy", as: "logout"
  resources :users, only: [:create, :destroy, :update]
  resource :user, controller: :user, only: [] do
    collection do
      get 'polls'
      get 'responded_polls'
    end
  end
  resources :polls, except: [:new, :update] do
    member do
      post ':option_id/answer' => 'polls#answer', :as => 'answer'
    end
    collection do
      get 'search'
    end
  end
  resources :categories, only: [:index]
  root to: "home#index"
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'tardis/index'

  resources :messages, only: [:new, :create]

  root 'tardis#index'
end

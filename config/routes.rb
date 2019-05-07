Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get '/search', to:'pages#search'
  get '/dashboard', to:'pages#dashboard'
  get '/about', to:'pages#about'
  get '/lesarbres', to:'pages#lesarbres'
  resources :compensations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  root 'static_pages#login'
  get '/feed' => 'static_pages#feed'
  get '/:username' => 'static_pages#user_page'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
  end

  get '*path' => 'static_pages#login'
  # if you are using active storage to upload and store images, comment the above line
end

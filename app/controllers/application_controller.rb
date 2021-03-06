class ApplicationController < ActionController::Base

	include Pundit
    protect_from_forgery
	before_action :store_user_location!, if: :storable_location?
	  # The callback which stores the current location must be added before you authenticate the user 
	  # as `authenticate_user!` (or whatever your resource is) will halt the filter chain and redirect 
	  # before the location can be stored.
  	before_action :authenticate_user!
  	before_action :configure_permitted_parameters, if: :devise_controller?

  # 	# Pundit: white-list approach.
  # 	after_action :verify_authorized, except: :index, unless: :skip_pundit?
 	# after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

    protected

    def configure_permitted_parameters
    	devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    	devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  	end

	def after_sign_in_path_for(user)

		if session[:dette].present?
			session[:dette] = nil
			new_compensation_path

    	elsif session[:flight].present?
        
		    
		    @flight = Flight.new(session[:flight])
		    @flight.user = current_user
		    @flight.save!

		    # clear session
		    session[:flight] = nil
		 
		    #redirect
		    flash[:notice] = "Félicitations, vous venez de financer la  plantation de #{@flight.skytreep_participation / 13} arbres"

		    dashboard_path
	    else
	    #if there is not temp list in the session proceed as normal
	      stored_location_for(user) || super
    end
 
	end

	# def after_sign_out_path_for(user:)
	# 	stored_location_for(user) || super
	# end

  	private
	    # Its important that the location is NOT stored if:
	    # - The request method is not GET (non idempotent)
	    # - The request is handled by a Devise controller such as Devise::SessionsController as that could cause an 
	    #    infinite redirect loop.
	    # - The request is an Ajax request as this can lead to very unexpected behaviour.
    def storable_location?
      request.get? && is_navigational_format? && !devise_controller? && !request.xhr? 
    end

    def store_user_location!
      # :user is the scope we are authenticating
      store_location_for(:user, request.fullpath)
	end

	def skip_pundit?
	devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
	end
end

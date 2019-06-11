class FlightsController < ApplicationController

skip_before_action :authenticate_user!,  :only => [:create]

	def create		
		# Check to see if the user is registered/logged in
		
		if current_user.nil?
	    # Store the form data in the session so we can retrieve it after login
	        
			session[:flight] = flight_params
			
		# Redirect the user to register/login
			redirect_to new_user_session_path    
		else
			@flight = Flight.new(flight_params)
			@flight.user = current_user
			@flight.save!

			flash[:notice] = "Félicitations, vous venez de financer la  plantation de #{@flight.skytreep_participation / 20} arbres"

			redirect_to dashboard_show_path(current_user)
		end

        #Update le nombre d'arbres du user quand il est redirigé. C'est de l'argent qu'il a mis dans tous les cas. 

        # current_user.update_attributes!(:trees, )
        # @user.trees += params.require(:user).permit(:skytreep_participation)

        # @user.save!
	end

	private

	def flight_params
    	params.permit(:price, :ville_aller, :ville_retour, :date_aller, :date_retour, :distance, :co2, :status, :dette_eco, :skytreep_participation)
    end
end

class FlightsController < ApplicationController



	def create
		
		@flight = Flight.new(flight_params)
		@flight.user = current_user
		@flight.save!


		@dette_eco = DetteEco.new(dette_eco_params)
		@dette_eco.user = current_user
		@dette_eco.flight = @flight
		@dette_eco.save!

        #Update le nombre d'arbres du user quand il est redirigé. C'est de l'argent qu'il a mis dans tous les cas. 

        # current_user.update_attributes!(:trees, )
        # @user.trees += params.require(:user).permit(:skytreep_participation)

        # @user.save!

		redirect_to new_compensation_path
	end

	private

	def flight_params
    	params.permit(:price, :ville_aller, :ville_retour, :date_aller, :date_retour, :distance, :co2, :status)
    end

    def dette_eco_params
    	params.permit(:total, :skytreep_participation)
    end

end

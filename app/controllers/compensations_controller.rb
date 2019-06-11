class CompensationsController < ApplicationController

  skip_before_action :authenticate_user!,  :only => [:new]

  def new
    
    if current_user.nil?
      
        session[:dette] = 'true';
        
        redirect_to new_user_session_path
    end

    @search_nav = true
    @footer1 = true
  end

  def create
    
    byebug
    @flight = Flight.new(flight_params)
    @flight.user = current_user
    @flight.save!
    

    customer = Stripe::Customer.create(
      source: params[:stripeToken],
      email:  params[:stripeEmail]
    )

    charge = Stripe::Charge.create(
      customer:     customer.id,   # You should store this customer id and re-use it.
      amount:       @flight.user_participation,
      description:  "Eco-debt payment for your treep to #{@flight.ville_retour} ",
      currency:     'eur'
    )
    
    @flight.update(status: 'paid')

    flash[:notice] = "Félicitations, vous venez de financer la  plantation de #{@flight.skytreep_participation / 20} arbres"

    # Update la dette écologique correspondant au vol.

    #Trouver le vol on peut passer le id par un hidden field_tag.

    #Update le nombre d'arbres du user quand il a fini de payer. 

    
    redirect_to dashboard_show_path(current_user)

    rescue Stripe::CardError => e
    	flash[:alert] = e.message
    	redirect_to new_compensation_path
    
  end

  private

  def flight_params
      params.permit(:price, :ville_aller, :ville_retour, :date_aller, :date_retour, :distance, :co2, :status, :dette_eco, :skytreep_participation, :user_participation)
  end
  
end





























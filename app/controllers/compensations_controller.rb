class CompensationsController < ApplicationController

def new
	@flight = current_user.flights.last
  @search_nav = true
  @footer1 = true
end

def create
  
  amount = params[:amount]

  customer = Stripe::Customer.create(
    source: params[:stripeToken],
    email:  params[:stripeEmail]
  )

  charge = Stripe::Charge.create(
    customer:     customer.id,   # You should store this customer id and re-use it.
    amount:       amount,
    description:  "Eco-debt payment for your treep to .. ",
    currency:     'eur'
  )

  # Update la dette écologique correspondant au vol.

  #Trouver le vol on peut passer le id par un hidden field_tag.

  #Update le nombre d'arbres du user quand il a fini de payer. 

  
  redirect_to dashboard_show_path(current_user)

  rescue Stripe::CardError => e
  	flash[:alert] = e.message
  	redirect_to new_compensation_path
  end
end

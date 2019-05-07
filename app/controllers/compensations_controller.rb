class CompensationsController < ApplicationController

def new
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
    description:  "C02 compensation for your treep to .. ",
    currency:     'eur'
  )

  
  redirect_to dashboard_path

  rescue Stripe::CardError => e
  	flash[:alert] = e.message
  	redirect_to new_compensation_path
  end
end

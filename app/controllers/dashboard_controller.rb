class DashboardController < ApplicationController
  def show
  	
  	@search_nav = true
    @footer1 = true
  	@flights = current_user.flights
  end
end

class AddDetteEcoToFlights < ActiveRecord::Migration[5.2]
  def change
  	add_column :flights, :dette_eco, :integer
  	add_column :flights, :skytreep_participation, :integer
  	add_column :flights, :user_participation, :integer
  end
end

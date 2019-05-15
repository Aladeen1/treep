class AddUserRefToFlights < ActiveRecord::Migration[5.2]
  def change
    add_reference :flights, :user, foreign_key: true
  end
end

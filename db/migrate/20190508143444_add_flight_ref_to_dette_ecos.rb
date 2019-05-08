class AddFlightRefToDetteEcos < ActiveRecord::Migration[5.2]
  def change
    add_reference :dette_ecos, :flight, foreign_key: true
  end
end

class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.integer :price
      t.string :ville_aller
      t.string :ville_retour
      t.date :date_aller
      t.date :date_retour
      t.integer :distance
      t.integer :co2

      t.timestamps
    end
  end
end

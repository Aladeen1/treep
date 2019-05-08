class CreateDetteEcos < ActiveRecord::Migration[5.2]
  def change
    create_table :dette_ecos do |t|
      t.integer :total
      t.integer :skytreep_participation
      t.integer :user_participation
      t.string :status

      t.timestamps
    end
  end
end

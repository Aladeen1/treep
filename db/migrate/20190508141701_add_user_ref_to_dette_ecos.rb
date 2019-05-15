class AddUserRefToDetteEcos < ActiveRecord::Migration[5.2]
  def change
    add_reference :dette_ecos, :user, foreign_key: true
  end
end

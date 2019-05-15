class ChangeDateType < ActiveRecord::Migration[5.2]
  def change
  	change_column :flights, :ville_aller, :string
  	change_column :flights, :ville_retour, :string
  end
end

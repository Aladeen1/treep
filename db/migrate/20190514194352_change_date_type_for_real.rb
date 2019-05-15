class ChangeDateTypeForReal < ActiveRecord::Migration[5.2]
  def change
  	change_column :flights, :date_aller, :string
  	change_column :flights, :date_retour, :string
  end
end

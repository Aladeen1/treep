class RemoveStatusFromDetteEcos < ActiveRecord::Migration[5.2]
  def change
    remove_column :dette_ecos, :status, :string
  end
end

class AddTreesToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :trees, :integer
  end
end

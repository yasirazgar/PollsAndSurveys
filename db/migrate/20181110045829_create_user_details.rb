class CreateUserDetails < ActiveRecord::Migration[5.2]
  def up
    create_table :user_details do |t|
    	t.integer :user_id
    	t.string :gender
    	t.text :phone
    	t.text :about
    	t.string :avatar
    	t.string :location
    	t.integer :category_ids, array: true
    end
  end

  def down
  	drop_tables(:user_details)
  end
end

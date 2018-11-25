class CreatePolls < ActiveRecord::Migration[5.2]
  def up
    create_table :polls do |t|
    	t.integer :user_id
    	t.integer :category_ids, array: true
    	t.text :options, array: true
      t.integer :mutlioption
    end
  end

  def down
  	drop_table(:polls)
  end
end

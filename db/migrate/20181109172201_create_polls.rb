class CreatePolls < ActiveRecord::Migration[5.2]
  def up
    create_table :polls do |t|
    	t.integer :user_id, null: false
      t.text :question, null: false
    end

    add_index :polls, :user_id
  end

  # rake db:migrate:down VERSION=20181109172201
  def down
  	drop_table(:polls)
  end
end

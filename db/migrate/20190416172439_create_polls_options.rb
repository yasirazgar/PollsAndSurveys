class CreatePollsOptions < ActiveRecord::Migration[5.2]
  def up
    create_table :polls_options do |t|
      t.integer :poll_id, null: false
      t.integer :option_id, null: false
    end

    add_index :polls_options, [:poll_id, :option_id]
    add_index :polls_options, :poll_id
    add_index :polls_options, :option_id
  end

  def down
    drop_table(:polls_options)
  end
end

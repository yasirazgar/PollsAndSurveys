class CreatePollAnswer < ActiveRecord::Migration[5.2]
  def up
    create_table :poll_answers do |t|
      t.integer :polls_options_id, null: false
      t.integer :user_id, null: false
    end

    add_index :poll_answers, :polls_options_id
    add_index :poll_answers, :user_id
    add_index :poll_answers, [:user_id, :polls_options_id]
  end

  # rake db:migrate:down VERSION=20190416172551
  def down
    drop_table(:poll_answers)
  end
end

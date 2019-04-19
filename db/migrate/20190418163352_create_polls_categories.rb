class CreatePollsCategories < ActiveRecord::Migration[5.2]
  def up
    create_table(:polls_categories, id: false) do |t|
      t.integer :poll_id, index: true, null: false
      t.integer :category_id, index: true, null: false
    end
  end

  # rake db:migrate:down VERSION=20190418163352
  def down
    drop_table(:polls_categories)
  end
end

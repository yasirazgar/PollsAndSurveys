class CreateUsersCategories < ActiveRecord::Migration[6.0]
  def up
    create_table(:users_categories, id: false) do |t|
      t.integer :user_id, index: true, null: false
      t.integer :category_id, index: true, null: false
    end
  end

  # rake db:migrate:down VERSION=20201024170518
  def down
    drop_table(:users_categories)
  end

end

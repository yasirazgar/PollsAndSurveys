class CreateOption < ActiveRecord::Migration[5.2]
  def up
    create_table :options do |t|
      t.string :name
    end

    add_index :options, :name
  end

  # rake db:migrate:down VERSION=20190416172411
  def down
    drop_table(:options)
  end
end

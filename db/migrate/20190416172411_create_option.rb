class CreateOption < ActiveRecord::Migration[5.2]
  def up
    create_table :options do |t|
      t.string :option
    end

    add_index :options, :option
  end

  # rake db:migrate:down VERSION=20190416172411
  def down
    drop_table(:options)
  end
end

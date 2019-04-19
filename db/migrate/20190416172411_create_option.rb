class CreateOption < ActiveRecord::Migration[5.2]
  def up
    create_table :options do |t|
      t.string :option
    end
  end

  def down
    drop_table(:options)
  end
end

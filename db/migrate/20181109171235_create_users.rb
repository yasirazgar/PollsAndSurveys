class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      t.string :email
      t.string :encrypted_password
      t.string :name
      t.string :nick_name, null: false
      t.string :uid
      t.string :provider
      t.string :token

      t.timestamps
    end
  end

  def down
  	drop_table(:users)
  end
end

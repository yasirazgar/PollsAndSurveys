class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :nick_name, null: false
      t.string :uid
      t.string :provider
      t.string :token
      t.boolean :admin

      t.timestamps
    end
  end

  # rake db:migrate:down VERSION=20181109171235
  def down
  	drop_table(:users)
  end
end

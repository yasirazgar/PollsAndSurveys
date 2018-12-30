# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_10_045829) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "aliases", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "polls", force: :cascade do |t|
    t.integer "user_id"
    t.integer "category_ids", array: true
    t.text "options", array: true
    t.integer "mutlioption"
  end

  create_table "user_details", force: :cascade do |t|
    t.integer "user_id"
    t.string "gender"
    t.text "phone"
    t.text "about"
    t.string "avatar"
    t.string "location"
    t.integer "category_ids", array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "encrypted_password"
    t.string "name"
    t.string "nick_name", null: false
    t.string "uid"
    t.string "provider"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
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

ActiveRecord::Schema.define(version: 2019_04_18_163352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.text "aliases", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "options", force: :cascade do |t|
    t.string "name"
    t.index ["name"], name: "index_options_on_name"
  end

  create_table "poll_answers", force: :cascade do |t|
    t.integer "polls_options_id", null: false
    t.integer "user_id", null: false
    t.index ["polls_options_id"], name: "index_poll_answers_on_polls_options_id"
    t.index ["user_id", "polls_options_id"], name: "index_poll_answers_on_user_id_and_polls_options_id"
    t.index ["user_id"], name: "index_poll_answers_on_user_id"
  end

  create_table "polls", force: :cascade do |t|
    t.integer "user_id", null: false
    t.text "question", null: false
    t.integer "age_group", array: true
    t.index ["user_id"], name: "index_polls_on_user_id"
  end

  create_table "polls_categories", id: false, force: :cascade do |t|
    t.integer "poll_id", null: false
    t.integer "category_id", null: false
    t.index ["category_id"], name: "index_polls_categories_on_category_id"
    t.index ["poll_id"], name: "index_polls_categories_on_poll_id"
  end

  create_table "polls_options", force: :cascade do |t|
    t.integer "poll_id", null: false
    t.integer "option_id", null: false
    t.index ["option_id"], name: "index_polls_options_on_option_id"
    t.index ["poll_id", "option_id"], name: "index_polls_options_on_poll_id_and_option_id", unique: true
    t.index ["poll_id"], name: "index_polls_options_on_poll_id"
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
    t.string "password_digest"
    t.string "name"
    t.string "nick_name", null: false
    t.string "uid"
    t.string "provider"
    t.string "token"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

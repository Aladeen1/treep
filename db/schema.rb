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

ActiveRecord::Schema.define(version: 2019_05_27_111549) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dette_ecos", force: :cascade do |t|
    t.integer "total"
    t.integer "skytreep_participation"
    t.integer "user_participation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "flight_id"
    t.index ["flight_id"], name: "index_dette_ecos_on_flight_id"
    t.index ["user_id"], name: "index_dette_ecos_on_user_id"
  end

  create_table "flights", force: :cascade do |t|
    t.integer "price"
    t.string "ville_aller"
    t.string "ville_retour"
    t.string "date_aller"
    t.string "date_retour"
    t.integer "distance"
    t.integer "co2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "status"
    t.integer "dette_eco"
    t.integer "skytreep_participation"
    t.integer "user_participation"
    t.index ["user_id"], name: "index_flights_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "trees"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "dette_ecos", "flights"
  add_foreign_key "dette_ecos", "users"
  add_foreign_key "flights", "users"
end

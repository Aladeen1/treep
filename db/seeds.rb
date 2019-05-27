# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'faker'

Flight.destroy_all
User.destroy_all

puts 'seeding starts'

10.times do

  user = User.create(
    email: Faker::Internet.email,
    password: 123456,
    password_confirmation: 123456,
    trees: rand(1..1_000)
    )

  rand(1..4).times do
    flight = Flight.new(
    price: rand(300..700),
    ville_aller: Faker::Games::Pokemon.name,
    ville_retour: Faker::Games::Pokemon.name,
    date_aller: Faker::Date.forward(7),
    date_retour: Faker::Date.forward(23),
    distance: rand(1_000..3_000),
    co2: rand(500..1_000),
    user_id: user.id,
    status: ""
    )
    
    flight.save!

  end
end


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = User.create(nick_name: 'collector', name: 'Yasir', email: 'yasir@gmail.com', password: '@Rac123')
user1 = User.create(nick_name: 'azzu', name: 'Azgar', email: 'azgar@gmail.com', password: '@Rac123')
user2 = User.create(nick_name: 'hawk', name: 'Mohammed', email: 'mohammed@gmail.com', password: '@Rac123')

cat1 = Category.create(name: 'Software', aliases: ['It', 'Information Technology'])
cat2 = Category.create(name: 'Software Development', aliases: ['It', 'Information Technology', 'Software'])
cat3 = Category.create(name: 'politics', aliases: ['Elections'])
cat3 = Category.create(name: 'Gk')

opt1 = Option.create(name: 'Java')
opt2 = Option.create(name: 'JavaScript')
opt3 = Option.create(name: 'Ruby')
opt4 = Option.create(name: 'Python')
opt5 = Option.create(name: 'Cobra')
opt6 = Option.create(name: 'Rattle')
opt7 = Option.create(name: 'Black mamba')
opt8 = Option.create(name: 'Cat')
opt9 = Option.create(name: 'Dog')

poll1 = Poll.new(question: 'Your fav language', user_id: admin.id, age_group: [3,4,5,6])
poll1.categories << cat1
poll1.categories << cat2
poll1.save

poll1_opt1 = PollsOptions.create(poll_id: poll1.id, option_id: opt1.id)
poll1_opt2 = PollsOptions.create(poll_id: poll1.id, option_id: opt2.id)
poll1_opt3 = PollsOptions.create(poll_id: poll1.id, option_id: opt3.id)
poll1_opt4 = PollsOptions.create(poll_id: poll1.id, option_id: opt4.id)
poll1_ans1 = PollAnswer.create(user_id: admin.id, polls_options_id: poll1_opt1.id)
poll1_ans2 = PollAnswer.create(user_id: user1.id, polls_options_id: poll1_opt2.id)
poll1_ans1 = PollAnswer.create(user_id: user2.id, polls_options_id: poll1_opt3.id)

poll2 = Poll.new(question: 'Longest Snake', category_ids: [cat3.id], user_id: user1.id, age_group: [1])
poll2.categories << cat3
poll2.save

poll2_opt1 = PollsOptions.create(poll_id: poll2.id, option_id: opt4.id)
poll2_opt2 = PollsOptions.create(poll_id: poll2.id, option_id: opt5.id)
poll2_opt3 = PollsOptions.create(poll_id: poll2.id, option_id: opt6.id)
poll2_opt4 = PollsOptions.create(poll_id: poll2.id, option_id: opt7.id)
poll2_ans1 = PollAnswer.create(user_id: admin.id, polls_options_id: poll2_opt1.id)
poll2_ans2 = PollAnswer.create(user_id: user1.id, polls_options_id: poll2_opt2.id)
poll2_ans3 = PollAnswer.create(user_id: user2.id, polls_options_id: poll2_opt3.id)

poll3 = Poll.create(question: 'What do you like the most', user_id: user2.id, age_group: nil)

poll3_opt1 = PollsOptions.create(poll_id: poll3.id, option_id: opt3.id)
poll3_opt2 = PollsOptions.create(poll_id: poll3.id, option_id: opt5.id)
poll3_opt3 = PollsOptions.create(poll_id: poll3.id, option_id: opt8.id)
poll3_opt4 = PollsOptions.create(poll_id: poll3.id, option_id: opt9.id)
poll3_ans1 = PollAnswer.create(user_id: admin.id, polls_options_id: poll3_opt1.id)
poll3_ans2 = PollAnswer.create(user_id: user1.id, polls_options_id: poll3_opt2.id)
poll3_ans3 = PollAnswer.create(user_id: user2.id, polls_options_id: poll3_opt3.id)




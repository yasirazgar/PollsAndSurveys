FactoryBot.define do
  factory :user_detail do
    first_name { "John" }
    last_name  { "Doe" }
    admin { false }
  end
end
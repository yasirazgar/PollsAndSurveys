FactoryBot.define do
  factory :user, class: 'User' do
    sequence(:email) { |n| "some-email#{n}@pas.org" }
    sequence(:name) { |n| "Some Person#{n}" }
    sequence(:nick_name) { |n| "nick name#{n}" }
    password { 'passworD%1' }

    trait :admin do
      admin { true }
    end
  end
end
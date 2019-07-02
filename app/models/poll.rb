# Table "public.polls"
#     Column     |   Type    | Collation | Nullable |              Default
# ---------------+-----------+-----------+----------+-----------------------------------
#  id            | bigint    |           | not null | nextval('polls_id_seq'::regclass)
#  user_id       | integer   |           | not null |
#  question      | text      |           | not null |
#  age_group_ids | integer[] |           |          |
# Indexes:
#     "polls_pkey" PRIMARY KEY, btree (id)
#     "index_polls_on_user_id" btree (user_id)

class Poll < ApplicationRecord
  module Age
    ALL = 'all'
    GROUPING = {
      0 => ALL,
      1 => '5 - 10',
      2 => '11 - 17',
      3 => '18 - 29',
      4 => '30 - 40',
      5 => '41 - 50',
      6 => '50+'
    } # Make sure this is in sync with constants.js #AGE_SELECT_OPTIONS
  end

	belongs_to :user
  has_many :polls_options, class_name: 'PollsOptions'
  has_many :options, through: :polls_options
  has_many :poll_answers, through: :polls_options
  has_and_belongs_to_many :categories,
    class_name: 'Category',
    join_table: 'polls_categories'

  validates :question, presence: true
  validates :question, uniqueness: { scope: :user_id }

  accepts_nested_attributes_for :options
end
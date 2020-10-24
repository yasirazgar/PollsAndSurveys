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
    RANGE = {
      1 => (5..10),
      2 => (11..17),
      3 => (18..29),
      4 => (30..40),
      5 => (41..50),
      6 => (51..130)
    } # Make sure keys of grouping and range are same
  end

	belongs_to :user
  has_many :poll_options, class_name: 'PollOption', dependent: :destroy
  has_many :options, through: :poll_options, dependent: :destroy
  has_many :poll_answers, through: :poll_options
  has_and_belongs_to_many :categories,
    class_name: 'Category',
    join_table: 'polls_categories'

  validates :question, presence: true
  validates :question, uniqueness: { scope: :user_id }

  accepts_nested_attributes_for :options
end
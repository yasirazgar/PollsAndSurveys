# Table "public.polls"
#     Column    |   Type    | Collation | Nullable |              Default
# --------------+-----------+-----------+----------+-----------------------------------
#  id           | bigint    |           | not null | nextval('polls_id_seq'::regclass)
#  user_id      | integer   |           | not null |
#  question     | text      |           | not null |
#  category_ids | integer[] |           |          |
# Indexes:
#     "polls_pkey" PRIMARY KEY, btree (id)
#     "index_polls_on_user_id" btree (user_id)

class Poll < ApplicationRecord
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
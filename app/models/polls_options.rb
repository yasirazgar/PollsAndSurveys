# Table "public.polls_options"
#   Column   |  Type   | Collation | Nullable |                  Default
# -----------+---------+-----------+----------+-------------------------------------------
#  id        | bigint  |           | not null | nextval('polls_options_id_seq'::regclass)
#  poll_id   | integer |           | not null |
#  option_id | integer |           | not null |
# Indexes:
#     "polls_options_pkey" PRIMARY KEY, btree (id)
#     "index_polls_options_on_option_id" btree (option_id)
#     "index_polls_options_on_poll_id" btree (poll_id)
#     "index_polls_options_on_poll_id_and_option_id" btree (poll_id, option_id)

class PollsOptions < ApplicationRecord
	belongs_to :poll
  belongs_to :option
  has_many :poll_answers
end
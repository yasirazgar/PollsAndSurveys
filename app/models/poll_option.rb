# Table "public.poll_options"
#   Column   |  Type   | Collation | Nullable |                  Default
# -----------+---------+-----------+----------+-------------------------------------------
#  id        | bigint  |           | not null | nextval('poll_options_id_seq'::regclass)
#  poll_id   | integer |           | not null |
#  option_id | integer |           | not null |
# Indexes:
#     "poll_options_pkey" PRIMARY KEY, btree (id)
#     "index_poll_options_on_option_id" btree (option_id)
#     "index_poll_options_on_poll_id" btree (poll_id)
#     "index_poll_options_on_poll_id_and_option_id" btree (poll_id, option_id)

class PollOption < ApplicationRecord
	belongs_to :poll
  belongs_to :option
  has_many :poll_answers
end
# frozen_string_literal: true

# Table "public.poll_answers"
#      Column     |  Type   | Collation | Nullable |                 Default
# ----------------+---------+-----------+----------+------------------------------------------
#  id             | bigint  |           | not null | nextval('poll_answers_id_seq'::regclass)
#  poll_option_id | integer |           | not null |
#  user_id        | integer |           | not null |
# Indexes:
#     "poll_answers_pkey" PRIMARY KEY, btree (id)
#     "index_poll_answers_on_poll_option_id" btree (poll_option_id)
#     "index_poll_answers_on_user_id" btree (user_id)
#     "index_poll_answers_on_user_id_and_poll_option_id" btree (user_id, poll_option_id)
class PollAnswer < ApplicationRecord
  belongs_to :poll_option
  has_one :option, through: :poll_option
  has_one :poll, through: :poll_option
  belongs_to :user
end

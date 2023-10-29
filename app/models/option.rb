# frozen_string_literal: true

# Table "public.options"
#  Column |       Type        | Collation | Nullable |               Default
# --------+-------------------+-----------+----------+-------------------------------------
#  id     | bigint            |           | not null | nextval('options_id_seq'::regclass)
#  name | character varying |           |          |
# Indexes:
#     "options_pkey" PRIMARY KEY, btree (id)
class Option < ApplicationRecord
  has_many :polls, through: :poll_options

  validates :name, presence: true
end

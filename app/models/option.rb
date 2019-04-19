# Table "public.options"
#  Column |       Type        | Collation | Nullable |               Default
# --------+-------------------+-----------+----------+-------------------------------------
#  id     | bigint            |           | not null | nextval('options_id_seq'::regclass)
#  option | character varying |           |          |
# Indexes:
#     "options_pkey" PRIMARY KEY, btree (id)

class Option < ApplicationRecord
	has_many :polls, through: :poll_options

  validates :option, presence: true

end
#     Column    |       Type        | Collation | Nullable |                 Default
# --------------+-------------------+-----------+----------+------------------------------------------
#  id           | bigint            |           | not null | nextval('user_details_id_seq'::regclass)
#  user_id      | integer           |           |          |
#  gender       | character varying |           |          |
#  phone        | text              |           |          |
#  about        | text              |           |          |
#  avatar       | character varying |           |          |
#  location     | character varying |           |          |
#  category_ids | integer[]         |           |          |
#  birth_date   | date              |           |          |
# Indexes:
#     "user_details_pkey" PRIMARY KEY, btree (id)

class UserDetails < ApplicationRecord
	belongs_to :user
end
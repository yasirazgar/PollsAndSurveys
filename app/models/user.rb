#  Column       |            Type             | Collation | Nullable |              Default
# --------------------+-----------------------------+-----------+----------+-----------------------------------
#  id                 | bigint                      |           | not null | nextval('users_id_seq'::regclass)
#  email              | character varying           |           |          |
#  password_digest    | character varying           |           |          |
#  name               | character varying           |           |          |
#  nick_name          | character varying           |           | not null |
#  uid                | character varying           |           |          |
#  provider           | character varying           |           |          |
#  token              | character varying           |           |          |
#  created_at         | timestamp without time zone |           | not null |
#  updated_at         | timestamp without time zone |           | not null |
# Indexes:
#     "users_pkey" PRIMARY KEY, btree (id)

class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :nick_name, presence: true, uniqueness: true

	has_one :details, class_name: 'UserDetails'
	has_many :polls
  has_many :poll_answers

	def interests
		interested_categories.pluck(:name)
	end

	def interested_categories
		Category.where(id: details.category_ids)
	end
end
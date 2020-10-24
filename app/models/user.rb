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

  has_one :details, class_name: 'UserDetail', foreign_key: :user_id, dependent: :destroy
	has_many :polls
  has_many :poll_answers, dependent: :destroy
  has_many :responded_polls, through: :poll_answers, source: :poll

  delegate :age, :age_group, to: :details, allow_nil: true
end
# frozen_string_literal: true

# Table "public.categories"
#    Column   |            Type             | Collation | Nullable |                Default
# ------------+-----------------------------+-----------+----------+----------------------------------------
#  id         | bigint                      |           | not null | nextval('categories_id_seq'::regclass)
#  code       | character varying           |           | not null |
#  aliases    | text[]                      |           |          |
#  created_at | timestamp without time zone |           | not null |
#  updated_at | timestamp without time zone |           | not null |
# Indexes:
#     "categories_pkey" PRIMARY KEY, btree (id)
class Category < ApplicationRecord
  validates :code, presence: true, uniqueness: true
  has_and_belongs_to_many :polls, class_name: 'Poll', join_table: 'polls_categories'
  has_and_belongs_to_many :users, class_name: 'User', join_table: 'users_categories'

  scope :ids_codes, -> { pluck(:id, :code) }
end
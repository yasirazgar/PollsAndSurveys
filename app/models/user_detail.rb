# frozen_string_literal: true

#     Column    |       Type        | Collation | Nullable |                 Default
# --------------+-------------------+-----------+----------+------------------------------------------
#  id           | bigint            |           | not null | nextval('user_details_id_seq'::regclass)
#  user_id      | integer           |           |          |
#  gender       | character varying |           |          |
#  phone        | text              |           |          |
#  about        | text              |           |          |
#  avatar       | character varying |           |          |
#  location     | character varying |           |          |
#  birth_date   | date              |           |          |
# Indexes:
#     "user_details_pkey" PRIMARY KEY, btree (id)
class UserDetail < ApplicationRecord

  belongs_to :user, class_name: 'User', foreign_key: 'user_id'

  def age
    return unless birth_date

    ((Time.now.to_date - birth_date).to_f / 365).round(0)
  end

  def age_group
    return Poll::Age::GROUPING.key(Poll::Age::ALL) unless (user_age = age)

    Poll::Age::RANGE.keys.find do |key|
      Poll::Age::RANGE[key].include?(user_age)
    end
  end
end

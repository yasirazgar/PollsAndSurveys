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

class UserDetail < ApplicationRecord

  belongs_to :user, :class_name => 'User', :foreign_key => 'user_id'

  def age
    return unless self.birth_date
    ((Time.now.to_date - self.birth_date).to_f / 365.to_f).round(0)
  end

  def age_group
    return Poll::Age::GROUPING.key(Poll::Age::ALL) unless (user_age = age)

    age_group = Poll::Age::RANGE.keys.find do |key|
      Poll::Age::RANGE[key].include?(user_age)
    end
  end
end
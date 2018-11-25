class User < ApplicationRecord
	has_one :details, class_name: 'UserDetails'
	has_many :polls

	def interests
		interested_categories.pluck(:name)
	end

	def interested_categories
		Category.where(id: details.category_ids)
	end

end
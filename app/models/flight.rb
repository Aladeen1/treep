class Flight < ApplicationRecord
	belongs_to :user
	has_one :dette_eco, dependent: :destroy
end

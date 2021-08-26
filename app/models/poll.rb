# frozen_string_literal: true

class Poll < ApplicationRecord
  validates :title, presence: true, length: { maximum: 50 }
  validates :options, presence: true
end

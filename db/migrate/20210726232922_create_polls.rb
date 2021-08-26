# frozen_string_literal: true

class CreatePolls < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.text :title
      t.text :options, array: true
      t.text :results, array: true
      t.timestamps
    end
  end
end

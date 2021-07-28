class MakeTitleNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :polls, :title, false
  end
end

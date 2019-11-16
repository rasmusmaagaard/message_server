class AddSenderToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :sender, :string
  end
end

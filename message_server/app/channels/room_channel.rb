class RoomChannel < ApplicationCable::Channel
  # Life cycle methods
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # Client (RPC) methods
  def broadcast(data)
    message = { sender: data['sender'], content: data['content'] }

    # Reject messages without content
    return if message[:content].empty?

    # Due to GDPR concerns we do not persist the messages :/
    # Message.create! message

    ActionCable.server.broadcast 'room_channel', message
  end
end

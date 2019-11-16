class RoomChannel < ApplicationCable::Channel
  # Life cycle methods
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # Client (RPC) methods
  def broadcast(params)
    sender = params.fetch('sender')
    message = params.fetch('message')

    if Message.new(content: message).save
      ActionCable.server.broadcast 'room_channel', content: "#{sender}: #{message}"
    end
  end
end

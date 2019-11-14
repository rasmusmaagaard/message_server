class MessagesController < ApplicationController
  def new
    @message = Message.new
  end

  def create
    @message = Message.create(message_params)
    if @message.save
      
    end
  end

  private

    def message_params
      params.require(:message).permit(:content)
    end
end
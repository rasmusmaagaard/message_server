class TardisController < ApplicationController
  def index
    @message = Message.new
  end
end

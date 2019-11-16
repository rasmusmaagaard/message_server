 import consumer from "./consumer"

let room = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(message) {
    // Called when there's incoming data on the websocket for this channel
    $('#messages').prepend('<div><b>'+message.sender+'</b> <i>'+message.content+'</i></div>');

    // Debugging pad
    console.log(message);
  },

  broadcast(message) {
    // Calls RoomChannel#broadcast on the server.
    this.perform("broadcast", message)
  },
});

let send_message = function() {
  let message_content = $('#message_content');
  let content = message_content.val();

  room.broadcast({ sender: 'Tardis', content: content });
  message_content.val('');
};

// Quick and dirty Unobtrusive JavaScript :)
$(document).on('turbolinks:load', function () {
  // The send button will send the message
  $('#send_message').on('click', function() {
    send_message()
  });

  // Pressing the return key will also send the message
  $('#message_content').on('keypress', function(event) {
    if (event.keyCode ===  13) { // 13 is return/enter
      send_message();
      event.preventDefault();
    }
  });
});

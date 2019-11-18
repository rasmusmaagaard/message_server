// Here we handle the Action Cable RoomChannel.
// TODO: Currently this is tightly coupled to the "Tardis" page. This should be refactored if the room channel is to be used from multiple pages.
 import consumer from "./consumer"

 var message_template_source;
 var message_template;

 let room = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(message) {
    // Called when there's incoming data on the websocket for this channel

    // Use handlebar template to create a new speechbubble and insert it below the existing messages.
    // After adding a new message we scroll the the bottom of the page to make it visible.
    $('#messages').append(message_template(message));
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');

    // Debugging pad
    console.log(message);
  },

  broadcast(message) {
    // Calls RoomChannel#broadcast on the server.
    this.perform("broadcast", message)
  },
});

// This helper method is called when the user press enter or use the send button.
// We get the content from the input field and send it.
// TODO: We are currently hardcoding the username "Tardis" and a orange color. The user should be able to choose it from the message interface.
let send_message = function() {
  let message_content = $('#message_content');
  let content = message_content.val();

  room.broadcast({ sender: 'Tardis', content: content, color: '#ff8750' });
  message_content.val('');
};

// Quick and dirty Unobtrusive JavaScript :)
$(document).on('turbolinks:load', function () {
  // The "Send" button used when sending a new message
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

  // Setup handlebar. We can first access the template after the page has load (using rails turbo links)
  message_template_source = document.getElementById("message-template").innerHTML;
  message_template = Handlebars.compile(message_template_source);
});

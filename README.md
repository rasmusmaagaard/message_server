# Rails 6 ActionCable study project
This is a "Chat server" written to learn Rails 6 generally and ActionCable specifically.

![Screenshot](Documentation/Screenshots/WebClient.gif?raw=true "Web Client")

## Overview
When running the sever it will make a websocket connection available at <ws://localhost:3000/cable>.
The server create a RoomChannel which clients can connect to. It provides a broadcast method which
clients can use to create a new message. The message will be broadcasted back to all clients connected.

All communication between the server and the webpage is using websockets. Only one get request is
made when retrieving the page.

The study project also includes a client written in Swift. This is the main client - the web client
was mainly written to learn how ActionCable works using the javascript features provided by Rails (before
attempting to connect to it directly).

Because of this the web client is not fully fledged. It does not auto reconnect if the connection drops.

### Message format
All messages are exchanged as json with the following format:

```{ "sender": "username", "content": "my message", "color": "#01ad9b" }.```

### Limitations
The messages are not persisted (due to GDPR concerns). It can be enabled by commenting in a line in the broadcast method.
When using the web client to send messages the color and username can not be changed (it is hardcoded to "Tardis" and orange). 

### Requirements
The project is using [rbenv](https://github.com/rbenv/rbenv) and [rbenv-gemset](https://github.com/jf/rbenv-gemset). It is setup to use: 
* Rails 6.0.0
* Ruby 2.6.5

Webpack will install the javascript dependencies:
* [jQuery](https://jquery.com)
* [Handlebars](https://handlebarsjs.com)

### Usage
Clone the project, install dependencies and run the server  :neckbeard:
```
git clone git@github.com:rasmusmaagaard/message_server.git
cd message_server/message_server
bundle install
yarn install --check-files
rails db:migrate
rails server
```
You should now be able to access the web client at <http://localhost:3000> (first page load will be slow because Webpacker
needs to compile).

### Acknowledgements
The CSS styling is heavily inspired from these codepens:
* [ChatBubbles](https://codepen.io/Kosai106/pen/eZvJwY)
* [Form](https://codepen.io/visualcookie/pen/kkwxPm)

### Final notes
Also checkout the [Swift client](https://github.com/rasmusmaagaard/MessageChannel)

As this is a study project with time constraints there is currently no tests :scream::rage::cry:

Also is has only been tested/run in development mode.

### TODO
- [ ] Add tests
- [ ] Ask for username
- [ ] Select color for chat bubbles 
- [ ] Create docker setup 

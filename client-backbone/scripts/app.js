var Chat = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  defaults: {
    username: 'anonymous',
    roomname: 'Double L'
  }
});

var Chats = Backbone.Collection.extend({
  model: Chat, 
  url: 'https://api.parse.com/1/classes/chatterbox',
  loadMsgs: function() {
    this.fetch();
  },
  parse: function(response, options) {
    return response.results;
  }
});

var ChatView = Backbone.View.extend({
  template: _.template(
      '<div class="message-container"> \
        <div class="add-friend"> \
          <%- username %> \
        </div> \
        : \
        <%- text %> \
      </div>'),

  render:  function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var ChatsView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage: function(chat) {
    var chatView = new ChatView({model: chat});
    this.$el.append(chatView.render());
  }

});

var FormView = Backbone.View.extend({

  events: {
    'click .submit-message': 'send',
    //'click .load-chats' : 'loadChats'
  },

  // loadChats: function() {
  //   var newChats = new Chats();
  //   $('.message-container').remove();
  //   newChats.loadMsgs();
  // },

  send: function(e) {
    e.preventDefault();
    var $text = this.$('.add-message');
    var $user = this.$('.add-username').val() || 'anonymous';

    this.collection.create({
      username: $user,
      text: $text.val()
    });

    $text.val('');

  }

});

var chats = new Chats();
chats.loadMsgs();
var formView = new FormView( { el: $('#main'), collection: chats } );
var chatsView = new ChatsView( { el: $('#chats'), collection: chats } );

$(document).on('click', '.load-chats', function() {
  $('.message-container').remove();
  chats.loadMsgs();
});

// var chatList = [];

// var fetch = function() {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'GET',
//     // data: JSON.stringify(message),
//     dataType: 'JSON',
//     contentType: 'application/json',
//     success: function (data) {
//       chatList = [];
//       $('#chats').empty();
//       for (var i = 0; i < 20; i++) {
//         chatList.push(new Chat(data.results[i].username, data.results[i].text, data.results[i].roomname));
//       }
//       var chats = new Chats(chatList);

//       var chatsView = new ChatsView( { model: chats } );

//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Error!');
//     }
//   });
// };

// fetch();


// var username = 'anonymous';
// var rooms = [];
// var ourRoom = 'Double L';
// var friends = [];

// var send = function(message) {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     // data: JSON.stringify({
//     //   username: username,
//     //   text: message,
//     //   roomname: ourRoom
//     // }),
//     data: { text: message.text },
//     dataType: 'JSON',
//     contentType: 'application/json',
//     success: function (data) {
//       // console.log('message sent');
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Error!');
//     }
//   });
// };

// $(document).on('click', '.submit-name', function() {
//   username = escapeHTML($('.add-username').val());
// });

// $(document).on('click', '.submit-message', function() {
//   // send(escapeHTML($('.add-message').val()));
//   // $('.add-message').val('');
//   var chats = new Chats();
//   // chats.send({
//   //   username: username,
//   //   text: message,
//   //   roomname: ourRoom
//   // });
// });


// var display = function(user, message) {
//   if (friends.indexOf(user) === -1) {
//     $('<div class="message-container"> <div class="add-friend">'+user+'</div>'+': '+message+'</div>').appendTo($('#chats'));
//   } else {
//     $('<div class="message-container friend"> <div class="add-friend">'+user+'</div>'+': '+message+'</div>').appendTo($('#chats'));
//   }
// };

// var fetch = function() {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'GET',
//     // data: JSON.stringify(message),
//     dataType: 'JSON',
//     contentType: 'application/json',
//     success: function (data) {
//       $('#chats').empty();
//       // console.log(data);
//       for (var i = 0; i < 20; i++) {
//         // populate room dropdown with room names of all loaded messages
//         var room = escapeHTML(data.results[i].roomname);
//         if (rooms.indexOf(room) === -1) {
//           $('#room').append('<option value=' + room + '>' + room + '</option>');
//           rooms.push(room);
//         }

//         if ($('#room').val() === 'common-room') {
//           display(escapeHTML(data.results[i].username), escapeHTML(data.results[i].text));
//         } else {
//           if ($('#room').val() === room) {
//             display(escapeHTML(data.results[i].username), escapeHTML(data.results[i].text));
//           }
//         }
//       }
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Error!');
//     }
//   });
// };


// fetch();



// $(document).on('change', '#room', function() {
//   fetch();
//   ourRoom = $('#room').val();
// });

// $(document).on('click', '.submit-room', function() {
//   var room = escapeHTML($('.add-room').val());
//   $('.add-room').val('');
//   $('#room').append('<option value=' + room + '>' + room + '</option>');
//   rooms.push(room);
// })

// $(document).on('click', '.add-friend', function() {
//   friends.push(escapeHTML($(this).text()));
//   fetch();
// });

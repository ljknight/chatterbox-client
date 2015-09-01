var escapeHTML = function(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var Chat = Backbone.Model.extend({
  initialize: function(user, message, roomname) {
    this.set('user', escapeHTML(user));
    this.set('message', escapeHTML(message));
    this.set('roomname', escapeHTML(roomname));
  }
});

// var ChatView = Backbone.View.extend({
//   initialize: function() {
//     // this.model.render();
//   },

//   render: function() {
//     var html = [
//       '<div class="message-container">',
//         '<div class="add-friend">',
//           this.model.get('user'),
//         '</div>',
//         ': ',
//         this.model.get('message'),
//       '</div>'
//     ].join('');

//     return this.$el.html(html);
//   }
// });

var Chats = Backbone.Collection.extend({
  model: Chat
});

var ChatsView = Backbone.View.extend({
  intitialize: function() {
  },

  render: function() {

    var html = [
      '<div>',
      '</div>'
    ].join('');

    this.$el.html(html);

    this.$el.find('div').append(this.model.map(function(chat) {
      return [
        '<div class="message-container">',
          '<div class="add-friend">',
            chat.get('user'),
          '</div>',
          ': ',
          chat.get('message'),
        '</div>'
      ].join('');
    }));

    return this.$el;
  }
});

var chatList = [];

var fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      chatList = [];
      $('#chats').empty();
      for (var i = 0; i < 20; i++) {
        chatList.push(new Chat(data.results[i].username, data.results[i].text, data.results[i].roomname));
      }
      var chats = new Chats(chatList);

      var chatsView = new ChatsView( { model: chats } );

      $('#chats').append(chatsView.render());
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Error!');
    }
  });
};

fetch();

$(document).on('click', '.load-chats', function() {
  fetch();
});

// var username = 'anonymous';
// var rooms = [];
// var ourRoom = 'Double L';
// var friends = [];

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

// var send = function(message) {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     data: JSON.stringify({
//       username: username,
//       text: message,
//       roomname: ourRoom
//     }),
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

// fetch();

// $(document).on('click', '.submit-name', function() {
//   username = escapeHTML($('.add-username').val());
// });

// $(document).on('click', '.submit-message', function() {
//   send(escapeHTML($('.add-message').val()));
//   $('.add-message').val('');
// });


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

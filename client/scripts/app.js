var escapeHTML = function(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}; 

var display = function(user, message) {
  $('#chats').prepend('<div>'+user+': '+message+'</div>');
};

var fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      $('#chats').empty();
      for (var i = 0; i < 10; i++) {
        display(escapeHTML(data.results[i].username), escapeHTML(data.results[i].text));
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Error!');
    }
  });
};

fetch();

// setInterval(function() {fetch();}, 5000);

$(document).on('click', '.load-chats', function() {
  fetch();
});


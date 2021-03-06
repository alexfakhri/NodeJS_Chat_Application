var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.broadcast.emit('userConnection', 'New user connected')
	// io.emit('userConnection', 'New user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
		io.emit('userDisconnection', 'User disconnected');

	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
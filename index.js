var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.send('<h1>Lorem Ipsum</h1>');
  res.sendFile(__dirname + '/index.html');
});

// 用户进入
io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('hi', '有人进入房间了 :3');

  // 用户离开
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('hi', '有人离开了 :|');
  });

  // 聊天消息事件
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
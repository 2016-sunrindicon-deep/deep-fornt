var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var bodyParser = require('body-parser');


app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended : false}))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/main.html');
//   // res.sendfile(__dirname + '/socket.io/socket.io.js')
// })

http.listen(7727, function(){
  console.log('listening on *:7727');
});
app.get('/',function(req,res){
      res.render('login.html', {

      });
});
// app.get('/main',function(req,res){
//   res.render('main.html', {
//       title: "NO.W.HERE",
//       Country: "KOREA",
//       Username : "eunsolKang"
//   });
// });
var db = [{}]
app.post('/main', function(req, res){
  db[db.length - 1].id = req.body.id_input;
  db[db.length - 1].pw = req.body.pw_input;
  res.render('main.html', {
        title: "NO.w.HERE",
        Country: 'korea',
        Username : db[db.length - 1].id
    });
});
app.post('/login', function(req, res){
  console.log(db)
  var id = req.body.id_input;
  var checked = false;
  for(var i=0; i<db.length; i++){
    console.log('welcome')
    if(id == db[i].id)
    {
      console.log('welcome!!!!!!')
      res.render('main.html', {
            title: "NO.w.HERE",
            Country: 'korea',
            Username : db[i].id
      });
      checked = true;
    }
  }
  if(!checked)
  {
    return 0;
  }
})
var userList = [];


io.on('connection', function(socket){
  var joinedUser = false;
  var nickname;

  // 유저 입장
  socket.on('join', function(data){
    if (joinedUser) { // 이미 입장 했다면 중단
      return false;
    }

    userList.push(nickname);
    socket.broadcast.emit('join', {
      nickname : nickname
      ,userList : userList
    });

    socket.emit('welcome', {
      nickname : nickname
      ,userList : userList
    });

    joinedUser = true;
  });


  // 메시지 전달
  socket.on('msg', function(data){
      console.log(data.nickname+':'+ data.msg);
      io.emit('msg', {
        nickname : data.nickname
        ,msg : data.msg
      });

  });


  // 접속 종료
  socket.on('disconnect', function () {
    // 입장하지 않았다면 중단
    if ( !joinedUser) {
      console.log('--- not joinedUser left');
      return false;
    }

    // 접속자목록에서 제거
    var i = userList.indexOf(nickname);
    userList.splice(i,1);

    socket.broadcast.emit('left', {
      nickname : nickname
      ,userList : userList
    });
  });
});


// var bodyParser = require('body-parser')
// var session = require('express-session')
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy
//
// app.use(bodyParser.urlencoded({ extended : false }))
// app.set('view engine', 'jade');
// app.set('views', './views');
// // app.use(session({
// //   secret : "alsjdflasjdf@jlfjaSf9as9df"
// //   resave : false
// //   saveUninitalized : true
// // }))
// // app.use(passport.initalize())
// // app.use(passport.session())
//
// // passport.use(new LocalStrategy({
// //   usernameField : 'id',
// //   passwordField : 'pw'
// // },function(id, pw, done) {
// //
// // }))
// app.locals.pretty = true;
// app.use(express.static('public'));
// app.get('/template', function(req, res){
//   res.render('index', {time:Date(), title:'Jade'});
// })
// app.get('/', function(req, res){
//     res.filesend()
// });
//
// app.get('/route', function(req, res){
//     res.send('Hello Router, <img src="/route.png">')
// });
// app.get('/topic', function(req, res){
//   res.send(req.params.id);
// });
// app.post('/login', function(req, res){
//     var title = req.body.title;
//     var dis = req.body.dis;
//
//     res.send(title + ',' + dis)
// });
// app.listen(3000, function(){
//     console.log('Conneted 3000 port!');
// });

 // External Modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');

// CONFIG
//var config = require('./config');

//Controllers
var UsersCtrl = require('./controllers/UsersCtrl');

// Services
var passport = require('./services/passport');

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../public'));
app.use(session({
    secret: 'akjajfalkdj',
    saveUninitialized: true,
      resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Endpoints

//sign up and login
//app.post('/user', UsersCtrl.register);
//app.post('/login', passport.authenticate('local'), function(req, res) {
//    res.json(req.user);
//});
// app.post('/login', passport.authenticate('local', {
//     //successRedirect: '/#/users',
//     failureRedirect: '/'
//     }), function(req, res){
//         if (req.user.admin === true) {
//             res.redirect('http://www.amazon.com');
//         } else {
//             res.redirect('http://www.google.com');
//         }
// });


//get user and users
//app.get('/user/:id', UsersCtrl.getCurrentUser);
//app.get('/sessionUser', UsersCtrl.me)
//app.get('/logout', function(req, res){
//    req.logout();
//    res.redirect('/');
//});





//Connection
//var mongoUri = config.MONGO_URI;
//var port = config.PORT;
var mongoUri = "mongodb://localhost:27017/devcommerce"
var port = 9998;

// mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
    console.log('connected to monogdb at: ' + mongoUri);
});

app.listen(port, function(){
    console.log('listening on port: ' + port);
}) 
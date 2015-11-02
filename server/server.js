 // External Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// CONFIG
<<<<<<< HEAD
//var config = require('./config');
=======
var config = require('../config');
>>>>>>> master

//Controllers
var UsersCtrl = require('./controllers/UsersCtrl');
var ProductsCtrl = require('./controllers/ProductsCtrl');
var OrdersCtrl= require('./controllers/OrdersCtrl');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../public'));
// Endpoints

<<<<<<< HEAD
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

=======
>>>>>>> master

//-----endpoints for users
app.get('/api/users', UsersCtrl.findAll);
app.get('/api/users/:id', UsersCtrl.findOne);
app.post('/api/users', UsersCtrl.create);
app.put('/api/users/:id', UsersCtrl.update);
app.delete('/api/users/:id', UsersCtrl.delete);

//-----endpoints for orders---------
// app.get('/api/orders', OrdersCtrl.findAll);
// app.get('/api/orders/:id', OrdersCtrl.findOne);
// app.post('/api/orders', OrdersCtrl.create);
// app.put('/api/orders/:id', OrdersCtrl.update);
// app.delete('/orders/:id', OrdersCtrl.delete);

//-----endpoints for products-------
app.get('/api/products', ProductsCtrl.findAll);
app.get('/api/products/:id', ProductsCtrl.findOne);
app.post('/api/products', ProductsCtrl.create);
app.put('/api/products/:id', ProductsCtrl.update);
app.delete('/api/products/:id', ProductsCtrl.delete);



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
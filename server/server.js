 // External Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('express-session');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = (process.env.MANDRILL_ID)

// CONFIG
var stripe = require('stripe')('sk_test_nKAYqh1v37Dt9MYHfyMBALoD');
var AWS = require('aws-sdk');
var config = require('../config');


//Controllers
var UsersCtrl = require('./controllers/UsersCtrl');
var ProductsCtrl = require('./controllers/ProductsCtrl');
var OrdersCtrl= require('./controllers/OrdersCtrl');
var MandrillCtrl = require('./controllers/ContactCtrl')

// Services
var passport = require('./services/passport');

// Policies
var isAuthed = function(req, res, next){
	if(!req.isAuthenticated()) return res.sendStatus(401);
	return next();
};

// Express
var app = express();

// Middleware
app.use(bodyParser.json({limit: '50mb'}));
//app.use(express.static(__dirname + '/../public'));
app.use(session({
	secret: 'blah',
	saveUninitialized: true,
  	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Endpoints

//-----login
app.post('/api/login', passport.authenticate('local'), function(req, res) {
	console.log(req.body)
	res.json(req.user);
});
app.get('/api/sessionUser', UsersCtrl.me)
app.get('/api/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


//-----endpoints for users
app.get('/api/users', UsersCtrl.findAll);
app.get('/api/users/:id', UsersCtrl.findOne);
app.get('/api/user', function(req, res){
	res.json(req.user)
})
app.post('/api/users', UsersCtrl.create);
app.put('/api/users/:id', UsersCtrl.update);
app.delete('/api/users/:id', UsersCtrl.delete);

//-----endpoints for orders---------
app.get('/api/orders', OrdersCtrl.findAll);
app.get('/api/orders/:id', OrdersCtrl.findOne);
app.post('/api/orders', OrdersCtrl.create);
app.put('/api/orders/:id', OrdersCtrl.update);
app.delete('/api/orders/:id', OrdersCtrl.delete);

app.post('/api/checkout', OrdersCtrl.checkout);

//-----endpoints for products-------
app.get('/api/products', ProductsCtrl.findAll);
app.get('/api/products/:id', ProductsCtrl.findById);
app.get('/api/products/category/:category', ProductsCtrl.findOne)
app.get('/api/products/newarrival/:newarrival', ProductsCtrl.findNewArrival)
app.get('/api/products/sale/:sale', ProductsCtrl.findSale)
app.post('/api/products', ProductsCtrl.create);
app.put('/api/products/:id', ProductsCtrl.update);
app.put('/api/productsandimage/:id', ProductsCtrl.updateImage);
app.delete('/api/products/:id', ProductsCtrl.delete);

//-----endpoints for mandrill-------
app.post('/api/contactus', MandrillCtrl.sendMail);




//CART

function isCart (req, res, next) {
    if (!req.session.cart) {
        req.session.cart = []
    }
    next()
}

app.put('/api/cart', isCart,  function(req, res) {
    req.session.cart.push(req.body);
    res.send(req.session.cart)
})

app.get('/api/cart', isCart,  function(req, res) {
    res.send(req.session.cart)
})

app.put('/api/cart/update', function(req, res) {
    req.session.cart = req.body;
    res.send(req.session.cart)
})
app.delete('/api/cart', function(req, res){
    req.session.cart = [];
    res.send(req.session.cart)
})




//get authorized user
app.get('/user/auth', function(req, res) {
    if (req.user) {
        res.send(req.user)
    }
    res.end()
})





//Connection
var mongoUri = config.MONGO_URI;
var port = config.PORT;

// mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
    console.log('connected to monogdb at: ' + mongoUri);
});

app.listen(port, function(){
    console.log('listening on port: ' + port);
}) 
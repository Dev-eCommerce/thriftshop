 // External Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// CONFIG
var config = require('../config');

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
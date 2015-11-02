// External Modules
var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');


// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express());
app.use(session({
    secret: 'thriftshop',
    saveUninitialized: true,
  	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));

// Services
var passport = require('./services/passport');

// First you need to create a connection to the db
var con = mysql.createConnection({
	host: 'sql3.freemysqlhosting.net',
	database: 'sql394886',
	user: 'sql394886',
	password: 'yV9%wW9%',
	port: 3306
})

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//Endpoints

//Login in User
app.post('/login', passport.authenticate('local'), function(req, res) {
	res.json(req.user);
    
app.post("/users", function(req, res){
    var user = {
        name: req.body.name,
        location: req.body.location
    };

    con.query('INSERT INTO Users set ?', user, function(err, res){
        if(err){
            console.log(err);
            return
        }
        console.log(res);
    })
});

app.post('/products', function(req, res){
    var product = {
		price: req.body.price,
        productName: req.body.productName,
        inventory: req.body.inventory,
        description: req.body.description
        
	}
    
    con.query('INSERT INTO Products set ?', product, function(err, res){
        if (err){
            console.log(err)
            return
        }
        console.log(res)
    })
})

app.get("/users", function(req, res){

    con.query('SELECT * FROM Users', function(err, result){
        if(err){
            console.log(err);
            return
        }
        console.log(result);
    })
})

app.get("/users/:id", function(req, res){
    console.log(req.params.id);

    con.query('SELECT * FROM Users WHERE id=' + req.params.id, function(err, result){
        if(err){
            console.log(err);
            return
        }
        console.log(result);
    })
})

// con.end(function(err) {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

app.listen(4000, function(){
	console.log("I am listing on port 4000")
})


// var product = {
// 	price: 20.00,
// 	productName: "Shirt",
// 	inventory: 10,
// 	description: "Blue with ruffles",
// 	userid: 1
// }

// con.query('INSERT INTO Products set ?', product, function(err, res){
// 	if(err){
// 		console.log(err);
// 		return
// 	}
// 	console.log(res);
// })

// var knex = require('knex')({
// 	client: 'mysql',
// 	connection: {
// 	host: 'sql3.freemysqlhosting.net',
// 	user: 'sql394886',
// 	password: 'yV9%wW9%',
// 	database: 'sql394886',
// 	}
// })


// Var User = require('./userModel');
// var knex = require('./knex')


// module.exports = function(knex){
// 	return {
// 		insertUser: function(userName, location){
// 			knex('Users').insert({name: userName, location: location })	
			
// 		// 	INSERT INTO User (id, name, location) VALUES
// 		// (1, 'Jasmine', 'Australia'),
// 		// (2, 'Jay', 'India'),
// 		// (3, 'Jim', 'Germany'),
// 		// (4, 'Lesley', 'Scotland');
// 		}
// 	}
// };



// var knex = require('./knex')

// var User = knex.schema.createTable('users', function(table){
// 	table.increments();
// 	table.string('name');
// 	table.string('location');
// 	table.timestamps();
// })

// module.exports = ("User", User)
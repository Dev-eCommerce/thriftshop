var Orders = require('../models/Order');
var Users = require('../models/User');
var Products = require('../models/Product');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    // Create New Order
    create: function(req, res){
        console.log(req.body);
        //stripe charge here
        var stripeToken = req.body.stripeToken.id;
            stripe.charges.create({
                    amount: req.body.orderTotal * 100,
                    currency: "usd",
                    source: stripeToken,
                    description: "Purchase at DerelicteClothing.com"
            }, function(err, charge){
                    if (err){
                        console.log(err) 
                        
                   } else {
                        console.log(charge)
                        var productsOrdered = [];
                        var productKey = {};
                        req.body.productsOrdered.forEach(function(product){
                            productsOrdered.push(product._id);
                            if(!productKey[product._id]){
                                productKey[product._id] = 1;
                            }else {
                                productKey[product._id]++
                            }
                        }) 
                        console.log(productKey);
                        for (var prop in productKey){  
                            console.log(prop); 
                            Products.findById(prop, function(err, response){
                                if (err) {
                                    res.status(500).json(err)
                                }
                                else {
                                    console.log(response.stockTotal)
                                    response.stockTotal = response.stockTotal - productKey[prop];
                                    console.log(response.stockTotal)
                                    response.save();
                                }
                        
                            })
                        }
                        if(productsOrdered.length == req.body.productsOrdered.length) {
                            req.body.productsOrdered = productsOrdered;
                            console.log(req.body);
                            Orders.create(req.body, function(err, order){
                                if(err){
                                    return res.status(500).json(err)
                                } else {
                                    if (req.body.userId == null || req.body.userId == undefined){
                                        req.session.cart = [];
                                        return res.json(order)
                                    }
                                    else {
                                        Users.findById(req.body.userId, function(err, user){
                                            user.orders.push(order._id);
                                            user.save();
                                            console.log('success');
                                            req.session.cart = [];
                                            return res.json(order)
                                
                                        })
                                    }
                                    
                                }    
                            });
                        }
                    }
                })
    },
    findAll: function(req, res){
        Orders.find().populate({
            path: 'productsOrdered',
            select: 'name weight category options image'
        }).exec(function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get all orders", result)
                res.json(result)
            }
        });    
    },
    findOne: function(req, res){
        Orders.findById(req.params.id).populate({
            path: 'products',
        }).exec(function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get Current order's products", result)
                res.json(result)
            }
        });    
    },
    update: function(req, res){
        Orders.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, result){
            if(err){
                return res.status(500).json(err);
            } else {
            console.log(result);
            result.save();
            return res.status(200).json(result);
        }
        });
    },

    delete: function(req, res){
       Orders.findByIdAndRemove(req.params.id, function(err, result){
          if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
    },
    checkout: function(req, res){
        console.log(req.body, "stripe")
        var stripeToken = req.body.stripeToken;
            stripe.charges.create({
                    amount: 2000,
                    currency: "usd",
                    card: stripeToken,
                    description: "Charge for user1@example.com"
            }, function(err, charge){
                    if (err){
                        console.log(err) 
                        
                   } else {
                        console.log(charge)
                        
                   }
            });
       
         
    }
}; 
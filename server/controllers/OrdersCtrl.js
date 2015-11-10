var Orders = require('../models/Order')
var Users = require('../models/User')


module.exports = {
    // Create New Order
    create: function(req, res){
        Orders.create(req.body, function(err, order){
            if(err){
                return res.status(500).json(err)
            } else {
                Users.findById(req.body.userId, function(err, user){
                    user.orders.push(order._id);
                    Users.save();
                    return res.json(order)
            
                })
            }    
        });
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
    checkout: function(req, res){
        Orders.findByIdAndUpdate(req.body.id, {$set: req.body}, {new: true}, function(err, result){
            if(err) return res.status(500).json(err);
            return res.status(200).json(result);
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
    }
}; 
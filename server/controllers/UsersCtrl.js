
 var User = require('../models/User')

module.exports = {
    // Create New User
    create: function(req, res){
        User.create(req.body, function(err, user){
            if(err){
                return res.status(500).json(err)
            } else {
                return res.json(user)
            }
        });
    },
    findAll: function(req, res){
        User.findById({}, function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get all users", result)
                res.json(result)
            }
        })    
    },
    findOne: function(req, res){
        User.findById(req.params.id, function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get Current User", result)
                res.json(result)
            }
        })    
    },
        update: function(req, res){
        User.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, result){
            if(err) return res.status(500).json(err);
            return res.status(200).json(result);
        });
    },
    delete: function(req, res){
       User.findByIdAndRemove(req.params.id, function(err, result){
          if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
    }
}; 
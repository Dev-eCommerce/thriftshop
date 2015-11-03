var Users = require('../models/User')

module.exports = {
    // Create New User
    create: function(req, res){
        Users.create(req.body, function(err, user){
            if(err){
                return res.status(500).json(err)
            } else {
                user.password = null;
                console.log(user._id);
                return res.json(user)
            }
        });
    },
    me: function(req, res){
		if(!req.user){
			return res.send("current user not defined");
		} else {
			req.user.password = null;
			return res.json(req.user);
		}
	},
    findAll: function(req, res){
        Users.findById({}, function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get all users", result)
                res.json(result)
            }
        })    
    },
    findOne: function(req, res){
        Users.findById(req.params.id).populate({
            path: 'orders',
        }).exec(function(err, result){
            if(err){
                res.send(err)
            } else {
                console.log("Get Current User's orders", result)
                res.json(result)
            }
        });    
    },
    update: function(req, res){
        Users.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, result){
            if(err) return res.status(500).json(err);
            return res.status(200).json(result);
        });
    },
    delete: function(req, res){
       Users.findByIdAndRemove(req.params.id, function(err, result){
          if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
    }
}; 
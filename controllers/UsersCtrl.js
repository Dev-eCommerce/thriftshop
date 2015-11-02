

module.exports = {
	create: function(req, res){
		var user = {
	    	name: req.body.name,
	    	location: req.body.location
	    };

		connection.query('INSERT INTO Users set ?', user, function(err, result){
	    	if(err){
	        	console.log(err);
	        	return
	    	}
	    	console.log(result, "posted");
		})
	},
	findAll: function(req, res){

		connection.query('SELECT * FROM Users', function(err, result){
    		if(err){
        		console.log(err);
        		return
    		}
    			console.log(result);
			})
	}

};
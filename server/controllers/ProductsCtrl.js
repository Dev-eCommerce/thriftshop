var Products = require('../models/Product')
var AWS = require('../services/AmazonService');

module.exports = {
    create: function(req, res) {
            // var image = req.body.image;

            // console.log(image);

            // console.log(req.body);


            // var buf = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            // var fileObj = {
            //     name: image.name,
            //     body: buf,
            //     type: image.type
            // };

            // AWS.uploadToS3(fileObj, function(err, data){
            //     if (err) {
            //         console.log(err, "image not uploaded")
            //         res.status(500).send(err)
            //     } else {
            //         req.body.image = data.Location;

            //         console.log(req.body);
                    Products.create(req.body, function(err, result) {
                        if (err) {
                         	res.send(err, "user not created");
                        } else {
                          	res.json(result);
                        }
                    });
                    if (!req.body.image){
                        console.log(req.body);
                        Products.create(req.body, function(err, result) {
                            if (err) {
                             	res.send(err, "user not created");
                            } else {
                              	res.json(result);
                            }
                        });
                    }  
            //     }
            // })
    },
    update: function(req, res) {
            Products.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    findAll: function(req, res) {
        Products.find({}, function(err, result){
          if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
    findOne: function(req, res) {
        Products.findById(req.params.id, function(err, result){
          if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
    delete: function(req, res) {
        Products.findById(req.params.id, function(err, result){
          if (err) {
                    res.status(500).send(err);
                } else {
                    // var imageToDelete = result.data.image;
                    // //need to splice the string here.
                    // AWS.deleteFromS3(imageToDelete, function(err, result){
                    //     if (err) {
                    //         res.send("failed to delete from s3")
                    //     } else {
                            Products.findByIdAndRemove(req.params.id, function(err, result){
                                if (err) {
                                    res.send("failed to delete from User")
                                } else {
                                    res.json(result, "Success");
                                }
                            })
                    //     }
                    // })
                }
            });
    }
};
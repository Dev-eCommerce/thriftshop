var Products = require('../models/Product')
var AWS = require('../services/AmazonService');

module.exports = {
    create: function(req, res) {
            if (!req.body.image){
                console.log("213");
                Products.create(req.body, function(err, result) {
                                if (err) {
                                    res.send(err, "Product not created");
                                } else {
                                    res.json(result);
                                }
                            });
            } else {
                console.log("aws s3");
                var images = req.body.image;

                var productImages = [];
                images.forEach(function(image){

                    var buf = new Buffer(image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

                    var fileObj = {
                        name: image.file.name,
                        body: buf,
                        type: image.file.type
                    };

                    AWS.uploadToS3(fileObj, function(err, data){
                        if (err) {
                            console.log(err, "image not uploaded")
                            res.status(500).send(err)
                        } else {
                            productImages.push(data.Location)
                            if (productImages.length == images.length){
                                req.body.image = productImages;
                                Products.create(req.body, function(err, result) {
                                    if (err) {
                                     	res.send(err, "Product not created");
                                    } else {
                                      	res.json(result);
                                    }
                                });
                            }
                        }
                    })
                })
            }
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
                    console.log(result.data);
                    var imagesArr = result.data.image;
                    var imagesToDelete = [];
                    for(var i = 0; i < imagesArr.length; i++){
                        imagesToDelete.push(imagesArr[i].substr(45));
                    }
                    if (imagesToDelete.length == imagesArr.length) {
                        AWS.deleteFromS3(imagesToDelete, function(err, result){
                            if (err) {
                                res.send(err, "failed to delete from s3");
                            } else {
                                Products.findByIdAndRemove(req.params.id, function(err, result){
                                    if (err) {
                                        res.send("failed to delete from User")
                                    } else {
                                        res.json(result, "Success");
                                    }
                                })
                            }
                        })
                    }
                }
            });
    }
};
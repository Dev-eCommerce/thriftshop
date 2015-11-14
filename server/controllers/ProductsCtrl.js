var Products = require('../models/Product')
var AWS = require('../services/AmazonService');

 var getRandomIndexNumber = function() {
        return Math.floor(Math.random() * (10000 - 1000)) + 1000;
};

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
                        name: getRandomIndexNumber() + image.file.name,
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
    update: function(req, res){
        Products.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, result){
            if(err){
                return res.status(500).json(err);
            } else {
            console.log(result);
            result.save();
            return res.status(200).json(result);
        }
        });
    },
     updateImage: function(req, res) {
            Products.findById(req.params.id, function(err, product) {
                if (err) {
                  	res.send(err);
                } else { 
                    if(product.image.length < 1){
                        console.log("no image to delete just upload");
                                var images = req.body.image;

                                var productImages = [];
                                images.forEach(function(image){

                                    var buf = new Buffer(image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

                                    var fileObj = {
                                        name: getRandomIndexNumber() + image.file.name,
                                        body: buf,
                                        type: image.file.type
                                    };
                                    AWS.uploadToS3(fileObj, function(err, data){
                                        if (err) {
                                            console.log(err, "image(s) not uploaded")
                                            res.status(500).send(err)
                                        } else {
                                            productImages.push(data.Location)
                                            if (productImages.length == images.length){
                                                req.body.image = productImages;
                                                console.log(req.body);
                                                Products.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, result) {
                                                    if (err) {
                                                        res.send(err, "Product not updated");
                                                    } else {
                                                        res.json(result, "success");
                                                    }
                                                });
                                            }
                                        }
                                    })
                                })
                    } else if (product.image.length > 0){
                        var imagesArr = product.image;
                        var imagesToDelete = [];
                        for(var i = 0; i < imagesArr.length; i++){
                            imagesToDelete.push({Key: imagesArr[i].substr(45)});
                        }
                        if (imagesToDelete.length == imagesArr.length) {
                            console.log(imagesToDelete);
                            AWS.deleteFromS3(imagesToDelete, function(err, result){
                                if (err) {
                                    res.status(err).send("failed to delete from s3");
                                } else {
                                    console.log("aws s3");
                                    var images = req.body.image;

                                    var productImages = [];
                                    images.forEach(function(image){

                                        var buf = new Buffer(image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

                                        var fileObj = {
                                            name: getRandomIndexNumber() + image.file.name,
                                            body: buf,
                                            type: image.file.type
                                        };
                                        AWS.uploadToS3(fileObj, function(err, data){
                                            if (err) {
                                                console.log(err, "image(s) not uploaded")
                                                res.status(500).send(err)
                                            } else {
                                                productImages.push(data.Location)
                                                if (productImages.length == images.length){
                                                    req.body.image = productImages;
                                                    console.log(req.body);
                                                    Products.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, result) {
                                                        if (err) {
                                                            res.send(err, "Product not updated");
                                                        } else {
                                                            res.json(result);
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    })
     
                                }
                            })
                        }
                    }
                }
            })
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
    findById: function(req, res) {
        Products.findById(req.params.id, function(err, result){
          if (err) {
                    res.send(err);
                } else {
                   res.json(result);
                }
            });
    },
    
    findOne: function(req, res) {
        console.log(req.params.category)
        Products.find({})
        .where("category").equals(req.params.category) 
        .exec(function(err, result){
          if (err) {
                    res.send(err);
                } else {
                   res.json(result);
                }
            });
    },
    
     findNewArrival: function(req, res) {
        console.log(req.params.newArrival)
        Products.find({})
        .where("newArrival").equals(true) 
        .exec(function(err, result){
          if (err) {
                    res.send(err);
                } else {
                   res.json(result);
                }
            });
    },
    
    findSale: function(req, res) {
        console.log(req.params.newArrival)
        Products.find({})
        .where("sale").equals(true) 
        .exec(function(err, result){
          if (err) {
                    res.send(err);
                } else {
                   res.json(result);
                }
            });
    },
    
    delete: function(req, res) {
        Products.findById(req.params.id, function(err, product){
            if (err) {
                    res.status(500).send(err);
            } else {
                if (product.image.length < 1){
                    Products.findByIdAndRemove(product._id, function(err, result){
                                if (err) {
                                    res.send("failed to delete from User")
                                } else {
                                    res.json(result, "Success");
                                }
                            })
                } else {
                    var imagesArr = product.image;
                    var imagesToDelete = [];
                    for(var i = 0; i < imagesArr.length; i++){
                        imagesToDelete.push({Key: imagesArr[i].substr(45)});
                    }
                    if (imagesToDelete.length == imagesArr.length) {
                        AWS.deleteFromS3(imagesToDelete, function(err, result){
                            if (err) {
                                res.status(err).send("failed to delete from s3");
                            } else {
                                Products.findByIdAndRemove(product._id, function(err, result){
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
            }
        });
    }
};

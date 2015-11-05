var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    weight: {type: Number},
    descriptionCart: {type: String, maxlength: 50},
    descriptionShort: {type: String, maxlength: 140},
    descriptionLong: {type: String},
    image: {type: String},
    category: {type: String},
    stockTotal: {type: Number},
    options: {
        optionName: {type: String},
        optionValues:[{
            name: {type: String},
            count: {type: Number}
        }]
    }
    
});



module.exports = mongoose.model('Product', Product); 
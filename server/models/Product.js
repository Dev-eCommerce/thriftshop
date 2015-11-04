var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    weight: {type: Number},
    decsriptionCart: {type: String, maxlength: 50},
    decsriptionShort: {type: String, maxlength: 140},
    decsriptionLong: {type: String},
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
    // newArrival: {type: Boolean, default: false},
    // sale: {type: Boolean, default: false},
    // date: {type: Date, default: Date.now},
    // gender: {type: String}
    
});



module.exports = mongoose.model('Product', Product); 
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
    totalBySizes: {
        extraSmall: {type: Number},
        small: {type: Number},
        medium: {type: Number},
        large: {type: Number},
        extraLarge: {type: Number},
        extraExtraLarge: {type: Number},
    }

    
});



module.exports = mongoose.model('Product', Product); 
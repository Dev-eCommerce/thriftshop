var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    userId: {type: String},
    orderTotal: {type: Number},
    orderShipTo: {type: String},
    orderShipAddress: {type: String},
    shippingCost: {type: Number},
    orderTax: {type: Number},
    orderDate: {type: Date, default: Date.now},
    orderStatus: {
        type: String, 
        enum: ['Cart', 'Submitted', 'Fulfilled', 'Shipped']
    },
    shipDate: {type: Date},
    trackingNumber: {type: String},
    productsOrdered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

    
});



module.exports = mongoose.model('Order', Order); 
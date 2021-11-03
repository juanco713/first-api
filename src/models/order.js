const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    open: {
        type: Boolean,
        default: true
    },
    products: [
        {
            type: Schema.ObjectId,
            ref: "Product"
        }
    ],
    paymethod: {
        type: Schema.ObjectId,
        ref: "Pago"
    }
});


module.exports = mongoose.model('Order', orderSchema);

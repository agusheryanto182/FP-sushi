const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        products: {
            type: [mongoose.Types.ObjectId],
            ref: 'Product',
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
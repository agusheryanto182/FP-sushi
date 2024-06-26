const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

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
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        productDetails: [productDetailSchema],
        totalPrice: {
            type: Number,
            required: true
        },
        statusPayment: {
            type: Boolean,
            default: false
        },
        statusDelivery: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);
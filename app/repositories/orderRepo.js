const Order = require('../api/v1/orders/model');
const customError = require('../errors');

const CreateOrder = async (name, address, phoneNumber, email, productDetails, totalPrice) => {
    try {
        const result = await Order.create({ name, address, phoneNumber, email, productDetails, totalPrice });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
};

module.exports = { CreateOrder };

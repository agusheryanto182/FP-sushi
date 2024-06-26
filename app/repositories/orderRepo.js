const { query } = require('express');
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

const updateStatusPayment = async (order_id, statusPayment) => {
    try {
        const result = await Order.updateOne({ _id: order_id }, { statusPayment });
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
}

const GetAllOrders = async (query) => {
    try {
        const result = await Order.find(query);
        return result;
    } catch (err) {
        throw new customError.InternalServerError(err);
    }
}

const updateOrderCMS = async (id, name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery) => {
    try {
        const result = await Order.findByIdAndUpdate(id, { name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery }, { new: true });
        if (!result) {
            throw new customError.NotFoundError('order not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
}

const deleteOrderCMS = async (id) => {
    try {
        const result = await Order.findByIdAndDelete(id);
        if (!result) {
            throw new customError.NotFoundError('order not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
}

const GetOrderById = async (id) => {
    try {
        const result = await Order.findById(id);
        if (!result) {
            throw new customError.NotFoundError('order not found');
        }
        return result;
    } catch (err) {
        if (err instanceof customError.NotFoundError) {
            throw err;
        }
        throw new customError.InternalServerError(err);
    }
};

module.exports = {
    CreateOrder,
    updateStatusPayment,
    GetAllOrders,
    updateOrderCMS,
    deleteOrderCMS,
    GetOrderById
};

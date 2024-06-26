const customError = require('../../../errors');
const orderService = require('../../../services/mongoose/orderService');
const { body, validationResult } = require('express-validator');

const CreateOrder = async (req, res, next) => {
    const { name, address, phoneNumber, email, productDetails, totalPrice } = req.body;

    // validation
    await body('name').isString().withMessage('name must be a string').run(req);
    await body('address').isString().withMessage('address must be a string').run(req);
    await body('phoneNumber').isString().withMessage('phoneNumber must be a string').run(req);
    await body('email').isEmail().withMessage('invalid email').run(req);
    await body('productDetails').isArray().withMessage('productDetails must be an array').run(req);
    await body('totalPrice').isNumeric().withMessage('totalPrice must be a number').run(req);
    const errors = validationResult(req);

    try {
        if (!name || !address || !phoneNumber || !productDetails || !totalPrice) {
            throw new customError.BadRequestError('all fields are required');
        }
        if (!errors.isEmpty()) {
            throw new customError.BadRequestError(errors.array()[0].msg);
        }
        const result = await orderService.createOrder(name, address, phoneNumber, email, productDetails, totalPrice);
        res.status(201).json({ token: result });
    } catch (err) {
        next(err);
    }
}

const MidtransWebHook = async (req, res, next) => {
    const { transaction_status, order_id } = req.body;

    try {
        if (!transaction_status || !order_id) {
            throw new customError.BadRequestError('all fields are required');
        }
        const result = await orderService.midtransWebHook(transaction_status, order_id);
        res.status(201).json({ token: result });
    } catch (err) {
        next(err);
    }
}

const getAllOrders = async (req, res, next) => {
    const { name, statusPayment, statusDelivery } = req.query;
    try {
        const result = await orderService.getAllOrders(name, statusPayment, statusDelivery);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
}

const updateOrderCMS = async (req, res, next) => {
    const { name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery } = req.body;
    const { id } = req.params;
    try {
        const result = await orderService.updateOrderCMS(id, name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
}

const deleteOrderCMS = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await orderService.deleteOrderCMS(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    CreateOrder,
    MidtransWebHook,
    getAllOrders,
    updateOrderCMS,
    deleteOrderCMS
}
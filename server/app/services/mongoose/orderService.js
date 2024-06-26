const config = require('../../config');
const midtransClient = require('midtrans-client');
const orderRepo = require('../../repositories/orderRepo');
const emailService = require('../../services/mail/emailService');

const createOrder = async (name, address, phoneNumber, email, productDetails, totalPrice) => {
    const result = await orderRepo.CreateOrder(name, address, phoneNumber, email, productDetails, totalPrice);

    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: config.serverKey,
        clientKey: config.clientKey
    });

    let parameter = {
        transaction_details: {
            order_id: result._id,
            gross_amount: totalPrice
        },
        customer_details: {
            email: email
        }
    };
    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    return token;
}

const midtransWebHook = async (transaction_status, order_id) => {
    if (transaction_status === 'settlement') {
        const statusPayment = true;
        const result = await orderRepo.updateStatusPayment(order_id, statusPayment);
        const data = await orderRepo.GetOrderById(order_id);

        // send email
        const resultEmail = await emailService.sendEmailTemplate(data.email, data);

        console.log('resultEmail : ', resultEmail);
        return result;
    }
}

const getAllOrders = async (name, statusPayment, statusDelivery) => {
    const query = {};
    if (name) {
        query.name = { $regex: new RegExp('^' + name, 'i') };
    }
    if (statusPayment) {
        query.statusPayment = { $gte: statusPayment };
    }
    if (statusDelivery) {
        query.statusDelivery = { $gte: statusDelivery };
    }


    const result = await orderRepo.GetAllOrders(query);
    return result.sort((a, b) => b.createdAt - a.createdAt);
}

const updateOrderCMS = async (id, name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery) => {
    const result = await orderRepo.updateOrderCMS(id, name, address, phoneNumber, email, totalPrice, statusPayment, statusDelivery);
    return result;
}

const deleteOrderCMS = async (id) => {
    const result = await orderRepo.deleteOrderCMS(id);
    return result;
}

module.exports = {
    createOrder,
    midtransWebHook,
    getAllOrders,
    updateOrderCMS,
    deleteOrderCMS
}
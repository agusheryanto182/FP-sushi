const config = require('../../config');
const midtransClient = require('midtrans-client');
const orderRepo = require('../../repositories/orderRepo');

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
        }
    };
    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    return token;
}

module.exports = { createOrder }
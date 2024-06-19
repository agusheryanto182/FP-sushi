const express = require('express');
const router = express.Router();
const orderCtrl = require('./controller');

router.post('/checkout', orderCtrl.CreateOrder);
router.post('/midtrans-webhook', orderCtrl.MidtransWebHook);

module.exports = router
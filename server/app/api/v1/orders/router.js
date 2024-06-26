const express = require('express');
const router = express.Router();
const orderCtrl = require('./controller');
const auth = require('../../../middlewares/auth');

router.post('/checkout', orderCtrl.CreateOrder);
router.post('/midtrans-webhook', orderCtrl.MidtransWebHook);
router.get('/admin/order', auth.authenticateUser, auth.authorizeRoles('admin'), orderCtrl.getAllOrders);
router.put('/admin/order/:id', auth.authenticateUser, auth.authorizeRoles('admin'), orderCtrl.updateOrderCMS);
router.delete('/admin/order/:id', auth.authenticateUser, auth.authorizeRoles('admin'), orderCtrl.deleteOrderCMS);

module.exports = router
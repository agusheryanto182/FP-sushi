const express = require('express');
const router = express.Router();
const orderCtrl = require('./controller');

router.post('/checkout', orderCtrl.CreateOrder);
module.exports = router
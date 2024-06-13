const express = require('express');
const router = express.Router();
const productCtrl = require('./controller')
const auth = require('../../../middlewares/auth');

router.post('/admin/product/create', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.createProductCms);
router.get('/admin/product', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.getAllProductsCms);
router.delete('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.deleteProductCms);
router.put('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.updateProductCms);

module.exports = router

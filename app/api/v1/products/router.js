const express = require('express');
const router = express.Router();
const productCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

router.post('/admin/product/create', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('images'), productCtrl.createProductCms);
router.get('/product', productCtrl.getAllProductsCms);
router.delete('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.deleteProductCms);
router.put('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('images'), productCtrl.updateProductCms);

module.exports = router

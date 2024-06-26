const express = require('express');
const router = express.Router();
const productCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

const multerHandler = (req, res, next) => {
    if (req.headers['content-type'].includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return upload.none()(req, res, next);
};

router.post('/admin/product/create', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('image'), productCtrl.createProductCms);
router.get('/product', productCtrl.getAllProductsCms);
router.delete('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.deleteProductCms);
router.put('/admin/product/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, productCtrl.updateProductCms);

module.exports = router
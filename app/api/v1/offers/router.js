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

router.post('/admin/offer', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('image'), productCtrl.createOfferCMS);
router.get('/offer', productCtrl.getAllOffers);
router.delete('/admin/offer/:id', auth.authenticateUser, auth.authorizeRoles('admin'), productCtrl.deleteOfferCMS);
router.put('/admin/offer/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, productCtrl.updateOfferCMS);

module.exports = router
const express = require('express');
const router = express.Router();
const ourServiceCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

const multerHandler = (req, res, next) => {
    if (req.headers['content-type'].includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return upload.none()(req, res, next);
};


router.post('/admin/our-services', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('image'), ourServiceCtrl.CreateOurServiceCMS);
router.get('/our-services', ourServiceCtrl.GetAllOurService);
router.delete('/admin/our-services/:id', auth.authenticateUser, auth.authorizeRoles('admin'), ourServiceCtrl.DeleteOurServiceCMS);
router.put('/admin/our-services/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, ourServiceCtrl.UpdateOurServiceCMS);

module.exports = router
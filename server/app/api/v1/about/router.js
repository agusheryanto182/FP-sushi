const express = require('express');
const router = express.Router();
const aboutCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

const multerHandler = (req, res, next) => {
    if (req.headers['content-type'].includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return upload.none()(req, res, next);
};

router.get('/about', aboutCtrl.GetAbout);
router.put('/admin/about/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, aboutCtrl.UpdateAboutCMS);
router.post('/admin/about', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, aboutCtrl.CreateAboutCMS);
router.delete('/admin/about/:id', auth.authenticateUser, auth.authorizeRoles('admin'), aboutCtrl.DeleteAboutCMS);

module.exports = router
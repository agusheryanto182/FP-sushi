const express = require('express');
const router = express.Router();
const heroCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

const multerHandler = (req, res, next) => {
    if (req.headers['content-type'].includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return upload.none()(req, res, next);
};

router.post('/admin/hero', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('image'), heroCtrl.createHeroCMS);
router.get('/hero', heroCtrl.getHero);
router.delete('/admin/hero/:id', auth.authenticateUser, auth.authorizeRoles('admin'), heroCtrl.deleteHeroCMS);
router.put('/admin/hero/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, heroCtrl.updateHeroCMS);

module.exports = router
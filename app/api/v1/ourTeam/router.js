const express = require('express');
const router = express.Router();
const ourTeamCtrl = require('./controller')
const auth = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multers');

const multerHandler = (req, res, next) => {
    if (req.headers['content-type'].includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return upload.none()(req, res, next);
};

router.get('/our-team', ourTeamCtrl.getOurTeam);
router.put('/admin/our-team/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, ourTeamCtrl.updateOurTeamCMS);
router.post('/admin/our-team', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, ourTeamCtrl.createOurTeamCMS);
router.delete('/admin/our-team/:id', auth.authenticateUser, auth.authorizeRoles('admin'), ourTeamCtrl.deleteOurTeamCMS);
router.get('/task', ourTeamCtrl.getTaskTeam);
router.post('/admin/task', auth.authenticateUser, auth.authorizeRoles('admin'), upload.single('image'), ourTeamCtrl.createTaskTeamCMS);
router.put('/admin/task/:id', auth.authenticateUser, auth.authorizeRoles('admin'), multerHandler, ourTeamCtrl.updateTaskTeamCMS);
router.delete('/admin/task/:id', auth.authenticateUser, auth.authorizeRoles('admin'), ourTeamCtrl.deleteTaskTeamCMS);

module.exports = router
const express = require('express');
const router = express.Router();
const userCtrl = require('./controller')

const auth = require('../../../middlewares/auth');

router.post('/admin/create', auth.authenticateUser, auth.authorizeRoles('admin'), userCtrl.createAdminCms);
router.get('/admin', auth.authenticateUser, auth.authorizeRoles('admin'), userCtrl.GetAdminCMS);
router.delete('/admin/:id', auth.authenticateUser, auth.authorizeRoles('admin'), userCtrl.DeleteAdminCMS);
router.put('/admin/:id', auth.authenticateUser, auth.authorizeRoles('admin'), userCtrl.UpdateAdminCMS);

module.exports = router;
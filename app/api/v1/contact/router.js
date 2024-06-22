const express = require('express');
const router = express.Router();
const contactCtrl = require('./controller')
const auth = require('../../../middlewares/auth');

router.get('/contact', contactCtrl.getContact);
router.put('/admin/contact/:id', auth.authenticateUser, auth.authorizeRoles('admin'), contactCtrl.updateContact);
router.post('/admin/contact', auth.authenticateUser, auth.authorizeRoles('admin'), contactCtrl.createContact);

module.exports = router
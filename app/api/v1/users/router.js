const express = require('express');
const router = express.Router();
const {
    createAdminCms
} = require('./controller');

const { authenticateUser } = require('../../../middlewares/auth');

router.post('/admin/create', authenticateUser, createAdminCms);

module.exports = router;
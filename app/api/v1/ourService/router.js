const express = require('express');
const router = express.Router();
const ourServiceCtrl = require('./controller');
const upload = require('../../../middlewares/multers');

router.get('/ourService', ourServiceCtrl.getOurService);
router.post('/ourService', upload.single('image'), ourServiceCtrl.createOurService);
router.put('/ourService/:id', ourServiceCtrl.updateOurService);
router.delete('/ourService/:id', ourServiceCtrl.deleteOurService);

module.exports = router
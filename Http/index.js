const express = require('express');
const router = express.Router();

router.post('/login', require('./Controllers/LoginController'));
router.get('/giphy', require('./Controllers/GetApiController'));
router.get('/healt_check', require('./Controllers/HealtCheckController'));

module.exports = router;

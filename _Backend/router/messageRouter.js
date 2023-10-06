const express = require('express');
const auth = require('../middleware/auth');
const messageController = require('../controller/messageController');
const router = express.Router();

router
    .post('/message/addmsg', messageController.addMessage)
    .post('/message/getmsg', messageController.getAllMessage)
exports.router = router;
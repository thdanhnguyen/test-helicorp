const express = require('express');
const router = express.Router();

const { validateChat } = require('../middlewares/validateChat');
const { handleChat } = require('../controllers/chatController');

router.post('/chat', validateChat, handleChat);
module.exports = router;
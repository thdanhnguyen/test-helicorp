const express = require('express');
const router = express.Router();
const { validateNewsletter } = require('../middlewares/validateNewsletter');
const { subscribe } = require('../controllers/newsletterController');

router.post('/newsletter', validateNewsletter, subscribe);

module.exports = router;
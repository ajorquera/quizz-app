const express   = require('express')
const notifications = require('./controllers/notifications.controller');

const router = express.Router();

router.post('/notifications', notifications);

module.exports = router;
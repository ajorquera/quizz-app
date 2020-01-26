const express   = require('express')
const notifications = require('./controllers/notifications.controller');
const invitation = require('./controllers/invitation.controller');
const {firebaseAuth} = require('./middleware');

const router = express.Router();

router.post('/notifications', notifications);
router.post('/invitation', firebaseAuth, invitation);

module.exports = router;
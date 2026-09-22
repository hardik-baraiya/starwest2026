const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkout', requireAuth, checkoutController.checkout);

module.exports = router;

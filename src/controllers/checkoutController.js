const checkoutService = require('../services/checkoutService');

function checkout(req, res, next) {
  try {
    const { items, paymentMethod } = req.body;
    const order = checkoutService.checkout(items, paymentMethod);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { checkout };

const productModel = require('../models/productModel');

const CASH_DISCOUNT_RATE = 0.1;
const VALID_PAYMENT_METHODS = ['cash', 'credit card'];

function checkout(items, paymentMethod) {
  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error('Payment method must be "cash" or "credit card"');
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('Items must be a non-empty array');
    error.statusCode = 400;
    throw error;
  }

  const orderItems = items.map(({ productId, quantity }) => {
    const product = productModel.findById(productId);
    if (!product) {
      const error = new Error(`Product with id ${productId} not found`);
      error.statusCode = 404;
      throw error;
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      const error = new Error(`Invalid quantity for product ${productId}`);
      error.statusCode = 400;
      throw error;
    }
    const subtotal = product.price * quantity;
    return { productId: product.id, name: product.name, unitPrice: product.price, quantity, subtotal };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = paymentMethod === 'cash' ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  return {
    items: orderItems,
    paymentMethod,
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

module.exports = { checkout };

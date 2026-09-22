// In-memory product store, seeded with 3 products.
const products = [
  { id: 1, name: 'Wireless Mouse', price: 25.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99 },
  { id: 3, name: 'USB-C Hub', price: 39.5 },
];

function findById(id) {
  return products.find((p) => p.id === id);
}

module.exports = { products, findById };

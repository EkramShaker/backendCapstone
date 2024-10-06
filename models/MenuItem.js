const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['coffee', 'beverage', 'juice', 'dessert'], required: true },
  price: { type: Number, required: true },
  image: { type: String }, // You can add image URLs later
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem;

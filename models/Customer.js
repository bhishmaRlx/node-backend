const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String},
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);

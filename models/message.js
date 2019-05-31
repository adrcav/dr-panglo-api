const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, default: '' },
  sender: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);

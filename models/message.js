const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, default: '' },
  sender: { type: Boolean, default: true },
  increment: { type: Number },
}, {
  timestamps: true
});

messageSchema.plugin(AutoIncrement, { inc_field: 'increment' });

module.exports = mongoose.model('Message', messageSchema);

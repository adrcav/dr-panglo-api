const Message = require('../models/message');

module.exports = {
  async addMessage(data) {
    const message = new Message(data);
    return message.save();
  },

  async getAllMessages() {
    const messages = await Message.find({}).sort({ increment: 'desc' });
    return messages;
  },

  async deleteAllMessages() {
    const response = await Message.deleteMany({});
    return response;
  }
};

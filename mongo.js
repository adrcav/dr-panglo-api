const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  mongoose.connection.on('error', () => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit(0);
  });
  mongoose.connection.once('open', () => {
    console.log("Successfully connected to the database");
  });
}

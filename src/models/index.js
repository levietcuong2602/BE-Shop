const mongoose = require('mongoose');

const { MONGO_URI } = require('../configs');
const { logger } = require('../utils/logger');

mongoose.connect(MONGO_URI, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error.', MONGO_URI);
  logger.error(err.stack);
  process.exit();
});

mongoose.connection.once('open', () => {
  logger.info(`Connected to MongoDB: ${MONGO_URI}`);
});

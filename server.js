const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('DB connection successful!');
  }
});

const app = require('./app');

if (!process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3002;

  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}

module.exports = app;

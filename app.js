const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.all('*', (req, res, next) => {
  next();
});

module.exports = app;

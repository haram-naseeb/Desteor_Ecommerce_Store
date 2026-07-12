/**
 * app.js
 *
 * Builds and configures the Express application: middleware, routes,
 * and error handlers. Does NOT start the server (see server.js).
 * Keeping this split allows the app to be imported and tested in
 * isolation later without binding to a real port.
 */

const express = require('express');
const cors = require('cors');

const env = require('./config/env');
const requestLogger = require('./middlewares/requestLogger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://desteor-ecommerce-store.vercel.app',
];

// --- Core middleware ---
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests from Postman, curl, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// --- Routes ---
app.use('/api', routes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;
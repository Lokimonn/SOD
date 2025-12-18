'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { init } = require("./services/baseDatos");

const app = express();
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/consumo';

const consumoRoutes = require('./routes/consumoRoutes');
const acquireController = require('./controllers/acquireController');

// Endpoints
app.use('/api/consumo', consumoRoutes);
app.get('/health', acquireController.getHealth);
app.post('/data', acquireController.postData);

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  await init(MONGO_URI);
  console.log(`Acquire corriendo en http://localhost:${PORT}`);
});



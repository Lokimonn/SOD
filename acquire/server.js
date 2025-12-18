'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Usa la base de datos 'consumo' en minúscula
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/consumo';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));


const consumoRoutes = require('./routes/consumoRoutes');
const acquireController = require('./controllers/acquireController');

// Endpoints
app.use('/api/consumo', consumoRoutes);
app.get('/health', acquireController.getHealth);
app.post('/data', acquireController.postData);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Acquire corriendo en http://localhost:${PORT}`);
});



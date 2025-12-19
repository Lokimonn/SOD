'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { init } = require("./services/baseDatos");

const app = express();
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/consumo';

const acquireRoutes = require('./routes/acquireRoutes');
const acquireController = require('./controllers/acquireController');

app.use("/", acquireRoutes);

const PORT = process.env.PORT_ACQUIRE || 3003;
app.listen(PORT, async () => {
  await init(MONGO_URI);
  console.log(`Acquire corriendo en http://localhost:${PORT}`);
});



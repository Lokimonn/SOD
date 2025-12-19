'use strict';

require('dotenv').config();

const PORT = process.env.PORT_ORCHESTRATOR || 3000;
const ACQUIRE_URL = process.env.ACQUIRE_URL || "http://localhost:3001";
const PREDICT_URL = process.env.PREDICT_URL || "http://localhost:3002";


const express = require('express');
const app = express();
app.use(express.json());

const orchestratorRoutes = require('./routes/orchestratorRoutes');

app.use('/', orchestratorRoutes);


app.listen(PORT, () => {
  console.log(`Orchestrator corriendo en http://localhost:${PORT}`);
});

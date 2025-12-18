'use strict';

const acquire = require("../services/acquireService");
const predict = require("../services/predictService")
require('dotenv').config();


async function getHealth(req, res) {
  res.status(200).json({ status: "ok", service: "orchestrator" });
}


async function run(req, res) {
  try {
    
    const acquireRes = await acquire();
    if (!acquireRes.features) {
      res.status(500).json({ error: "Ha habido un error con Acquire" });
    }

    const predictRes = await predict(acquireRes.features, acquireRes.acquire_id);
    if (!predictRes || predictRes.error) {
      res.status(502).json({ error: "Ha habido un error con Predict"});
    }
    res.status(200).json({
      "dataID" : acquireRes.dataID,
      "predictionID" : predictRes.predictionID,
      "prediction" : predictRes.prediction,
      "timestamp" : predictRes.timestamp

    });
  } catch (err) {
    if (err.name === "AbortError") {
      res.status(504).json({ error: "Gateway Timeout" });
    }
    if (err.code === "ECONNREFUSED") {
      res.status(502).json({ error: "Bad Gateway", details: "Service unreachable" });
    }
    console.error("Error en /run:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}

module.exports = { getHealth, run };

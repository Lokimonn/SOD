// orchestrator/routes/orchestratorRoutes.js
const express = require("express");
const router = express.Router();

// Ejemplo: ruta que pide una predicción al servicio Predict
router.post("/predict", async (req, res) => {
  try {
    const features = req.body.features;

    const response = await fetch("http://localhost:3002/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error llamando a Predict:", err);
    res.status(500).json({ error: "Error en Orchestrator al llamar a Predict" });
  }
});

// Ejemplo: ruta que pide datos al servicio Acquire
router.get("/acquire", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3003/data");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error llamando a Acquire:", err);
    res.status(500).json({ error: "Error en Orchestrator al llamar a Acquire" });
  }
});

module.exports = router;

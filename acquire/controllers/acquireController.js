'use strict';
const Consumo = require('../models/consumo'); // importa el modelo una sola vez
const {fetchKunna} = require('../services/kunnaService');
const {saveAcquisition} = require("../services/acquireService");

async function getHealth(req, res) {
  try {
    res.status(200).json({ status: "ok", service: "acquire" });
  } catch (err) {
    res.status(500).json({ error: `Internal error: ${err.message}` });
  }
}

async function postData(req, res) {
  try {
    const start = Date.now();
    const startDate = new Date();
    const target = new Date(startDate.getTime());
    if (target.getUTCHours() >= 23){
      target.setUTCDate(target.getUTCDate() + 1);
    }
    const dateEnd = new Date(Date.UTC(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate(),
      0, 0, 0
    ));
    const dateStart = new Date(dateEnd.getTime() - 24 * 3600 * 1000 * 3);

    const { columns, values } = await fetchKunna(dateStart, dateEnd);

    /*// Construir features para cada documento
    const featuresList = kunnaResponse.map(doc => [
      doc.consumo_t,
      doc["consumo_t-1"],
      doc["consumo_t-2"],
      doc.hora,
      doc.dia_semana,
      doc.mes,
      doc.dia_mes
    ]); */

    const features = [values[0][2], values[1][2], values[2][2], target.getUTCHours(), target.getUTCDay(), target.getUTCDate()];
    const saved = await saveAcquisition(features, target, columns, values);

    res.status(200).json({
      dataID: saved._id,
      features,
      columns,
      values,
      target
    });
  } catch (err) {
    console.error("Error en /data:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}

module.exports = { getHealth, postData };

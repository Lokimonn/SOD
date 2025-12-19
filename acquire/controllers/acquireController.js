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

    //console.log(target);
    const features = [values[0][2], values[1][2], values[2][2], target.getUTCHours(), target.getUTCDay(), target.getUTCMonth(), target.getUTCDate()];
    const saved = await saveAcquisition({features, dateEnd, columns, values});

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

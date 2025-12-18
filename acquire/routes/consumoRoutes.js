const express = require('express');
const router = express.Router();
const Consumo = require('../models/consumo');


router.post('/', async (req, res) => {
  try {
    const nuevo = new Consumo(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const consumo = await Consumo.findById(req.params.id);
    if (!consumo) return res.status(404).json({ mensaje: 'No existe' });
    res.json(consumo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

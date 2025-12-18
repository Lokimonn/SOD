const mongoose = require('mongoose');

const ConsumoSchema = new mongoose.Schema({
  consumo_t: Number,
  "consumo_t-1": Number,
  "consumo_t-2": Number,
  hora: Number,
  dia_semana: Number,
  mes: Number,
  dia_mes: Number
}, { collection: 'consumos' }); // 👈 nombre exacto de la colección

module.exports = mongoose.model('Consumo', ConsumoSchema);

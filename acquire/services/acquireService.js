const Acquisition = require("../models/baseDatos");

async function saveAcquisition({features, target, columns, values}){
    const coso = new Acquisition({features, target, columns, values});

    const saved = await coso.save();

    return saved;
}

module.exports = {saveAcquisition};

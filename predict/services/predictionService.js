const Prediction = require("../models/baseDatos");

async function savePrediction({features, featureCount, scalerVersion, createdAt}){
    const coso = new Prediction({features, featureCount, scalerVersion, createdAt});

    const saved = await coso.save();

    return saved;
}

module.exports = {savePrediction};
const Prediction = require("../models/baseDatos");

async function savePrediction({features, featureCount, modelVersion, createdAt}){
    const coso = new Prediction({features, featureCount, modelVersion, createdAt});

    const saved = await coso.save();

    return saved;
}

module.exports = {savePrediction};
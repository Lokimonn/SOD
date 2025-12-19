const { port } = require("../controllers/orchestratorController");

require ("dotenv").config();

const predict_URL = process.env.PREDICT_URL || 'http://localhost:3002/predict';

async function predict(features, dataID){

  const headers = {
    "Content-Type": "application/json"
  };

  const body = {
    "features": features,
    "meta": {
      "featureCount": features.length,
      "dataID": dataID,
      "source": "orchestrator"
    }
  };

  const response = await fetch(predict_URL, {
    method: "POST",
    headers: headers, 
    body: JSON.stringify(body)
  });


  return await response.json();

}

module.exports = { predict };

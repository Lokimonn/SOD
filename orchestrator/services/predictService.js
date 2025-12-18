const { port } = require("../controllers/orchestratorController");

require ("dotenv").config();

const PREDICT_URL = process.env.PREDICT_URL || 'http://localhost:3002/predict';

async function fetchPredict(){

  const headers = {
    "Content-Type": "application/json"
  };

  const body = {
    "features": features,
    "meta" : {
      "featureCount": features.length,
      "dataID" : dataID,
      "source": "orchestrator"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers, 
    body: JSON.stringify(body)
  });

  if (!response.ok){
    throw new Error(`PREDICT_BAD_STATUS:${response.status}`);
  }

  return await response.json();

}

module.exports = { fetchPredict };

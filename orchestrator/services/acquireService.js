const { port } = require("../controllers/orchestratorController");

require ("dotenv").config();

const acquireURL = process.env.ACQUIRE_URL;

async function acquire(){

    const headers = {
        "Content-Type": "application/json"
    };

    const body = {}

    const response = await fetch(acquireURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });


    return await response.json();
}

module.exports = { acquire };
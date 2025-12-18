const { port } = require("../controllers/orchestratorController");

require ("dotenv").config();

const acquireURL = process.env.ACQUIRE_URL

async function fetchAcquire(){

    const headers = {
        "Content-Type": "application/json"
    };

    const body = {    }

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok){
        throw new Error('ACQUIRE_BAD_STATUS:${response.status}');
    }

    return await response.json();
}

module.exports = { fetchAcquire };
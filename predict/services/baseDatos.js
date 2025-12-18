'use strict';

const mongoose = require("mongoose");

let connection = null;

async function init(uri){

    if(connection) return connection;

    connection = await mongoose.connect(uri);

    console.log("Base de datos conectada en", uri);
    return connection;
}

function obtain(){
    if (!connection){
        throw new Error("No se ha conectado la base de datos");
    }

    return connection;
}

module.exports = {
    init,
    obtain
};
'use strict';

const mongoose = require("mongoose");

const acquisition = new mongoose.Schema({
    features: {
        type: [Number],
        required: true
    },
    target: {
        type: Date//,
        //required: true
    },
    columns: {
        type: [String],
        required: true
    },
    values: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    }
});

module.exports = mongoose.model("acquisition", acquisition);
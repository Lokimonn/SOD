'use strict';

const mongoose = require("mongoose");

const prediction = new mongoose.Schema({
    features: {
        type: [Number],
        required: true
    },
    featureCount: {
        type: Number,
        required: true
    },
    modelVersion: {
        type: String,
        required : true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("prediction", prediction);
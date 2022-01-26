const mongoose = require("mongoose");

const measurementSchema = mongoose.Schema({
    name: String
});

const Measurement = mongoose.model("measurement", measurementSchema);
module.exports = Measurement;
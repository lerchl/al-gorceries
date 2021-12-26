const mongoose = require("mongoose");

const measurementsSchema = mongoose.Schema({
    name: String
});

const Measurements = mongoose.model("measurements", measurementsSchema);
module.exports = Measurements;
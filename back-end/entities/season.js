const mongoose = require("mongoose");

const seasonSchema = mongoose.Schema({
    name: String,
    beginDay: Number,
    beginMonth: Number,
    endDay: Number,
    endMonth: Number
});

const Season = mongoose.model("season", seasonSchema);
module.exports = Season;

const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
    name: String,
    source: String,
    sourceInformation: String,
    prepTime: Number,
    cost: Number,
    recipe: String
});

const Dish = mongoose.model("dish", dishSchema);
module.exports = Dish;
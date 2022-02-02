const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
    name: String,
    source: String,
    sourceInformation: String,
    prepTime: Number,
    cost: Number,
    recipe: String,
    dishIngridients: [{ type: mongoose.Schema.Types.ObjectId, ref: "dish_ingridient" }]
});

const Dish = mongoose.model("dish", dishSchema);
module.exports = Dish;
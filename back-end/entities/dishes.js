const mongoose = require("mongoose");

const dishesSchema = mongoose.Schema({
    name: String,
    source: String,
    sourceInformation: String,
    prepTime: Number,
    cost: Number,
    recipe: String
});

const Dishes = mongoose.model("dishes", dishesSchema);
module.exports = Dishes;
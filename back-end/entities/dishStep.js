const mongoose = require("mongoose");

const dishStepSchema = mongoose.Schema({
    content: String,
    index: Number,
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "dish" }
});

const DishStep = mongoose.model("dish_step", dishStepSchema);
module.exports = DishStep;

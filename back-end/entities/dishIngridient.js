const mongoose = require("mongoose");

const dishIngridientSchema = mongoose.Schema({
    factor: Number,
    measurement: { type: mongoose.Schema.Types.ObjectId, ref: "measurement" },
    ingridient: { type: mongoose.Schema.Types.ObjectId, ref: "ingridient" },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "dish" }
});

const DishIngridient = mongoose.model("dish_ingridient", dishIngridientSchema);
module.exports = DishIngridient;
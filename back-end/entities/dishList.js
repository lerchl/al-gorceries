const mongoose = require("mongoose");

const dishListSchema = mongoose.Schema({
    year: Number,
    week: Number,
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "dish" }],
    selectedDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "dish" }]
});

const DishList = mongoose.model("dish_list", dishListSchema);
module.exports = DishList;
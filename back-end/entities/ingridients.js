const mongoose = require("mongoose");

const ingridientsSchema = mongoose.Schema({
    name: String
});

const Ingridients = mongoose.model("ingridients", ingridientsSchema);
module.exports = Ingridients;
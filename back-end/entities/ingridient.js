const mongoose = require("mongoose");

const ingridientSchema = mongoose.Schema({
    name: String
});

const Ingridient = mongoose.model("ingridient", ingridientSchema);
module.exports = Ingridient;
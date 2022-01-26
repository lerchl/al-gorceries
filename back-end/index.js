const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Ingridient = require("./entities/ingridient");
const Dish = require("./entities/dish");
const DishIngridient = require("./entities/dishIngridient");
const Measurement = require("./entities/measurement");

// config
const app = express();
const port = 2000;
const url = "mongodb+srv://test:test@development.czo47.mongodb.net/al-gorceries?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// endpoints
app.get("/", (_req, res) => {
    res.status(200).send("Hello World!");
});

// Measurement
app.get("/measurements", (_req, res) => {
    Measurement.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
});

app.get("/measurements/:id", (req, res) => {
    Measurement.findById(req.params.id, (err, data) => handleCallback(res, err, data, 200));
})

app.post("/measurements", (req, res) => {
    const measurement = req.body;
    Measurement.create(measurement, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/measurements/:id", (req, res) => {
    const updatedMeasurement = req.body;
    Measurement.findByIdAndUpdate(req.params.id,
            updatedMeasurement,
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/measurements/:id", (req, res) => {
    Measurement.findOneAndDelete({ _id: req.params.id },
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

// Ingridients
app.get("/ingridients", (_req, res) => {
    Ingridient.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
});

app.get("/ingridients/:id", (req, res) => {
    Ingridient.findById(req.params.id, (err, data) => handleCallback(res, err, data, 200));
})

app.post("/ingridients", (req, res) => {
    const measurement = req.body;
    Ingridient.create(measurement, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/ingridients/:id", (req, res) => {
    const updatedMeasurement = req.body;
    Ingridient.findByIdAndUpdate(req.params.id,
            updatedMeasurement,
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/ingridients/:id", (req, res) => {
    Ingridient.findOneAndDelete({ _id: req.params.id },
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

// Dish
app.get("/dishes", (_req, res) => {
     Dish.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
})

app.get("/dishes/:id", (req, res) => {
    Dish.findById(req.params.id, (err, data) => handleCallback(res, err, data, 200));
})

app.post("/dishes", (req, res) => {
    const dish = req.body;
    Dish.create(dish, (err, data) => handleCallback(res, err, data, 201));
});

// Dish Ingridient
app.get("/dishIngridients/:dishId", (req, res) => {
    DishIngridient.find({ dish: req.params.dishId }, (err, data) => handleCallback(res, err, data, 200)).populate("measurement").populate("ingridient");
});

app.post("/dishIngridients", (req, res) => {
    const dishIngridient = req.body;
    DishIngridient.create(dishIngridient, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/dishIngridients/:id", (req, res) => {
    const updatedDishIngridient = req.body;
    DishIngridient.findByIdAndUpdate(req.params.id,
            updatedDishIngridient,
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/dishIngridients/:id", (req, res) => {
    DishIngridient.findOneAndDelete({ _id: req.params.id },
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

// callback
function handleCallback(res, err, data, successCode) {
    if (err) {
        res.status(500).send(err);
        console.error(err);
    } else {
        console.log("Sending:", data);
        res.status(successCode).send(data);
    }
}

// listener
app.listen(port, () => {
    console.log("Server running on port " + port);
});
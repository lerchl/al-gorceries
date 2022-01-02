const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Measurements = require("./entities/measurements");
const Ingridients = require("./entities/ingridients");

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

// Maßeinheiten
app.get("/measurements", (_req, res) => {
    Measurements.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
});

app.post("/measurements", (req, res) => {
    const measurement = req.body;
    Measurements.create(measurement, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/measurements/:id", (req, res) => {
    const updatedMeasurement = req.body;
    Measurements.findByIdAndUpdate(req.params.id,
            updatedMeasurement,
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/measurements/:id", (req, res) => {
    Measurements.findOneAndDelete({ _id: req.params.id },
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

// Zutaten
app.get("/ingridients", (_req, res) => {
    Ingridients.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
});

app.post("/ingridients", (req, res) => {
    const measurement = req.body;
    Ingridients.create(measurement, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/ingridients/:id", (req, res) => {
    const updatedMeasurement = req.body;
    Ingridients.findByIdAndUpdate(req.params.id,
            updatedMeasurement,
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/ingridients/:id", (req, res) => {
    Ingridients.findOneAndDelete({ _id: req.params.id },
            { useFindAndModify: false },
            (err, data) => handleCallback(res, err, data, 200));
});

// Schüler

// app.get("/students", (_req, res) => {
//     Students.find((err, data) => handleCallback(res, err, data, 200)).sort({ lastName: "asc" });
// });

// app.post("/students", (req, res) => {
//     const student = req.body;

//     Students.create(student, (err, data) => handleCallback(res, err, data, 201));
// });

// app.put("/students/:id", (req, res) => {
//     const updatedStudent = req.body;

//     Students.findByIdAndUpdate({ _id: req.params.id }, updatedStudent, { useFindAndModify: false }, (err, data) => handleCallback(res, err, data, 200));
// });

// app.delete("/students/:id", (req, res) => {
//     Students.findOneAndDelete({ _id: req.params.id }, { useFindAndModify: false }, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err);
//         } else {
//             Absences.deleteMany({ student: req.params.id }, (err, data) => handleCallback(res, err, data, 200));
//         }
//     });
// });

// callback
function handleCallback(res, err, data, successCode) {
    if (err) {
        res.status(500).send(err);
        console.error(err);
    } else {
        res.status(successCode).send(data);
    }
}

// listener
app.listen(port, () => {
    console.log("Server running on port " + port);
});
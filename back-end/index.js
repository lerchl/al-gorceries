const express = require("express");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const password = require("password-hash-and-salt");

const Ingridient = require("./entities/ingridient");
const Dish = require("./entities/dish");
const DishIngridient = require("./entities/dishIngridient");
const Measurement = require("./entities/measurement");
const DishList = require("./entities/dishList");
const User = require("./entities/user");
const Season = require("./entities/season");

const dotenv = require("dotenv");
const DishStep = require("./entities/dishStep");

// config
dotenv.config();

const app = express();
const port = process.env.PORT;
const url = process.env.MONGO_DB_STRING;

// middleware
const log = (req, _res, next) => {
    console.log(`${new Date().toISOString()}: ${req.method} request for ${req.url}`);
    next();
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(log);

// db config
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// endpoints
app.get("/", (_req, res) => {
    res.status(200).send("Hello World!");
});

// Authentication
app.post("/registration", (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }, (_findErr, user) => {
        if (user) {
            res.status(400).send("Ein Nutzer mit dieser E-Mail existiert bereits.");
        } else {
            if (req.body.password === req.body.passwordRepeat) {
                password(req.body.password).hash((_err, hash) => {
                    User.create({ email: email, password: hash }, (err, data) => handleCallback(res, err, data, 201));
                });
            }
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }, (_findErr, user) => {
        if (user) {
            password(req.body.password).verifyAgainst(user.password, (_verifyErr, verified) => {
                if (verified) {
                    const token = jsonwebtoken.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3h" });
                    res.cookie("jwt", token, { httpOnly: true });
                    res.status(200).send();
                } else {
                    res.status(400).send();
                }
            });
        } else {
            res.status(400).send();
        }
    });
});

app.get("/loggedIn", (req, res) => {
    jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, _decoded) => {
        if (err) {
            res.status(200).send(false);
        } else {
            res.status(200).send(true);
        }
    });
});

app.post("/logout", (_req, res) => {
    res.clearCookie("jwt");
    res.status(200).send();
});

app.use((req, res, next) => {
    jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, _decoded) => {
        if (err) {
            res.status(400).send();
        } else {
            next();
        }
    });
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
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/measurements/:id", (req, res) => {
    Measurement.findOneAndDelete({ _id: req.params.id },
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
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/ingridients/:id", (req, res) => {
    Ingridient.findOneAndDelete({ _id: req.params.id },
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

app.put("/dishes/:id", (req, res) => {
    const updatedDish = req.body;
    Dish.findByIdAndUpdate(req.params.id,
            updatedDish,
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/dishes/:id", (req, res) => {
    Dish.findOneAndDelete({ _id: req.params.id },
            (err, data) => {
                if (err) {
                    handleCallback(res, err, data, 200);
                }
            });

    DishIngridient.deleteMany({ dish: req.params.id }, (err, data) => handleCallback(res, err, data, 200));
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
            (err, data) => handleCallback(res, err, data, 200));
});

app.delete("/dishIngridients/:id", (req, res) => {
    DishIngridient.findOneAndDelete({ _id: req.params.id },
            (err, data) => handleCallback(res, err, data, 200));
});

// Dish Step
app.get("/dishSteps/:dishId", (req, res) => {
    DishStep.find(
        { dish: req.params.dishId },
        (err, data) => handleCallback(res, err, data, 200)).sort({ index: "asc" }
    );
});

app.post("/dishSteps", (req, res) => {
    const dishStep = req.body;
    DishStep.find({ dish: dishStep.dish }, (_err, steps) => {
        dishStep.index = steps.length;
        DishStep.create(dishStep, (err, data) => handleCallback(res, err, data, 201));
    });
});

app.put("/dishSteps/:id", (req, res) => {
    const updatedDishStep = req.body;
    DishStep.findByIdAndUpdate({ _id: req.params.id },
            updatedDishStep,
            (err, data) => handleCallback(res, err, data, 200));
});

app.put("/dishSteps/moveUp/:id", (req, res) => moveDishStep(req, res, 1));

app.put("/dishSteps/moveDown/:id", (req, res) => moveDishStep(req, res, -1));

/**
 * Moves a Dish Step
 * @param {Request} req
 * @param {Response} res
 * @param {Number} indexChange how to index of the other dish step has to be changed
 */
function moveDishStep(req, res, indexChange) {
    const movedDishStep = req.body;
    DishStep.findOneAndUpdate({ dish: movedDishStep.dish, index: movedDishStep.index }, { $inc: { index: indexChange } }, (otherDishStepErr, _data) => {
        if (!otherDishStepErr) {
            DishStep.findByIdAndUpdate(movedDishStep._id, movedDishStep, (err, data) => handleCallback(res, err, data, 200));
        } else {
            res.status(500).send(otherDishStepErr);
            console.error(otherDishStepErr);
        }
    });
}

app.delete("/dishSteps/:id", (req, res) => {
    DishStep.findOneAndDelete({ _id: req.params.id },
            (_deleteErr, deleted) => {
                DishStep.updateMany({ dish: deleted.dish, index: { $gt: deleted.index } },
                        { $inc: { index: -1 } },
                        (err, _data) => {
                    handleCallback(res, err, deleted, 200);
                });
            });
});

// Dish List
function handleDishListGetCallback(res, err, data) {
    if (err) {
        res.status(500).send(err);
        // console.log(err);
    } else if (!data) {
        // console.log("No dish list was found");
        res.status(204).send();
    } else {
        // console.log("Sending:", data);
        res.status(200).send(data);
    }
}

app.get("/dishList/:year/:week", (req, res) => {
    DishList.findOne({ year: req.params.year, week: req.params.week },
            (err, data) => handleDishListGetCallback(res, err, data))
            .populate("dishes").populate("selectedDishes");
})

app.get("/dishList/:id", (req, res) => {
    DishList.findOne({ _id: req.params.id }, (err, data) => handleCallback(res, err, data, 200))
            .populate("dishes").populate("selectedDishes");
})

app.post("/dishList", (req, res) => {
    const dishList = req.body;
    DishList.create(dishList, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/dishList/:id", (req, res) => {
    const updatedDishList = req.body;
    DishList.findByIdAndUpdate(req.params.id,
            updatedDishList,
            (err, data) => handleCallback(res, err, data, 200));
});

// Season

app.get("/seasons", (_req, res) => {
    Season.find((err, data) => handleCallback(res, err, data, 200)).sort({ name: "asc" });
});

app.post("/seasons", (req, res) => {
    const season = req.body;
    Season.create(season, (err, data) => handleCallback(res, err, data, 201));
});

app.put("/seasons/:id", (req, res) => {
    const updatedSeason = req.body;
    Season.findByIdAndUpdate(req.params.id,
            updatedSeason,
            (err, data) => handleCallback(res, err, data, 200));
});

// Callback

function handleCallback(res, err, data, successCode) {
    if (err) {
        res.status(500).send(err);
        console.error(err);
    } else {
        res.status(successCode).send(data);
    }
}

// Listener

app.listen(port, () => {
    console.log("Server running on port " + port);
});

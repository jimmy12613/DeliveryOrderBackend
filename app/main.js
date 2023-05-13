// Express Setup
const express = require("express");
const app = express();
const port = 3000;

// Body Parser Setup
const bodyParser = require("body-parser");
const e = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Constants
const errMsg = { error: "ERROR_DESCRIPTION" };
const successMsg = { status: "SUCCESS" };

// Import utils & models
const utils = require("./utils");
const model = require("./model");

// Routes
app.listen(port, () =>
  console.log("Application listening on port " + port + "!")
);

app.post("/orders", async (req, res) => {
  try {
    const { origin, destination } = req.body;

    if (!utils.isValidOrder(origin, destination)) {
      return res.status(400).send(errMsg);
    }
    
    const distance = await utils.getDistanceFromGoogleMaps(origin, destination);

    const createQuery = await model.createOrder(distance);
    const query = await model.getOrderById(createQuery[0].insertId);

    res.status(200).send(query[0][0]);

  } catch (error) {
    console.error(error);
    res.status(500).send(errMsg);
  }
});

app.patch("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status != "TAKEN") {
      throw new Error("Invalid status");
    }

    const query = await model.updateOrder(id, status);

    if (query[0].affectedRows == 0) {
      throw new Error("No record updated");
    }

    res.status(200).send(successMsg);
  } catch (error) {
    console.error(error);
    res.status(500).send(errMsg);
  }
});

app.get("/orders", async (req, res) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if (!utils.isValidPageAndLimit(page, limit)) {
      throw new Error("Invalid page or limit");
    }

    const query = await model.getOrdersByPageAndLimit(page, limit);
    res.status(200).send(query[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(errMsg);
  }
});

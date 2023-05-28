const flights = require("../controllers/flight.controllers");
module.exports = app => {
    const flights = require("../controllers/flight.controllers");

    var router = require("express").Router();

    router.post("/", flights.create);
    router.get("/", flights.findAll);
    router.get("/:id", flights.findOne);
    router.put("/:id", flights.update);
    router.delete("/:id", flights.delete);
    router.delete("/", flights.deleteAll);
    app.use('/api/flights', router);
};
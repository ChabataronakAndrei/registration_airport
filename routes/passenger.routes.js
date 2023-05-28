const passengers = require("../controllers/passenger.controllers");
module.exports = app => {
    const passengers = require("../controllers/passenger.controllers");

    var router = require("express").Router();

    router.post("/", passengers.create);
    router.get("/", passengers.findAll);
    router.get("/:id", passengers.findOne);
    router.put("/:id", passengers.update);
    router.delete("/:id", passengers.delete);
    router.delete("/", passengers.deleteAll);
    app.use('/api/passengers', router);
};
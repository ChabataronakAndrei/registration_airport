const db = require("../models");
const Flight = db.flights;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.date_flight) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const flight = {
        date_flight: req.body.date_flight,
        time_flight: req.body.time_flight,
        id_passenger1: req.body.id_passenger1,
        id_passenger2: req.body.id_passenger2,
        id_passenger3: req.body.id_passenger3,
        id_passenger4: req.body.id_passenger4,
        id_passenger5: req.body.id_passenger5,
    };

    Flight.create(flight)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Flight."
            });
        });
};

exports.findAll = (req, res) => {
    const date_flight = req.query.date_flight;
    var condition = date_flight ? { date_flight: { [Op.iLike]: `%${date_flight}%` } } : null;

    Flight.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Flight."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Flight.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Flight with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Flight with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Flight.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flight was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Flight with id=${id}. Maybe Flight was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Flight with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Flight.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flight was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flight with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Flight.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Flight were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Flight."
            });
        });
};
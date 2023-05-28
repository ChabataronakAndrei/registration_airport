const db = require("../models");
const Passenger = db.passengers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.game_nickname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const passenger = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        patronymic: req.body.patronymic,
        age: req.body.age,
        passenger_nickname: req.body.passenger_nickname
    };

    Passenger.create(passenger)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Passenger."
            });
        });
};

exports.findAll = (req, res) => {
    const passenger_nickname = req.query.passenger_nickname;
    var condition = passenger_nickname ? { game_nickname: { [Op.iLike]: `%${passenger_nickname}%` } } : null;

    Passenger.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Passenger."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Passenger.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Passenger with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Passenger with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Passenger.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Passenger was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Passenger with id=${id}. Maybe Passenger was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Passenger with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Passenger.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Passenger was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Passenger with id=${id}. Maybe Passenger was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Passenger with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Passenger.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Passengers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Passengers."
            });
        });
};
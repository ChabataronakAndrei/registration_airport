const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name_ticket) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Ticket
    const ticket = {
        name_ticket: req.body.name_ticket,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        prize_ticket: req.body.prize_ticket,
    };

    // Save ticket in the database
    Ticket.create(ticket)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ticket."
            });
        });
};

exports.findAll = (req, res) => {
    const name_ticket = req.query.name_ticket;
    var condition = name_ticket ? { name_ticket: { [Op.iLike]: `%${name_ticket}%` } } : null;

    Ticket.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Ticket."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Ticket with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ticket with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Ticket.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ticket was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ticket with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Ticket.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ticket was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ticket with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Ticket.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tickets were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tickets."
            });
        });
};
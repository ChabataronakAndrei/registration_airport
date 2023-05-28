module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        name_ticket: {
            type: Sequelize.STRING
        },
        date_start: {
            type: Sequelize.DATEONLY
        },
        date_end: {
            type: Sequelize.DATEONLY
        },
        prize_ticket: {
            type: Sequelize.STRING
        },
        sponsor: {
            type: Sequelize.STRING
        }
    });

    return Ticket;
};
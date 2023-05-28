module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight", {
        date_flight: {
            type: Sequelize.DATEONLY
        },
        time_flight: {
            type: Sequelize.TIME
        },
        id_passenger1: {
            type: Sequelize.INTEGER
        },
        id_passenger2: {
            type: Sequelize.INTEGER
        },
        id_passenger3: {
            type: Sequelize.INTEGER
        },
        id_passenger4: {
            type: Sequelize.INTEGER
        },
        id_passenger5: {
            type: Sequelize.INTEGER
        }
    });

    return Flight;
};
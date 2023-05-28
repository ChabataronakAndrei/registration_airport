module.exports = (sequelize, Sequelize) => {
    const Passenger = sequelize.define("passenger", {
        lastname: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        patronymic: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        passenger_nickname: {
            type: Sequelize.STRING
        }
    });

    return Passenger;
};
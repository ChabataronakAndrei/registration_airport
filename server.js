const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");

const app = express();

//var corsOptions = {origin: "http://localhost:3001"};
//app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json("Registration airport.");
});

require("./routes/flight.routes")(app);
require("./routes/passenger.routes")(app);
require("./routes/ticket.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
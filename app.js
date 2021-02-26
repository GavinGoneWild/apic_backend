const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());

// DOT ENV
require("dotenv/config");
const api = process.env.API_URL;
const port = process.env.PORT;

// ROUTERS
const usersRouter = require("./routes/users");
app.use(`${api}/users`, usersRouter);
const goalsRouter = require("./routes/goals");
app.use(`${api}/goals`, goalsRouter);


// DATABASE
mongoose
    .connect(process.env.CONNECTION_STRING, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(api);
    console.log("App listening on " + port);
});
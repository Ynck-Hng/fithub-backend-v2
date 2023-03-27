require("dotenv").config({override:true});

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./app/router/router");
const {notFound, errorCollector} = require("./app/utils/errorHandler");
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.use(notFound);

app.use(errorCollector);

app.listen(PORT, () => {
    console.log(`API Server started on ${PORT}`);
})
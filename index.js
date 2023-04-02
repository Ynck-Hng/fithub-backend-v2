require("dotenv").config({override:true});

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/router/index");
const {notFound, errorCollector} = require("./app/utils/errorHandler");
const PORT = process.env.PORT;
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            sameSite: "lax",
            maxAge : 3600*60*60
        }
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.use(notFound);

app.use(errorCollector);

app.listen(PORT, () => {
    console.log(`API Server started on ${PORT}`);
});
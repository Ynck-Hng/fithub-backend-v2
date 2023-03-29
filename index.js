require("dotenv").config({override:true});

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./app/router/router");
const {notFound, errorCollector} = require("./app/utils/errorHandler");
const PORT = process.env.PORT;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userSession = require("./app/utils/userSesssion");

app.use(cors({

    origin: "http://localhost:3000",
    credentials: true   
}
));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            sameSite: "lax",
            maxAge : 3600 * 60 * 60
        }
    })
);

app.use(cookieParser());
app.use(userSession);

app.use(router);

app.use(notFound);

app.use(errorCollector);

app.listen(PORT, () => {
    console.log(`API Server started on ${PORT}`);
})
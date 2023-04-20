require("dotenv").config({override:true});

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/router/index");
const {notFound, errorCollector} = require("./app/utils/errorHandler");
const PORT = process.env.PORT;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const http = require("http");
const https = require("https");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./app/utils/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/*
app.use(cors({
    origin: "https://fithub.surge.sh",
    credentials: true,
}));
*/

app.use((req, res, next) => {
    res.header("Content-Type", "application/json;charset=UTF-8");
    // authorize allow origin URLs to make requests
    res.header("Access-Control-Allow-Origin", "https://fithub.surge.sh");
    // allows the client to send credentials + cookies to the server
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// secure true + sameSite none to allow the client to retrieve cookies
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            // if production, then true && none
            // else false && lax
            secure: true,
            sameSite: "none",
            maxAge : 3600*60*60
        }
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({extended: true}));
app.use(router);

// error 404 handler
app.use(notFound);

// Collect the error and display the message.
app.use(errorCollector);

// remove comment if in development


if(process.env.NODE_ENV === "development"){
    
    app.listen(PORT, () => {
        console.log(`API Server started on http://localhost:${PORT}`);
    });

} else if(process.env.NODE_ENV === "production") {
    // IN PROD
    // server running on port 8080 for redirection

    // http.createServer(app).listen(8080);

    https.createServer(
        // https certificate keys
        {
            key: fs.readFileSync(`${process.env.CERT_KEY}`),
            cert: fs.readFileSync(`${process.env.CERT_CERTIF}`),
            ca: fs.readFileSync(`${process.env.CERT_CA}`)
        },
        app
    ).listen(8080, () => {
        console.log(`API Server started on https://ynck-hng-server.eddi.cloud:${PORT}`);
    });
};




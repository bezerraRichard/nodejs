import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import cors = require("cors");
import {Request, Response} from "express";
import {Routes} from "./routes";
import errorMiddleware from "./middleware/error.middleware";

createConnection().then(async connection => {
const app = express()
const port = 3000
const host = '0.0.0.0'
const allowedOrigins = ['http://localhost:9000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(bodyParser.json());

    // register express routes from defined application routes
Routes.forEach(route => {
        console.log(`Initialize ${route.method} - ${route.route}.`);
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
         //console.log(`Initialized ${route.route}.`);
});

app.use(errorMiddleware);
    // app.use(PatientRoutes);
    
    // Add headers before the routes are defined
    app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");

    // Pass to next layer of middleware
    next();
});


app.listen(port,host, () => {
  console.log(`Example app listening on port ${port}`)
})

}).catch(error => console.log(error));
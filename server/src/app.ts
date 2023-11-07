import express from "express";
import bodyParser from "body-parser";
import { initialize } from "express-openapi";
import cors from 'cors';
import apiDoc from './API/doc/APIdoc';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config(); // configurates .env stuff
const PORT = process.env.PORT; // grabs port from .env file

const app = express();
app.options('/v1/*', cors());
app.use(bodyParser.json());

initialize({
    apiDoc,
    app,
    paths: path.resolve(__dirname,'./API/paths'),
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/
});

app.use(((err, req, res, next) => {
    res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(PORT); // put application on this port
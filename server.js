import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import compression from "compression";
dotenv.config();

import connectDB from './database/conn.js';

//import router from "./routes/v1/UserRoutes.js";
import router from "./routes/v1/index.js";

const app = express();

app.use("/upload", express.static("upload"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, __, next) => {
    console.log(req.path, req.method);
    next();
});
app.disable("x-powered-by");

connectDB()
    .then(() => {
        app.use("/v1/api", router);
        app.listen(process.env.PORT, () => {
            console.log('Servidor rodando na porta ', process.env.PORT);
        });
    }).catch(error => console.error(`Não foi possiveil se conectar ao MongoDB por causa do error: ${error}`));

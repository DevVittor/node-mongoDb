import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './database/conn.js';

import { router } from "./routes/v1/UserRoutes.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

connectDB()
    .then(() => {
        app.use("/api/workouts", router);
        app.listen(process.env.PORT, () => {
            console.log('Servidor rodando na porta ', process.env.PORT);
        });
    }).catch(error => console.error(`Não foi possiveil se conectar ao MongoDB por causa do error: ${error}`));

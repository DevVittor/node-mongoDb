import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import compression from "compression";
import http from 'http';
dotenv.config();

import connectDB from './database/conn.js';

import router from "./routes/v1/index.js";

const app = express();
const servidorHTTP = http.createServer(app);
const portServer = process.env.PORT || 3000;

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
          servidorHTTP.listen(portServer,()=>{
            console.log(`Servidor rodando na porta ${portServer} usando Http`);
          });
      }).catch(error => console.error(`Não foi possiveil se conectar ao MongoDB por causa do error: ${error}`));

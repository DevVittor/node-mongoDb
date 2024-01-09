import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import compression from "compression";
import session from 'express-session';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
dotenv.config();

import connectDB from './database/conn.js';

import router from "./routes/v1/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const servidorHTTP = http.createServer(app);
const portServer = process.env.PORT || 3000;
const localDosLogs = path.join(__dirname,'logs');
fs.existsSync(localDosLogs) || fs.mkdirSync(localDosLogs);
const acessarLogStream = rfs.createStream('access.log',{
  size: '10M',
  interval:'1d',
  path:localDosLogs
});

app.use(morgan('combined',{stream:acessarLogStream}));
// Defina o stream de log no contexto global da sua aplicação
app.locals.accessLogStream = acessarLogStream;

app.use("/upload", express.static("upload"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // Algumas versões do CORS do Express requerem esse parâmetro
}));
app.use(session({
  secret: 'suaChaveSecretaAqui',
  resave: false,
  saveUninitialized: true
}));
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

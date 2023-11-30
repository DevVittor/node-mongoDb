import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from './database/conn.js';

import { getHomePage } from './controllers/indexController.js';
import { getRegisterPage, saveUser } from './controllers/registerController.js'
import { getLoginPage, userLogin } from "./controllers/loginController.js";
import { getError404Page } from "./controllers/error404Controller.js";

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", getHomePage);
app.get("/register", getRegisterPage);
app.post("/register/save", saveUser);
app.get("/login", getLoginPage);
app.post("/login/save", userLogin);
app.get("*", getError404Page);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
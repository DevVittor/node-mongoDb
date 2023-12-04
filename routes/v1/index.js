import express from "express";

const router = express.Router();

import home from './homeRoute.js';
import acomp from './acompRoute.js';
import planos from './planosRoute.js';
import sobre from './sobreRoute.js';
import register from './registerRoute.js';
import login from './loginRoute.js';
import product from './productRoute.js';
import publicidade from './publicRoute.js';

router.use("/", home);
router.use("/acompanhantes", acomp);
router.use("/planos", planos);
router.use('/sobre', sobre);
router.use("/register", register);
router.use("/login", login);
router.use("/product", product);
router.use("/publicidade", publicidade);

export default router;
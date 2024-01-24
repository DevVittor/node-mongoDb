import express from "express";

const router = express.Router();

import home from './homeRoute.js';
import acomp from './acompRoute.js';
import planos from './planosRoute.js';
import sobre from './sobreRoute.js';
import register from './registerRoute.js';
import login from './loginRoute.js';
import logout from './logoutRoute.js';
import publicidade from './publicRoute.js';
import pageFound from './foundPageRoute.js';
import category from './categoryRoute.js';

router.use("/", home);
router.use("/acompanhantes", acomp);
router.use("/categoria", category);
router.use("/planos", planos);
router.use('/sobre', sobre);
router.use("/register", register);
router.use("/login", login);
router.use("/logout",logout);
router.use("/publicidade", publicidade);
router.use("/*", pageFound);

export default router;

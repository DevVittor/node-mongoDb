import express from "express";

const router = express.Router();

import home from './homeRoute.js';
import publicidade from './publicRoute.js';

router.use("/", home);
router.use("/publicidade", publicidade);

export default router;
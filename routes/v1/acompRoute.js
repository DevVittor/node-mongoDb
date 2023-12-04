import express from 'express';
const router = express.Router();

import Acomp from '../../controllers/acompanhanteController.js';
const acompController = new Acomp();

router.get("/", acompController.index);

export default router;
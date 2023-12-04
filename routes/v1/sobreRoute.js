import express from 'express';
const router = express.Router();

import Sobre from '../../controllers/sobreController.js';
const sobreController = new Sobre();

router.get("/", sobreController.index);

export default router;
import express from "express";

const router = express.Router();

import Publicidade from '../../controllers/publicidadeController.js';

const publicidadeController = new Publicidade();

router.get("/", publicidadeController.publicidadePage);

export default router;
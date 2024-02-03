import express from "express";
import upload from '../../middleware/multer.js';

const router = express.Router();

import Publicidade from '../../controllers/publicidadeController.js';

const publicidadeController = new Publicidade();

router.get("/", publicidadeController.index);
router.post("/create",upload.single("files"),publicidadeController.store);

export default router;
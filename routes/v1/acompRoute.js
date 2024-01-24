import express from 'express';
const router = express.Router();
//import upload from '../../middleware/multer.js';
//import Auth from '../../middleware/Auth.js';
import multer from 'multer';

import Acomp from '../../controllers/acompController.js';
const acompController = new Acomp();

router.get("/", acompController.index);
router.get("/:id", acompController.show);
//router.post("/save", upload.array("files", 5), acompController.store);
router.post("/save", multer({storage: multer.memoryStorage()}).array("files",5), acompController.store);

export default router;

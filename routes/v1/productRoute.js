import express from 'express';

const router = express.Router();

import Acomp from '../../controllers/acompController.js';
import upload from '../../middleware/multer.js';

const productController = new Acomp();

router.get("/", productController.index);
router.post("/save", upload.array("avatar", 5), productController.store);
router.delete("/", productController.remove);

export default router;
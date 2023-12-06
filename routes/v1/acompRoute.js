import express from 'express';
const router = express.Router();

import Acomp from '../../controllers/acompController.js';
const acompController = new Acomp();

router.get("/", acompController.index);
router.get("/:id", acompController.show);

export default router;
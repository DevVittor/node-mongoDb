import express from 'express';

const router = express.Router();

import Register from '../../controllers/registerController.js';

const registerController = new Register();

router.get("/", registerController.index);
router.post("/create", registerController.store);

export default router;
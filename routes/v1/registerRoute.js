import express from 'express';

const router = express.Router();

import Register from '../../controllers/registerController.js';

const registerController = new Register();

router.get("/", registerController.RegisterPage);

export default router;
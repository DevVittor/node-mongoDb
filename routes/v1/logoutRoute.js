import express from 'express';

const router = express.Router();

import Logout from '../../controllers/logoutController.js';

const logoutController = new Logout();

router.get("/",logoutController.index);

export default router;

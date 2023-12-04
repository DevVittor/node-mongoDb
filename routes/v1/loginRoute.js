import express from 'express';

const router = express.Router();

import Login from '../../controllers/loginController.js';

const loginController = new Login();

router.get('/', loginController.loginPage);

export default router;
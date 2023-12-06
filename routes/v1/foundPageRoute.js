import express from 'express';

const router = express.Router();

import PageFound from '../../controllers/error404Controller.js';

const pageFoundController = new PageFound();

router.get("*", pageFoundController.index);

export default router;
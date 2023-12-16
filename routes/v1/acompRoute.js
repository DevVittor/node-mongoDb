import express from 'express';
const router = express.Router();

import Auth from '../../middleware/Auth.js';

import Acomp from '../../controllers/acompController.js';
const acompController = new Acomp();

router.get("/",acompController.index);
router.get("/:id", acompController.show);
router.post("/save", acompController.store);


export default router;

import express from "express";

const router = express.Router();

import Register from "../../controllers/registerController.js";

const registerController = new Register();

router.get("/", registerController.index);
router.post("/salvar", registerController.store);

export default router;

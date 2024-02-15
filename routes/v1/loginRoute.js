import express from "express";

const router = express.Router();

import Login from "../../controllers/loginController.js";

const loginController = new Login();

router.get("/:id", loginController.index);
router.post("/checar", loginController.store);

export default router;

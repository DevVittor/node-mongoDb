import express from 'express';
const router = express.Router();

import Category from '../../controllers/categoryController.js';
const categoryController = new Category();

router.get("/", categoryController.index);
router.get("/ver", categoryController.show);
router.post("/save", categoryController.store);
router.delete("/:id", categoryController.remove);
export default router;

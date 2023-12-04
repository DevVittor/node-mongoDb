import express from 'express';

const router = express.Router();

import Product from '../../controllers/productController.js';

const productController = new Product();

router.get("/", productController.productHomePage);

export default router;
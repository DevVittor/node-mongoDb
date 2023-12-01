import express from "express";
export const router = express.Router();

import Home from '../../controllers/indexController.js';
import Login from '../../controllers/loginController.js';
import Product from '../../controllers/productController.js';

const loginController = new Login();
const homeController = new Home();
const productControlelr = new Product();

router.get("/", homeController.getHomePage);
router.get("/product", productControlelr.productHomePage);
router.get("/login", loginController.loginPage);
router.post("/login/save", loginController.userLogin);
router.post("/product/save", productControlelr.createProduct);
router.put("/:id", (req, res) => {
    res.json({ message: "Email Alterado" });
});
router.patch("/:id", (req, res) => {
    res.json({ message: "Conta Alterada com sucesso!" });
});
router.delete("/:id", (req, res) => {
    res.json({ message: "Conta Apagada!" });
});
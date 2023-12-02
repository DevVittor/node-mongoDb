import express from "express";
const router = express.Router();

import upload from '../../middleware/multer.js';

import Home from '../../controllers/indexController.js';
import Login from '../../controllers/loginController.js';
import Register from '../../controllers/registerController.js';
import Product from '../../controllers/productController.js';
import FoundPage from '../../controllers/error404Controller.js';

const homeController = new Home();
const loginController = new Login();
const registerController = new Register();
const productControlelr = new Product();
const foundPageController = new FoundPage();

router.get("/", homeController.getHomePage);
router.get("/login", loginController.loginPage);
router.get("/register", registerController.RegisterPage);
router.get("/product", productControlelr.productHomePage);
router.get("*", foundPageController.getError404Page);

router.post("/login/save", loginController.userLogin);
router.post("/register/save", registerController.saveUser);
router.post("/product/save", upload.single('avatar'), productControlelr.createProduct);


router.put("/:id", (req, res) => {
    res.json({ message: "Email Alterado" });
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Conta Alterada com sucesso!" });
});

router.delete("/:id", (req, res) => {
    res.json({ message: "Conta Apagada!" });
});

export default router;
import express from "express";
const router = express.Router();

import upload from '../../middleware/multer.js';

import Home from '../../controllers/indexController.js';
import Login from '../../controllers/loginController.js';
import Register from '../../controllers/registerController.js';
import Product from '../../controllers/productController.js';
import Publicidade from '../../controllers/publicidadeController.js';
import FoundPage from '../../controllers/error404Controller.js';

const homeController = new Home();
const loginController = new Login();
const registerController = new Register();
const productController = new Product();
const publicidadeController = new Publicidade();
const foundPageController = new FoundPage();

router.get("/", homeController.getHomePage);
router.get("/login", loginController.loginPage);
router.get("/register", registerController.RegisterPage);
router.get("/product", productController.productHomePage);
router.get("/publicidade", publicidadeController.publicidadePage);
router.get("*", foundPageController.getError404Page);

router.post("/login/save", loginController.userLogin);
router.post("/register/save", registerController.saveUser);
router.post("/publicidade/save", publicidadeController.createBanner);
router.post("/product/save", upload.array('avatar', 5), productController.createProduct);


router.put("/:id", (req, res) => {
    res.json({ message: "Email Alterado" });
});

router.patch("/:id", (req, res) => {
    res.json({ message: "Conta Alterada com sucesso!" });
});

router.delete("/product/remove", productController.deleteAllProducts);

export default router;
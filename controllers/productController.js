import { productModel } from '../models/productModel.js';

class Product {

    async productHomePage(req, res) {
        res.render("Product");
    };

    async createProduct(req, res) {

        const { marca, valor } = req.body;

        try {

            const productCreate = await productModel.create({
                marca,
                valor
            });
            productCreate.save();
            console.log("Produto criado com sucesso!");
            res.status(200).redirect("/api/workouts/");

        } catch (error) {
            console.log(`Não foi possível criar o produto por causa disso: ${error}`);
            res.status(401);
            return;
        }

    }

}

export default Product;
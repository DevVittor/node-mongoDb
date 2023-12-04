import productModel from '../models/productModel.js';
import sharp from 'sharp';
import removeAccents from "remove-accents";
import fs from 'fs';

class Product {

    async productHomePage(req, res) {
        res.render("Product");
    };

    async createProduct(req, res) {

        if (!req.files || req.files.length === 0) {
            console.log("Nenhum arquivo foi enviado");
            res.status(400).send("Nenhum arquivo foi enviado");
            return;
        }
        const { marca, valor } = req.body;
        const convertedImages = [];
        for (const file of req.files) {
            const nameFile = removeAccents(marca).replace(/[^a-zA-Z0-9]+/g, '_');
            const convertedImg = `${nameFile}_${Date.now()}.webp`;

            await sharp(file.path)
                .resize({ width: 600, fit: 'cover', position: 'center' })
                .toFile(`upload/${convertedImg}`);

            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error(`Erro ao excluir o arquivo: ${err}`);
                } else {
                    console.log(`Arquivo ${file.filename} excluído com sucesso.`);
                }
            });

            convertedImages.push(convertedImg);
        }
        try {

            const productCreate = await productModel.create({
                avatar: convertedImages,
                marca,
                valor
            });
            productCreate.save();
            console.log("Produto criado com sucesso!");
            res.status(200).redirect("/v1/api/");

        } catch (error) {
            console.log(`Não foi possível criar o produto por causa disso: ${error}`);
            res.status(401);
            return;
        }

    }

    async deleteAllProducts(req, res) {
        try {
            await productModel.deleteMany({});
            console.log("Todos os produtos foram apagados.")
            res.status(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default Product;
import productModel from '../models/productModel.js';
import sharp from 'sharp';
import removeAccents from "remove-accents";
import fs from 'fs';

class Product {

    async productHomePage(req, res) {
        res.send("Product");
    };

    async createProduct(req, res) {

        const { marca, valor } = req.body;
        const avatar = req.file.filename;

        const nameFile = removeAccents(marca).replace(/[^a-zA-Z0-9]+/g, '_');
        const convertedImg = `${nameFile}_${Date.now()}.webp`;

        await sharp(`upload/${avatar}`)
            .resize({ width: 600, fit: 'cover', position: 'center' })
            .toFile(`upload/${convertedImg}`);

        fs.unlink(`upload/${avatar}`, (err) => {
            if (err) {
                console.error(`Erro ao excluir o arquivo: ${err}`);
            } else {
                console.log(`Arquivo ${avatar} excluído com sucesso.`);
            }
        });

        try {

            const productCreate = await productModel.create({
                avatar: convertedImg,
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
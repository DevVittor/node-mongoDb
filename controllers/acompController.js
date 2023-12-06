import acompModel from '../models/acompModel.js';
import sharp from 'sharp';
import removeAccents from "remove-accents";
import fs from 'fs';

class Acomp {

    async index(req, res) {
        const listProduct = await acompModel.find();

        res.json({ dados: listProduct });
    };

    async show(req, res) {
        const { id } = req.params;
        try {
            const acompInfo = await acompModel.findOne({ _id: id });
            if (!acompInfo) {
                return res.status(404).json({ message: 'Acompanhante não encontrado' });
            }
            res.status(200).json({ info: acompInfo });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async store(req, res) {

        if (!req.files || req.files.length === 0) {
            console.log("Nenhum arquivo foi enviado");
            res.status(400).send("Nenhum arquivo foi enviado");
            return;
        }
        const { nome, caches } = req.body;
        const convertedImages = [];
        for (const file of req.files) {
            const nameFile = removeAccents(nome).replace(/[^a-zA-Z0-9]+/g, '_');
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

            const productCreate = await acompModel.create({
                fotos: convertedImages,
                nome,
                caches
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

    async remove(req, res) {
        try {
            await acompModel.deleteMany({});
            console.log("Todos os produtos foram apagados.")
            res.status(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default Acomp;
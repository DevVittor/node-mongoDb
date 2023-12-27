import acompModel from '../models/acompModel.js';
import sharp from 'sharp';
import removeAccents from "remove-accents";
//import fs from 'fs';

class Acomp {

  async index(req, res) {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    try {
      const {nome} = req.body;
      if(nome){
        const searchUser = await acompModel.findOne({nome: nome});
        res.status(200).json({search:searchUser});
      }

      const listProduct = await acompModel.find().skip(skip).limit(parseInt(limit));
      res.json({ dados: listProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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
  /*async search(req, res) {
  try {
    const { nome } = req.query;
    console.log(nome);
    if (!nome) {
      const acompanhantes = await acompModel.find();
      return res.status(200).json({ resultBusca: acompanhantes });
    } else {
      const acompanhantes = await acompModel.find({ nome: { $regex: new RegExp(nome, 'i') } }); 
      if (acompanhantes.length === 0) {
        console.log("Nenhum acompanhante encontrado!");
        return res.status(404).json({ message: 'Nenhum acompanhante encontrado.' });
      }
      res.status(200).json({ resultBusca: acompanhantes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}*/

  async store(req, res) {

    /*if (!req.files || req.files.length === 0) {
        console.log("Nenhum arquivo foi enviado");
        res.status(400).send("Nenhum arquivo foi enviado");
        return;
    }*/
    const { nome, genero, idade, caches, sobre } = req.body;
    /*const convertedImages = [];
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
    }*/
    try {

      const productCreate = await acompModel.create({
        //fotos: convertedImages,
        nome,
        genero,
        idade,
        caches,
        sobre
      });
      productCreate.save();
      console.log("Produto criado com sucesso!");
      // Registra um log após criar o produto
      req.app.locals.accessLogStream.write(`Produto criado: ${nome}\n`);
      res.status(200).json({ mensagem: "Produto criado com sucesso!" });

    } catch (error) {
      console.log(`Não foi possível criar um perfil por causa disso: ${error}`);
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

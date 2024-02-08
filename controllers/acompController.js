import acompModel from '../models/acompModel.js';
import sharp from 'sharp';
import removeAccents from "remove-accents";
import {promisify} from 'util';
import fs from 'fs/promises';
const writeFileAsync = promisify(fs.writeFile);

class Acomp {

  async index(req, res) {
    const { page = 1, limit = 12, nome, genero } = req.query;
    const skip = (page - 1) * limit;
    const query = {};

      try {
        if (nome) {
          query.nome = { $regex: new RegExp(nome, "i") };
        }

        if (genero) {
          query.genero = genero; // Supondo que o gênero seja uma string exata (por exemplo: "masculino", "feminino")
        }
        console.log(skip);
        console.log(query);
        const users = await acompModel.find(query).skip(skip).limit(parseInt(limit));
        res.status(200).json({ dados: users });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  }

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
    const {nome,genero,idade,altura,peso,sobre,caches,servicos} = req.body;

    if(!genero || !idade || !altura || !peso || !sobre || !caches || !servicos){
      return res.status(404).json({mensagem:"Preencha todos os campos"});
    }
    try {
      if (!req.files || !files.buffer || req.files.length === 0) {
        console.log("Nenhum arquivo foi enviado");
        res.status(400).send("Nenhum arquivo foi enviado");
        return;
      }
      
      const convertedImages = [];

      try {
        for (const file of req.files) {
          const nameFile = removeAccents(nome).trim();
          const convertedImg = `${nameFile}_${Date.now()}.webp`;
          if (!['image/jpeg', 'image/png', /* outros formatos suportados */].includes(file.mimetype)) {
            console.error('Tipo de arquivo não suportado:', file.mimetype);
            continue;  // Pular para o próximo arquivo
          }
          const convertedImageBuffer = await sharp(file.buffer)
            .resize({ width: 600, fit: 'cover', position: 'center' })
            .toFormat('webp')
            .toBuffer();
  
            await writeFileAsync(`upload/${convertedImg}`, convertedImageBuffer);
  
          convertedImages.push(convertedImg);
        }
      } catch (sharpError) {
        console.error('Erro no Sharp:', sharpError);
      }

      for (const file of req.files) {
        if (!file.buffer || file.buffer.length === 0) {
          console.error('Buffer de imagem inválido:', file);
          continue;  // Pular para o próximo arquivo
        }
        await fs.unlink(file.path);
      }

      try {
        const productCreate = await acompModel.create({
          fotos: convertedImages,
        });
      
        await productCreate.save();
        console.log("Produto criado com sucesso!");
        req.app.locals.accessLogStream.write(`Produto criado: ${nome}\n`);
        res.status(200).json({ mensagem: "Produto criado com sucesso!", data: { nome, convertedImages } });
      } catch (error) {
        console.error(`Erro ao criar ou salvar o produto: ${error}`);
        res.status(500).json({ error: 'Erro durante o processamento de arquivos' });
      }      

    } catch (error) {
      console.error(`Não foi possível criar um perfil: ${error}`);
      res.status(500).json({ error: 'Erro durante o processamento de arquivos' });
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

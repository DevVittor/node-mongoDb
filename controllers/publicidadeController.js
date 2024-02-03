import anuncianteModel from "../models/anuncianteModel.js";
import removeAccents from "remove-accents";
import path from 'node:path';
import sharp from "sharp";
import fs from 'node:fs';


class Publicidade {

    async index(req, res) {
        res.json({ mensagem: "Publi" });
    }
    async show(req,res){
        //
    }
    async store(req, res) {
        const data = new Date();
        data.setDate(data.getDate() + 30);
        const dia = String(data.getDate()).padStart(2,'0');
        const mes = String(data.getMonth()+1).padStart(2,'0');
        const ano = String(data.getFullYear());

        const dataAtual = `${dia}/${mes}/${ano}`;
        const {name, link} = req.body;
        const image = req.files;
        
        const bannerName = removeAccents(name).trim().replace(/\s+/g,"_")+"_"+Date.now()+"_"+Math.floor(Math.random()* 1E9)
        const bannerPath = path.join(`uploads/${bannerName}.webp`);

        const convertedImageBuffer = await sharp(image.buffer)
        .resize({ width: 600, fit: 'cover', position: 'center' })
        .toBuffer();

        fs.writeFileSync(bannerPath,convertedImageBuffer)
        const createBanner = await anuncianteModel.create({
            where:{
                title: name,
                banner:bannerPath,
                link:link,
                vencimento:dataAtual
            }
        });

        await createBanner.save()
        console.log(`O banner foi criado com sucesso!`);

    }
    async put(req,res){
        //
    }
    async delete(req,res){
        //
    }

}

export default Publicidade;
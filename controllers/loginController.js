import User from '../models/userModel.js';
import Acomp from '../models/acompModel.js';
import Anunciante from '../models/anuncianteModel.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
class Login {

    async index(req, res) {
        const {id} = req.params;
        
        try {
            const searchData = await User.findById(id);

            if(!searchData) return res.status(404).json({mensagem:"Nenhum Usuário foi encontrado com esse ID"});

            res.status(200).json(searchData);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem:`Deu um erro na busca pelo usuário!Error:${error}`});
        }

    }

    async store(req, res) {
        const { email, senha, typeAccount } = req.body;
        let userCheck;
        switch(typeAccount) {
            case 'Cliente':
                userCheck = await User.findOne({ email });
                break;
            case 'Acompanhante':
                userCheck = await Acomp.findOne({email});
                break;
            case 'Anunciante':
                userCheck = await Anunciante.findOne({email});
                break;
            default:
                return res.status(301);
        }

        try {
            
            console.log(userCheck);
            if (!userCheck) {
                res.status(401).json({ error: 'Credenciais inválidas' });
                return;
            }

            const senhaValida = await bcrypt.compare(senha, userCheck.senha);

            if (senhaValida) {
                console.log("UserID:",userCheck._id);
                const userIdString = userCheck._id.toString();
              jwt.sign(
                {id:userIdString},
                jwtSecret,
                {expiresIn:30},
                (error,token)=>{
                  if(error){
                    res.status(400).json({error:"Falha Interna"});
                  }else{
                    req.tokenCode = token;
                    res.status(200).json({token:token, userId:userIdString});
                    console.log(token);
                  }
                }
              )
                console.log(`Login feito com sucesso!`)
                res.status(200);
            } else {
                console.log(`Não foi possivel fazer login`)
                res.status(301);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
	}

}

export default Login;

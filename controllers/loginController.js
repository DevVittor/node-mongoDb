import User from '../models/userModel.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
class Login {

    async index(req, res) {
        res.json({ menssagem: "Login" });
    }

    async store(req, res) {
        const { email, senha } = req.body;

        try {
            const userCheck = await User.findOne({ email });

            if (!userCheck) {
                res.status(401).json({ error: 'Credenciais inválidas' });
                return;
            }

            const senhaValida = await bcrypt.compare(senha, userCheck.senha);

            if (senhaValida) {
              jwt.sign(
                {id:userCheck._id},
                jwtSecret,
                {expiresIn:30},
                (error,token)=>{
                  if(error){
                    res.status(400).json({error:"Falha Interna"});
                  }else{
                    req.tokenCode = token;
                    res.status(200).json({token:token});
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

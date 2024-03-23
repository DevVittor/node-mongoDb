import User from "../models/userModel.js";
import Acomp from "../models/acompModel.js";
import Anunciante from "../models/anuncianteModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
class Login {
    async index(req, res) {
        const { id } = req.params;

        try {
            const searchData = await User.findById(id);

            if (!searchData)
                return res
                    .status(404)
                    .json({ mensagem: "Nenhum Usuário foi encontrado com esse ID" });

            res.status(200).json(searchData);
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ mensagem: `Deu um erro na busca pelo usuário!Error:${error}` });
        }
    }

    async store(req, res) {
        const { email, senha } = req.body;

        if (!email) return res.status(404).json({ mensagem: "Preencha o email corretamente" });
        if (!senha) return res.status(404).json({ mensagem: "Coloque uma senha válida" })

        try {
            const buscarUsuario = await User.findOne({ email: email });
            if (!buscarUsuario) return res.status(404).json({ mensagem: "Esse email não foi cadastrado" });
            const senhaValida = await bcrypt.compare(senha, buscarUsuario.senha);

            if (senhaValida) {
                console.log("UserID:", buscarUsuario._id);
                const userIdString = buscarUsuario._id.toString();
                const token = jwt.sign({ id: userIdString }, jwtSecret, { expiresIn: '72h' });
                console.log("Token de acesso:", token);
                setTimeout(() => {
                    try {
                        var decoded = jwt.verify(token, `${jwtSecret}`);
                        console.log(decoded);
                    } catch (error) {
                        console.log("Error:", error);
                    }
                }, 2000);
                req.tokenCode = token;
                res.status(200).json({ token: token, userId: userIdString });
                console.log(`Login feito com sucesso!`);
            } else {
                console.log(`Não foi possivel fazer login`);
                res.status(301);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: `Deu ruim aqui com o error: ${error}` });
        }
    }
}

export default Login;

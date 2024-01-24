import User from '../models/userModel.js';
import Acomp from '../models/acompModel.js';
import Anunciante from '../models/anuncianteModel.js';
import bcrypt from "bcrypt";

class Register {

    async index(req, res) {
        res.json({ mensagem: "Register" });
    };

    async store(req, res) {
        const { email, senha, typeAccount } = req.body;
        let UsuarioType;
        if (!email) {
            res.status(301);
            console.log(`Tem que ter um email`);
        } else if (!senha) {
            res.status(301);
            console.log(`Tem que ter uma senha`);
        }else if(!typeAccount){
            res.status(301);
        } else {
            switch(typeAccount) {
                case 'Cliente':
                    UsuarioType = User;
                    break;
                case 'Acompanhante':
                    UsuarioType = Acomp;
                    break;
                case 'Anunciante':
                    UsuarioType = Anunciante;
                    break;
                default:
                    res.status(301);
                    return;
            }
            const hashPassword = await bcrypt.hash(senha, 10);
            const cadastrarUser = new UsuarioType({
                email,
                senha: hashPassword,
                typeAccount
            });
            await cadastrarUser.save();
            res.status(200).json({mensagem:`Foi criada uma conta no ${typeAccount} com o email: ${email}`});
            console.log(`Foi criada uma conta no ${typeAccount} com o email: ${email}`);
            
        }
    }

}
export default Register;

import User from '../models/userModel.js';
import bcrypt from "bcrypt";

class Register {

    async index(req, res) {
        res.json({ mensagem: "Register" });
    };

    async store(req, res) {

        const {nome, email, senha, typeAccount} = req.body;
        if(!nome || !email || !senha || !typeAccount) return res.status(400).json({mensagem:"Preencha todos os campos corretamente"});
        try {
            const duplicateEmail = await User.findOne({email});
            if(duplicateEmail) return res.status(400).json({mensagem:`Esse ${email} já foi cadastrado`});
            const salt = bcrypt.genSaltSync(16);
            const hashSenha = bcrypt.hashSync(senha,salt);
            const createAccount = await User({
                nome,
                email,
                senha:hashSenha,
                typeAccount
            });
            await createAccount.save();
            res.status(201).json({mensagem:`Conta Criada com sucesso com o tipo ${typeAccount}`})
        } catch (error) {
            console.log(`Catch error: ${error}`);
        }

    }

}
export default Register;

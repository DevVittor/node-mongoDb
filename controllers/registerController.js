import User from '../models/userModel.js';
import bcrypt from "bcrypt";

class Register {

    async index(req, res) {
        res.render("Register");
    };

    async store(req, res) {
        const { email, senha } = req.body;

        if (!email) {
            console.log(`Tem que ter um email`);
        } else if (!senha) {
            console.log(`Tem que ter uma senha`);
        } else {
            const hashPassword = await bcrypt.hash(senha, 10);
            const cadastrarUser = new User({
                email,
                senha: hashPassword
            });
            cadastrarUser.save();
            console.log("Conta criada com sucesso!");
            res.status(200).redirect("/v1/api/");
        }
    }

}
export default Register;
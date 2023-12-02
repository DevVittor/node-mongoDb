import User from '../models/userModel.js';
import bcrypt from "bcrypt";

class Register {

    async RegisterPage(req, res) {
        res.send("Register");
    };

    async saveUser(req, res) {
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
            res.status(200).json({ dadosUser: cadastrarUser });
        }
    }

}
export default Register;
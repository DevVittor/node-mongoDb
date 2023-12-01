import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";
class Login {

    async loginPage(req, res) {
        res.render("Login");
    }

    async userLogin(req, res) {
        const { email, senha } = req.body;

        try {
            const userCheck = await User.findOne({ email });

            if (!userCheck) {
                res.render('login', { error: 'Credenciais inválidas' });
                return;
            }

            const senhaValida = await bcrypt.compare(senha, userCheck.senha);

            if (senhaValida) {
                console.log(`Login feito com sucesso!`)
                res.status(200).redirect("/api/workouts/");
            } else {
                console.log(`Não foi possivel fazer login`)
                res.status(301).redirect("/api/workouts/login");
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    }

}

export default Login;
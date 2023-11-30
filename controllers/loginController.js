import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getLoginPage = (req, res) => {
    res.render("Login");
};

export const userLogin = async (req, res) => {
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
            res.status(200).redirect("/");
        } else {
            console.log(`Não foi possivel fazer login`)
            res.status(301).redirect("/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
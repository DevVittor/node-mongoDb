//import User from '../models/userModel.js';
import Acomp from '../models/acompModel.js';
class Home {
  async index(req, res) {
    const {nome_tag} = req.params;
    console.log("UserTag",nome_tag);

    try {
      const user = await Acomp.findOne({ nome_tag: nome_tag  });
      
      if (!user) {
        return res.status(404).json({ mensagem: "Não foi encontrado nenhum usuário com esse nome!" });
      }
      
      // Se você quiser fazer alguma coisa com o usuário encontrado, faça aqui
      
      res.status(200).json({ user });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ mensagem: "Erro ao buscar usuário" });
    }
  }
}

export default Home;

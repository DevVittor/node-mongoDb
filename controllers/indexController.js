import User from '../models/userModel.js';
class Home {
  async index(req, res) {
    res.json({ mensagem: "Apenas a home" });
  }
}

export default Home;

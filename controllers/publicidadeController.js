class Publicidade {

    async index(req, res) {
        res.json({ mensagem: "Publi" });
    }
    async store(req, res) {
        console.log("Anuncio criado!");
        res.status(200);
    }

}

export default Publicidade;
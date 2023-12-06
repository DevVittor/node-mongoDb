class Sobre {

    async index(req, res) {
        res.json({ mensagem: "Sobre" });
    }

}

export default Sobre;
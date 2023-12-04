class Publicidade {

    async publicidadePage(req, res) {
        res.render("Publi");
    }
    async createBanner(req, res) {
        console.log("Anuncio criado!");
        res.status(200).redirect("/v1/api/");
    }

}

export default Publicidade;
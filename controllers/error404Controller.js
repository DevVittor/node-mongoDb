class PageFound {

    async getError404Page(req, res) {
        res.render("Error404");
    }

}

export default PageFound;
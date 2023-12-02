import productModel from '../models/productModel.js';
class Home {

    async getHomePage(req, res) {

        try {
            const urlImg = await productModel.find({ avatar: { $exists: true } });

            if (!urlImg) {
                return res.status(404).console.log("Produto não encontrado");
            }
            console.log(urlImg);
            res.status(200).json({ foto: urlImg });
        } catch (error) {
            console.error(error);
        }
    }

}

export default Home;
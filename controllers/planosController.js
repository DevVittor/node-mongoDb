import dotenv from 'dotenv';
dotenv.config();
import stripePackage from "stripe";
const stripe = stripePackage(process.env.STRIPE);
class Planos {

    async index(req, res) {
        res.send("Planos");
    }

    async createRecovery(req, res) {
        const { priceId } = req.body;
        const url = process.env.STRIPE_URL;
        console.log("Corpo da solicitação recebida:", req.body);
        const session = await stripe.checkout.sessions.create({
        //await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `https://www.youtube.com/`,
            cancel_url: `https://www.google.com/`,
        });
        res.status(200).json({ url: session.url });
        //res.status(200).redirect(url);
    }

}

export default Planos;
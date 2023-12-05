import dotenv from 'dotenv';
dotenv.config();
import stripePackage from "stripe";
const stripe = stripePackage(process.env.STRIPE);
class Planos {

    async index(req, res) {
        res.render("Planos");
    }

    async createRecovery(req, res) {
        const { priceId } = req.body;
        const url = "https://checkout.stripe.com/c/pay/cs_test_a139ksnG7ooBpxYiLP6R1SPEAbcmZK5w9sDdxqZPwUQAdisNGoZPjmVz5g#fid2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRLQ098fUxnZkBiYEN0ZHRMcTNEcm9QMlBnV2dHZ29RTlNxaF1jQWw0VEsxaWJMc0I1ZDAwdF1vXDZnZFZMVE83SmlHb11iN3Z8ME01bU1cbWt0Tl9iSFU1NU1ESUFcNGp8JyknY3dqaFZgd3Ngdyc%2FcXdwYCknaWR8anBxUXx1YCc%2FJ3Zsa2JpYFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl";
        console.log("Corpo da solicitação recebida:", req.body);
        //const session = await stripe.checkout.sessions.create({
        await stripe.checkout.sessions.create({
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
        //res.status(200).json({ url: session.url });
        res.status(200).redirect(url);
    }

}

export default Planos;
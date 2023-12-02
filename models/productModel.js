import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true,
        trim: true
    },
})

const productModel = mongoose.model("products", productSchema);

export default productModel;
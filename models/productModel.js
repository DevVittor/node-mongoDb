import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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

export const productModel = mongoose.model("products", productSchema);
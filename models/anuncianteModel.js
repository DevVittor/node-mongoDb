import mongoose from "mongoose";

const anuncianteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
    typeAccount: [{
        type: String,
        required: true,
        default: "Anunciante",
    }],
    banner: {
        type: String,
        required: false
    },
    linkBanner: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    prazo: {
        type: Number,
        required: false,
    }
});

const anuncianteModel = mongoose.model("anunciantes", anuncianteSchema);

export default anuncianteModel;
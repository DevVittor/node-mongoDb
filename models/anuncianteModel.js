import mongoose from "mongoose";

const anuncianteSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    linkBanner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    prazo: {
        type: Number,
        required: true,
    }
});

const anuncianteModel = mongoose.model("anunciantes", anuncianteSchema);

export default anuncianteModel;
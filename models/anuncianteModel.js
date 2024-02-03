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
    title:{
        type:String,
        required:false
    },
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
    vencimento: {
        type: String,
        required: false,
    }
});

const anuncianteModel = mongoose.model("anunciantes", anuncianteSchema);
/*anuncianteModel.deleteMany({})
.then(() => {
    console.log('Documentos removidos com sucesso.');
})
.catch((err) => {
    console.error(err);
});*/

export default anuncianteModel;
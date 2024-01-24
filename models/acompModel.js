import mongoose from "mongoose";

const acompSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required:false,
        trim: true
    },
    typeAccount: [{
        type: String,
        required: false,
        default: "Acompanhante",
    }],
    fotos: [{
        type: String,
        required: [false, 'Fotos são obrigatórias. Por favor, adicione pelo menos uma foto.']
    }],
    nome: {
        type: String,
        required: [false, 'O campo Nome é obrigatório. Por favor, forneça um nome para seu perfil.']
    },
    genero:{
        type:String,
        required:[false,"Precisamos saber o seu genero para motivos de buscas"],
        trim:true
    },
    idade:{
        type:Number,
        required:[false,"Precisamos saber a sua idade para liberar o seu cadastro"],
        trim:true,
    },
    altura:{
        type:Number,
        required:[false,"Precisamos saber a sua Altura para liberar o seu cadastro"],
        trim:true,
    },
    peso:{
        type:Number,
        required:[false,"Precisamos saber a sua Peso para liberar o seu cadastro"],
        trim:true,
    },
    sobre: {
        type: String,
        required: [false, 'Sobre é obrigatório. Por favor, forneça informações sobre você.'],
        maxlength: [150, 'O campo Sobre deve ter no máximo 250 caracteres.']
    },
    caches: {
        type: Number,
        required: [false, 'O campo Caches é obrigatório.'],
        trim: true
    },
    servicos: [{
        type: String,
        required: false,
        default: "Sem serviços",
        enum: ["Anal","Beijo na Boca","Casal","Namoradinha","Fantasias",
        "Massagem erótica","Chuva Dourada","Chuva Negra","Striptease",
        "Festas","Eventos","Viagens","Anal Giratório",]
    }]
})

const acompModel = mongoose.model("acomps", acompSchema);

export default acompModel;

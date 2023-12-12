import mongoose from "mongoose";

const acompSchema = new mongoose.Schema({
    fotos: [{
        type: String,
        required: [false, 'Fotos são obrigatórias. Por favor, adicione pelo menos uma foto.']
    }],
    nome: {
        type: String,
        required: [true, 'O campo Nome é obrigatório. Por favor, forneça um nome para seu perfil.']
    },
    genero:{
      type:String,
      required:[true,"Precisamos saber o seu genero para motivos de buscas"],
      trim:true,
    },
    idade:{
      type:Number,
      required:[true,"Precisamos saber a sua idade para liberar o seu cadastro"],
      trim:true,
    },
    sobre: {
        type: String,
        required: [true, 'Sobre é obrigatório. Por favor, forneça informações sobre você.'],
        maxlength: [250, 'O campo Sobre deve ter no máximo 250 caracteres.']
    },
    caches: {
        type: Number,
        required: [true, 'O campo Caches é obrigatório.'],
        trim: true
    },
    servicos: [{
        type: String,
        required: false,
        default: "Sem serviços",
        enum: ["Anal", "Beijo na boca", "Casal", "Boquete", "Punheta",
            "Ejaculação no corpo", "Namoradinha", "Fantasias e disfarces", "Gozo Facial",
            "Dupla Penetração", "Massagem erótica"]
    }],
    servicosEspeciais: [{
        type: String,
        required: false,
        default: "Sem serviços especiais",
        enum: ["Beijo Negro", "Chuva Dourada", "Chuva Negra", "Garganta Profunda", "Sado Duro",
            "Sado Suave", "Squirting", "Striptease"]
    }]
})

const acompModel = mongoose.model("acomps", acompSchema);

export default acompModel;

import mongoose from "mongoose";
import User from "./userModel.js";

const acompSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  fotos: [
    {
      type: String,
      required: [
        false,
        "Fotos são obrigatórias. Por favor, adicione pelo menos uma foto.",
      ],
    },
  ],
  nome_tag: {
    type: String,
    required: true,
    trim: true,
  },
  nome: {
    type: String,
    required: [
      false,
      "O campo Nome é obrigatório. Por favor, forneça um nome para seu perfil.",
    ],
  },
  genero: {
    type: String,
    required: [false, "Precisamos saber o seu genero para motivos de buscas"],
    trim: true,
  },
  idade: {
    type: Number,
    required: [
      false,
      "Precisamos saber a sua idade para liberar o seu cadastro",
    ],
    trim: true,
  },
  altura: {
    type: Number,
    required: [
      false,
      "Precisamos saber a sua Altura para liberar o seu cadastro",
    ],
    trim: true,
  },
  peso: {
    type: Number,
    required: [
      false,
      "Precisamos saber a sua Peso para liberar o seu cadastro",
    ],
    trim: true,
  },
  sobre: {
    type: String,
    required: [
      false,
      "Sobre é obrigatório. Por favor, forneça informações sobre você.",
    ],
    maxlength: [150, "O campo Sobre deve ter no máximo 250 caracteres."],
  },
  caches: {
    type: Number,
    required: [false, "O campo Caches é obrigatório."],
    trim: true,
  },
  servicos: [
    {
      type: String,
      required: false,
      default: "Sem serviços",
      enum: [
        "Anal",
        "Beijo na Boca",
        "Casal",
        "Namoradinha",
        "Fantasias",
        "Massagem erótica",
        "Chuva Dourada",
        "Chuva Negra",
        "Striptease",
        "Festas",
        "Eventos",
        "Viagens",
        "Anal Giratório",
      ],
    },
  ],
});

const acompModel = mongoose.model("acomps", acompSchema);
/*acompModel.deleteMany({})
.then(() => {
    console.log('Documentos removidos com sucesso.');
})
.catch((err) => {
    console.error(err);
});*/

export default acompModel;

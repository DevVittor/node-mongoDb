import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("Users", userSchema);
/*User.deleteMany({})
.then(() => {
    console.log('Documentos removidos com sucesso.');
})
.catch((err) => {
    console.error(err);
});*/

export default User;

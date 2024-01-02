import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoria: {
    type:String,
    required:false,
  },
  slug:{
    type:String,
    required:false,
  }
});

const categoryModel = mongoose.model("categorias",categorySchema);

export default categoryModel;

import categoryModel from '../models/categoryModel.js';

class Category {

  async index(req,res){
    console.log("Página Category");
  }


  async show(req,res){
    
    const listaCategoria = await categoryModel.find().select('categoria slug');
    res.status(200).json({listCategory:listaCategoria});

  }

  async store(req,res){
    
    const {categoria, slug} = req.body;
    if(!categoria){
      return res.status(301).json({mensagem:"É necessário digitar uma categoria!"});
    }
     
    try{
      const checkCategory = await categoryModel.findOne({categoria: categoria});
      if(checkCategory){
        return res.status(301).json({mensagem:`A categoria ${categoria} já foi cadastrada no sistema`});
      }
      const newCategory = await categoryModel.create({
        categoria,
        slug
      });
      return res.status(200).json({mensagem:`Categoria ${categoria} criado com sucesso!`})

    }catch(error){
      console.log(`Não foi possível cadastrar a categoria ${categoria}`);
      return res.status(401).json({mensagem:`Não foi possível cadastrar a categoria ${categoria}`});
    }

  }

  async remove(req,res){
    const {id} = req.params;
    console.log(id);
    try{
      const removeCategory = await categoryModel.findOneAndDelete({_id: id});
      console.log(removeCategory);
      if(!removeCategory){
        res.status(404).json({mensage:"Categoria não encontrada"});

      }else{
        console.log("Categoria foi apagada!");
        res.status(200);
      }
    }catch(error){
      res.status(500).json({mensagem:`Não foi possível deletar por causa do error: ${error}`})
    }

  }

}
export default Category;

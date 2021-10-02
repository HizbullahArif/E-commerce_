import initdb from '../../../helpers/initdb';
import Product from '../../../models/Product';
initdb()

export default async (req, res)=>{
    switch(req.method){
        case 'GET':
            await getproduct(req, res);
            break;
        case 'DELETE':
            await deleteproduct(req, res);
            break;

    }
   
  }
  const getproduct = async (req, res) => {
    const {id}=req.query
    const product= await Product.findOne({_id:id})
    res.status(200).json(product);
  }


  const deleteproduct = async (req, res) => {
      const {id}=req.query
      await Product.findByIdAndDelete({_id:id})
      res.status(200).json({});
  }
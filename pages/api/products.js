import initdb from '../../helpers/initdb';
import Product from '../../models/Product';
initdb()

export default async (req, res)=> {
    switch(req.method){
        case 'GET':
            await getProducts(req,res);
            break;
        case 'POST':
            await saveProduct(req,res);
            break;
    }
  }

const getProducts = async(req,res) => {
        await Product.find().then((products)=>{
         res.status(200).json(products);
})
}

const saveProduct = async(req,res) => {
    const {pname,price,mediapicurl,desc} = req.body

    if (!pname || !price || !mediapicurl || !desc){
        console.log(pname,price,mediapicurl,desc);
        return res.status(422).json({error:"Please fill fields"});
    }

    const product =await new Product({
        name:pname,
        price:price,
        description:desc,
        mediaurl:mediapicurl
    }).save();
    
    return res.status(200).json(product);
}
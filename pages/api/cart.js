import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'






export default async(req,res)=>{
    switch(req.method) {
        case 'GET':
            await fetchUserCart(req, res)
            break;
        case 'PUT':
            await addProduct(req, res)
            break;
    }
}


function Authenticated(icomponent){
    return (req,res)=>{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({error:"You must be logged in  authroization"})
        }
        try{
            const userId=jwt.verify(authorization, process.env.JWT_SECRET)
            console.log(userId)
            req.userId=userId
            return icomponent(req,res)
        }catch(err) {
            return res.status(401).json({error:"You must be logged in try"})
        }
    }
}


const fetchUserCart = Authenticated(async(req,res) => {

    const cart = await Cart.findOne({user:req.userId})
    return res.status(200).json(cart.products)
})



const addProduct = Authenticated(async(req,res)=>{
    console.log('add product called')
    const {quantity, productId}= req.body
    const cart = await Cart.findOne({user:req.userId})
    const pexists=cart.products.some(pdoc=>productId===pdoc._id)
    if(pexists){
       await Cart.findByIdAndUpdate(
            {_id:cart._id,"products.product":productId},
            {$inc:{"products.$.quantity":quantity}}
       )
    }
    else{
        const newProduct ={quantity, product:productId}
        await Cart.findByIdAndUpdate(
            {_id:cart._id},
            {$push:{products:newProduct}}
            )
    }
    res.status(200).json({message:"Product added to cart successfully"})
})
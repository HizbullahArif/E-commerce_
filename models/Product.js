import mongoose from 'mongoose'


const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    description:{
        type:"string",
        required:true
    },

    mediaurl:{
        type:"string",
        required:true
    }

})

export default  mongoose.models.product || mongoose.model('product',productsSchema)
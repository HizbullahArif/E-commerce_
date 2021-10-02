import mongoose from "mongoose";


function initdb(){

    if (mongoose.connections[0].readyState){
        console.log("Already connected");
        return
    }

    mongoose.connect(process.env.MONGOO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log("Connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("Error Connecting",err)
    })
}

export default initdb
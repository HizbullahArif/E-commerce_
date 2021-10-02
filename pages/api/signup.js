import User from '../../models/User';
import Cart from '../../models/Cart'
import initdb from '../../helpers/initdb';
import bcrypt from 'bcryptjs'

initdb()

export default async(req,res) => {
    const {name,email,password}= req.body;
    try{
        if(!name || !email || !password) {
           return res.status(422).json({error:"Please fill all Fields"})
        }
        const user = await User.findOne({email:email})
        if(user){
            return res.status(200).json({error:"Email already exists"})
        }

        const hashpassword = await bcrypt.hash(password,12)
        const newuser = await new User({name,email,password:hashpassword}).save();

        await new Cart({user:newuser._id}).save()
        
        console.log("User created");
        console.log(newuser)
        return res.status(201).json({message:"User Registered successfully"});
    }catch(err) {
        console.log(err)
    }
}
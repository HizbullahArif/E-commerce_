import User from '../../models/User'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export default async(req,res) => {
    const {email, password} = req.body;
    try{
    if (!email || !password){
        return res.status(422).json({error:"Please fill all fields"})
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(422).json({error:"Email are not valid"})
    }
    const pass =await  bcrypt.compare(password, user.password)
    if(pass){
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        const {name,role,email}=user
        
        return res.status(201).json({token,user1:{name,email,role}})
    }
    else{
        return res.status(422).json({error:"Email or Password did not match"})
    }
}catch(err){
    console.error(err)
}

}
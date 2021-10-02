import React,{ useState} from 'react'
import {useRouter} from 'next/router'
import baseUrl from '../helpers/baseUrl'
export default function Signup() {
    const router = useRouter()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    
    const handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(name,email,password);
        const res = await fetch(`${baseUrl}/api/signup`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password})
        })
        const res2 = await res.json();
        if(res2.error){
            M.toast({html:res2.error,classes:"red"})
        }
        else{
            M.toast({html:res2.message,classes:"green"})
            router.push('/Login')
        }
    }
    return (
        <div>
        <div className="container">
        <div className="row">
            <form className="col s12" id="reg-form" onSubmit={(e)=>handleSubmit(e)}>
            <div className="row">
                <div className="input-field col s12">
                <input id="name" type="text"  required  name = "name" onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="email" className="validate" required  onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password" type="password" className="validate" minLength="6" required onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <button className="btn btn-large btn-register waves-effect waves-light" type="submit">Register
                    <i className="material-icons right">done</i>
                </button>
                </div>
            </div>
            </form>
        </div>
        
        </div>

    </div>
    )
}

import React,{ useState} from 'react'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router';
import cookie from 'js-cookie'

export default function Login() {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter()
    const handlesubmit= async (e)=>{
        e.preventDefault()
        const res = await fetch(`${baseUrl}/api/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        })
        const res2 = await res.json()
        
        if(res2.error) {
            M.toast({html:res2.error,classes:"red"})
        }else{
            console.log(typeof(res2.user1))
            cookie.set('token',res2.token)
            cookie.set('user1',JSON.stringify(res2.user1))
            console.log(typeof(JSON.parse(cookie.get('user1')))+"checking type in login")
            M.toast({html:"User logged successfully",classes:"green"})
            router.push('/')
        }
    }

    return (
        <div>
            <div className="container">
            <div className="row">
                <form className="col s12" id="reg-form" onSubmit={(e)=>handlesubmit(e)}>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" className="validate" required  onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" minLength="6" required onChange={(e)=>setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                    <button className="btn btn-large btn-register waves-effect waves-light" type="submit" name="action">Login
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




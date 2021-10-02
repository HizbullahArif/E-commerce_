import React from 'react'
import Link from 'next/link'
import {parseCookies,destroyCookie} from 'nookies'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'


export default function NAvbar() {
    const router = useRouter()
    const token = cookie.get('token')
    const user = cookie.get('user1')?JSON.parse(cookie.get('user1')) : ""
    

    const destroyCookie_ =()=>{
          destroyCookie(null, 'token')
          destroyCookie(null, 'user1')
          router.push('/')
    }

    
    function isActive(route){
        if(route == router.pathname){
            return 'active'
        }
    }
    return (
        <>
            <nav>
                <div className="nav-wrapper #2979ff blue accent-3">
                <Link href="/"><a  className="brand-logo">MYSTORE</a></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li className={isActive('/cart')}><Link href="/cart"><a>Cart</a></Link></li>
                {user.role =='admin' &&
                    <li className={isActive('/createproduct')}><Link href="/createproduct"><a>Create Product</a></Link></li>
                }

                {user?
                <>
                    <li className={isActive('/acount')}><Link href="/acount"><a>Acount</a></Link></li>
                    <li><button className="btn red" onClick={destroyCookie_}>Logout</button></li>
                </>
                :   <>
                    <li className={isActive('/Login')}><Link href="/Login"><a>Login</a></Link></li>
                    <li className={isActive('/Signup')}><Link href="/Signup"><a>SignUp</a></Link></li>
                    </>
                }
                    
                </ul>
                </div>
            </nav>
        </>
    )
}

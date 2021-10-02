import React from 'react'
import baseUrl from '../helpers/baseUrl'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

export default function cart({error}) {

    const router = useRouter()
    if(error){
        M.toast({html:error,classes:"red"})
        cookie.remove('cart')
        cookie.remove('token')
        router.push('/login')
    }

    return (
        <div>
            <h1>Cart page</h1>
        </div>
    )
}



export async function getServerSideProps(ctx){
    const token = cookie.get('token')
    if(!token){
        return {
            props:{products:[]}
        }
    }
    const res = await fetch(`${baseUrl}/api/cart`,{
        headers:{
            "Authorization":token
        }
    })
    const products = await res.json()
    console.log("products"+products)
    return {
        props:{products}
    }
   
}
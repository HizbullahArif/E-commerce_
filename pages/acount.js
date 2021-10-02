import React from 'react'
import {parseCookies} from 'nookies'
export default function acount() {
    return (
        <div>
            <h1>Welcome to acount page</h1>
        </div>
    )
}

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location:"/Login"})
        res.end()
    }
    return {
        props: {}
    }
}
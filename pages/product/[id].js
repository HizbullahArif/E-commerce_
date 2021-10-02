import React from 'react'
import baseUrl from '../../helpers/baseUrl'
import { useRef,useEffect,useState} from 'react'
import router from 'next/router'
import {parseCookies} from 'nookies'
import Link from 'next/Link'
import cookie from 'js-cookie'

export default function product({product}) {
    const modalRef = useRef(null)
    const cookies = parseCookies()
    const [quantity,setQuantity]= useState(1)
    const user = cookies.user1?JSON.parse(cookies.user1) : ""
    const token = cookie.get('token')
    const addToCart = async ()=>{
        console.log(quantity)
        const res = await fetch (`${baseUrl}/api/cart`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                quantity:quantity,
                productId:product._id,
            })
        })
        console.log("add function call")
        const res2 = await res.json()
        console.log(res2)
    }




    useEffect(()=>{
        M.Modal.init(modalRef.current)
    })
    
    const getModal=()=>{
        return <>
            <div id="modal1" className="modal" ref={modalRef}>
                <div className="modal-content">
                    <h4>{product.name}</h4>
                    <p>Are you sure you want to Delete this product</p>
                </div>
                <div className="modal-footer">
                <button className="btn waves-effect waves-light">Cancel</button>
                <button className="btn waves-effect waves-light"
                    onClick={() =>deleteproduct(product._id)}
                >Yes</button>
                </div>
            </div>

        </>
    }


    const deleteproduct= async (id) => {
        console.log("ID"+id)
        const res = await fetch (`${baseUrl}/api/post/${product._id}`,{
            method: 'DELETE',
        })
        await res.json()
        router.push('/')

    }
    return (
        <div className="container center-align">
        <h3>{product.name}</h3>
        <img src={product.mediaurl} style={{width:'30%'}}/>
        <h5>RS {product.price}</h5>
        <input 
            type="number"
            style={{width:'400px',margin:'10px'}}
            min='1'
            onChange={(e)=>setQuantity(e.target.value)}
            placeholder="Quantity"
            value={quantity}
        />
        {user?
            <button className="btn waves-effect waves-light" onClick={addToCart}><i className="material-icons right"></i>Add to cart</button>
        :            
        <button className="btn waves-effect waves-light"><i className="material-icons right"></i><Link href="/Login"><a>Login to add</a></Link></button>
        }
        <p className="left-align">{product.description}</p>
        <button data-target="modal1"  className="btn waves-effect waves-light modal-trigger">Delete<i className="material-icons left"></i></button>
        {getModal()}
        </div>
        
    )
}

export async function getServerSideProps({params:{id}}) {
    const res = await fetch(`${baseUrl}/api/post/${id}`)
    const data = await res.json()
    return {
      props: {
          product: data
      }, 
    }
  }
  
import React from 'react'
import Link from 'next/link'
import baseUrl from '../helpers/baseUrl'

export default function index({products}) {
  const productList=products.map(product =>{
      return (
            <div className="card " key={product._id}>
            <div className="card-image">
              <img className="card_len" src={product.mediaurl} />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>{product.price}</p>
            </div>
            <div className="card-action">
              <Link href={`product/${product._id}`}><a>View Product</a></Link>
            </div>
          </div>
      )
    })
  return (
    <div className="rootdev">
      {productList}
    </div>
  )
}

export async function getStaticProps(context) {
    const res= await fetch(`${baseUrl}/api/products`)
    const data= await res.json()
  return {
    props: {
      products: data
    },
  }
}
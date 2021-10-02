import React ,{ useState } from 'react';
import baseUrl from '../helpers/baseUrl'
import router from 'next/router'
import {parseCookies} from 'nookies'

export default function Createproduct() {

    const [pname,setPname]= useState();
    const [price,setPrice] = useState();
    const [mediapic,setMediapic]= useState()
    const [desc,setDesc]= useState()
    
    const handlesubmit= async(e)=>{
        e.preventDefault()
        const mediapicurl = await imageUpload()
        console.log(mediapicurl)
        const res = await fetch(`${baseUrl}/api/products`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                pname,
                price,
                mediapicurl,
                desc
            })
        })
        const res2 = await res.json()
        if (res2.error){
            M.toast({html:res2.error,classes:"red"})
        }else{
            M.toast({html:"Product Saved Successfully",classes:"red"})
        }
        router.push('/')
    }

const  imageUpload = async()=>{
        const data = new FormData();
        data.append('file',mediapic);
        data.append('upload_preset','mystore');
        data.append('cloud_name','diaveywpg')
        const res =await fetch(`https://api.cloudinary.com/v1_1/diaveywpg/image/upload`,{
            method: 'POST',
            body: data
        })
        const res2 = await res.json()
        
        return res2.url
    }
    return (
        <div className="container">
        <div className="row">
        <form className="col s12" onSubmit={(e)=>handlesubmit(e)}>
            <div className="row">
            <div className="input-field col s6">
                <input placeholder="Product Name" id="pname" type="text" name="pname" value={pname} onChange={(e) => setPname(e.target.value)}/>
                <label htmlFor="first_name">Product Name</label>
            </div>
            </div>
            <div className="row">
            <div className="input-field col s12">
                <input  value={price} placeholder="price" id="price" type="number" onChange={(e)=>{setPrice(e.target.value)}} />
                <label htmlFor="price">Price</label>
            </div>
            </div>

            <div className="row">
                <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" accept="image/*" 
                    onChange={(e)=>setMediapic(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
            </div>
            <img className="responsive-img" src={mediapic?URL.createObjectURL(mediapic):""} />
            <div className="row">
            <div className="input-field col s12">
                <input id="description" type="text" placeholder="Description" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                <label htmlFor="description">Description</label>
            </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
             <i className="material-icons right">send</i>
            </button>
        
        </form>
        </div>
        </div>
    )
}

export async function getServerSideProps(ctx){
    const cookie = parseCookies(ctx)
    const user = cookie.user1 ? JSON.parse(cookie.user1) :"";
    if(user.role !='admin'){
        const {res} = ctx
        res.writeHead(302,{Location:"/"})
        res.end()
    }
    return {
        props: {}
    }
}
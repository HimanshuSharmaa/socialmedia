import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import socialmedia from '../../freeapi/socialmedia'
import { login as storelogin } from '../../store/Authslice'

function CoverImage() {


    const [file,Setfile] = useState("")
    const navigate = useNavigate()
    const storestatus = useSelector(state=> state.auth.status)
    const [error,Seterror] = useState("")
const dispatch = useDispatch()


async function Uploadcoverimage(file){

const UploadcoverimageMsg = await socialmedia.UploadCoverImage(file)

if(UploadcoverimageMsg.success){

    console.log(UploadcoverimageMsg)
    const userdata = UploadcoverimageMsg.data
    dispatch(storelogin(userdata))
    navigate("/account")

}else{
    console.log(UploadcoverimageMsg)
    Seterror(UploadcoverimageMsg.message)
}

}


async function Runuplaodcoverimage(){

    await Uploadcoverimage(file)
    
    console.log(file)

}

if(storestatus){


    return (
        <>
      
      <div className=' text-center m-10 mt-28 text-white' >
      <h1 className=' text-white text-2xl font-semibold ' > Cover Image</h1>
      {error && <p className=' text-red-300 m-3'>{error}</p>} <br />
            <h3 className=' text-lg text-white m-2'>Upload File</h3>
            <br />
            <input type="file" accept='image/*' onChange={(e) => {
                Setfile(e.target.files[0])
            }} />
<br />
            <br />
            <button onClick={Runuplaodcoverimage} className=' bg-blue-500 rounded-md p-2 text-white' >Upload</button>

      </div>
        </>
    )

}else{


    return (
        <>
        <h1>Login first</h1>
        </>
    )

}

}

export default CoverImage
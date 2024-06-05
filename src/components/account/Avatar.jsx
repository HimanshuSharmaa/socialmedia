import React, { useState } from 'react'
import authfunctions from '../../freeapi/authfunctions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login as storelogin } from '../../store/Authslice' 
import socialmedia from '../../freeapi/socialmedia'

function Avatar() {

    const [file, Setfile] = useState("")
    const navigate = useNavigate()
    const [error, Seterror] = useState("")
    const storestatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()



    async function uploadavatar(file) {

        const UploadAvatarMsg = await authfunctions.UploadAvatar(file)

        if (UploadAvatarMsg.success){

            const GetProfileMsg = await socialmedia.GetProfile()

            if(GetProfileMsg.success){

            const userdata = GetProfileMsg.data
            console.log(userdata)
            dispatch(storelogin(userdata))
            navigate("/account")

            }

        } else {
            Seterror(UploadAvatarMsg.message)
        }

    }

    async function Runuploadavatar() {

       await uploadavatar(file)
        console.log(file)
    }

    if (storestatus) {


        return (
            <>
          
          <div className=' text-center text-white m-10 mt-28' >

          <h1 className=' text-3xl font-semibold  text-white' >Avatar</h1>
          {error && <p className=' text-red-300 m-2' >{error}</p>} <br />
                <h3 className=' m-3'>Upload File</h3>
<br />
                <input type="file" accept='image/*' onChange={(e) => {
                    Setfile(e.target.files[0])
                }} />
<br />
                <br />
                <button onClick={Runuploadavatar} className=' bg-white rounded-md text-blue-500
                hover:bg-gray-400 hover:text-white p-2'>Upload</button>

          </div>

            </>
        )

    } else {
        return (
            <h1>Login First</h1>
        )
    }


}

export default Avatar
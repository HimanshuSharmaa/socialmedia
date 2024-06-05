import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import authfunctions from '../../freeapi/authfunctions'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const [error,Seterror] = useState("")
    const [oldPassword,SetoldPassword] = useState("")
    const [newPassword,SetnewPassword] = useState("")
    const storeuserstatus = useSelector(state=> state.auth.status)
    const navigate = useNavigate()
    


    async function changepassword({oldPassword,newPassword}){

        Seterror("")
        const ChangedPassword = await authfunctions.ChangePassword({oldPassword,newPassword})

        if(ChangedPassword.success){
           alert('password Changed')
           navigate("/account")
        }else{
            Seterror(ChangedPassword.message)
        }

        console.log(ChangedPassword.message)

    }



    async function Runchangepassword(){

        await changepassword({oldPassword,newPassword})

    }



    if(storeuserstatus){

        return (
            <>


<div className=' text-center m-10 mt-28' >
<h1 className=' text-4xl text-gray-800 my-10 font-bold' >Change Password</h1>
            
            {error && <p className=' text-red-300 m-5' >{error}</p>}
            <br />

            
            <input type="text" className=' p-2 rounded-md' placeholder='Enter Old Password' onChange={(e)=> SetoldPassword(e.target.value)} />
            <br />
            <br />
            <input type="text" className=' p-2 rounded-md' placeholder='Enter New Password' onChange={(e)=> SetnewPassword(e.target.value)} />
            <br />
            <br />
            <button onClick={Runchangepassword} className=' bg-blue-500 text-white rounded-md p-2' >Change Password</button>

<br /><br />
</div>
            </>
            
              )

    }else{

        return(

<>
<br /><br />
<hr />
<h1>Login First</h1>
<hr />
<br /><br />


</>

        )

    }


  
}

export default ChangePassword
import React from 'react'
import authfunctions from '../../freeapi/authfunctions'
import { useDispatch, useSelector } from "react-redux"
import { login as storelogin } from '../../store/Authslice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import socialmedia from '../../freeapi/socialmedia'


function Login() {


    const [error, Seterror] = useState("")
    const [loading,Setloading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, Setusername] = useState("")
    const [password, Setpassword] = useState("")

    async function login({ username, password }) {
        Seterror("")
        Setloading(true)

            const AccLogined = await authfunctions.LoginAccount({ username, password })

        if (AccLogined.success) {

            localStorage.removeItem('accessToken')
            localStorage.setItem('accessToken', `${AccLogined.data.accessToken}`)

            // const userdata = await authfunctions.GetCurrentAccount(AccLogined.data.accessToken)
            const userdata = await socialmedia.GetProfile()


            if (userdata.success) {

                dispatch(storelogin(userdata.data))
                Setloading(false)
               navigate("/")
    }

}else{
    console.log(AccLogined)
Seterror(AccLogined.message)
Setloading(false)
}

    }


    async function Runlogin() {

        login({ username, password })

    }

    return (
        <div className=' bg-gray-800 text-center w-80 md:w-96 m-auto my-32  border-2 rounded-2xl  ' >
            
            <h1 className='p-5 text-white text-4xl font-semibold'>Login</h1>
            <p className='m-5 text-white' >Don't have an Account? <Link className=' text-blue-400' to={"/signup"}>Signup</Link></p>

            {error && <p className='text-red-300' >{error}</p>}

            {/* {loading?"Loging in..." :"" } */}
            
            <br />

            <input className=' p-2 rounded-lg'  type="text" value={username} placeholder='enter username' required

                onChange={(e) => Setusername(e.target.value)}

            />
            <br />
            <br />
            <input  className=' p-2 rounded-lg' type="password" value={password} placeholder='enter password' required onChange={(e) => Setpassword(e.target.value)} />
            <br />
            <br />

            {loading?<p className=' text-2xl text-white' >Logging in...</p> :<><button className='  bg-blue-500 w-36 text-white text-sm p-3 rounded-lg' onClick={Runlogin} >Login</button></> }
            {/* <button onClick={Runlogin} >Login</button> */}





            <br />
            <br />
        </div>
    )
}

export default Login
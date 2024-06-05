import React, { useState } from 'react'
import authfunctions from '../../freeapi/authfunctions'
import { useDispatch, useSelector } from "react-redux"
import { login as storelogin } from '../../store/Authslice'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {

    const [error, Seterror] = useState("")
    const [loading,Setloading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, Setusername] = useState("")
    const [email, Setemail] = useState("")
    const [role, Setrole] = useState("ADMIN")
    const [password, Setpassword] = useState("")


    async function signup({ email, password, role, username }) {
        Seterror("")
        Setloading(true)
        const AccCreated = await authfunctions.CreateAccount({ email, password, role, username })
        if (AccCreated.success) {
            const AccLogined = await authfunctions.LoginAccount({ username, password })
            localStorage.removeItem('accessToken')
            localStorage.setItem('accessToken', `${AccLogined.data.accessToken}`)
            if (AccLogined.success) {
                const userdata = await authfunctions.GetCurrentAccount(AccLogined.data.accessToken)
                if (userdata.success) {
                    dispatch(storelogin(userdata.data))
                    Setloading(false)
                    navigate("/")
                }
            }
        } else {
            Seterror(AccCreated.message)
            Setloading(false)
        }

    }

    function RunSignup() {
        signup({ email, password, role, username })
    }





    return (
        <div className=' bg-gray-800 text-center w-80 md:w-96 m-auto my-32  border-2 rounded-2xl ' >
            
            <h1 className=' m-5 text-white text-4xl font-semibold' >Signup</h1>
            <p className='m-5 text-white' >Already have an Account? <Link className=' text-blue-400' to={"/login"}>Login</Link></p>

            {error && <p className=' text-red-300 m-4 '  >{error}</p>}

            <input className=' p-2 rounded-lg' type="text" value={username} placeholder='enter username' required

                onChange={(e) => Setusername(e.target.value)}

            />
            <br />
            <br />
            <input className=' p-2 rounded-lg' type="email" value={email} placeholder='enter email' required
                onChange={(e) => Setemail(e.target.value)} />
            <br />
            <br />
            <input className=' p-2 rounded-lg' type="text" value={role} placeholder='enter role eg. ADMIN' required
                onChange={(e) => Setrole(e.target.value)} />
            <br />
            <br />
            <input className=' p-2 rounded-lg' type="password" value={password} placeholder='enter password' required onChange={(e) => Setpassword(e.target.value)} />
            <br />
            <br />

            {loading? <p className=' text-2xl text-white' >Signing up...</p> : <><button className='  bg-blue-500 w-36 text-white text-sm p-3 rounded-lg' onClick={RunSignup} >Create Account</button></>}




            <br />
            <br />

        </div>
    )
}

export default Signup

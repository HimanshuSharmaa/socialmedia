import React from 'react'
import authfunctions from '../../freeapi/authfunctions'
import { useSelector, useDispatch } from 'react-redux'
import { logout as storelogout } from '../../store/Authslice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Logout() {

   const dispatch = useDispatch()
   const accessToken = localStorage.getItem('accessToken')
   const navigate = useNavigate()

   async function logout(accessToken) {

      const LogoutMsg = await authfunctions.LogOutAccount(accessToken
      )
      if (LogoutMsg.success) {

         dispatch(storelogout())
         navigate("/")
         localStorage.removeItem('accessToken')
      }


   }

   async function RunLogout() {

      await logout(accessToken)

   }


   return (
     <>
      {/* <button onClick={RunLogout} >Logout</button> */}
      <Link  onClick={RunLogout}  >Logout</Link>
      </>

   )
}

export default Logout
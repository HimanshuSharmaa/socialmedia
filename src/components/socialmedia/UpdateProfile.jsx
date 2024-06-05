import React, { useState } from 'react'
import socialmedia from '../../freeapi/socialmedia'
import { useDispatch, useSelector } from 'react-redux'
import { login as storelogin } from '../../store/Authslice'
import {useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Profile() {

    const [bio,Setbio] = useState("")
    const [countryCode,SetcountryCode] = useState("")
    const [dob,Setdob]= useState("")
    const [firstName,SetfirstName] = useState("")
    const [lastName,SetlastName] = useState("")
    const [location,Setlocation] = useState("")
    const [phoneNumber,SetphoneNumber] = useState("")
    const [error,Seterror] = useState("")
    const [loading,Setloading] = useState(false)
    const storestatus = useSelector(state=>state.auth.status)
    const storeuserdata = useSelector(state=> state.auth.userdata)
    const dispatch = useDispatch()
    const navigate = useNavigate()


  

    async function UpdateProfile({bio,countryCode,dob,firstName,lastName,location,phoneNumber}){
        Seterror("")
        Setloading(true)

        const UpdateProfileMsg = await socialmedia.UpdateProfile({bio,countryCode,dob,firstName,lastName,location,phoneNumber})

        if(UpdateProfileMsg.success){

            console.log(UpdateProfileMsg)
            const userdata = UpdateProfileMsg.data
            dispatch(storelogin(userdata))
            Setloading(false)
            navigate("/account")

        }else{
            Seterror(UpdateProfileMsg.message)
            Setloading(false)
        }
    }

    async function Runupdateprofile(){

      await UpdateProfile({bio,countryCode,dob,firstName,lastName,location,phoneNumber})

    }



    if(storestatus){ 
      
      
    
      useEffect(() => {
        if (storeuserdata.account && storeuserdata.account !== null) {
          Setbio(storeuserdata.bio)
          SetcountryCode(storeuserdata.countryCode)
          Setdob(storeuserdata.dob)
          SetfirstName(storeuserdata.firstName)
          SetlastName(storeuserdata.lastName)
          Setlocation(storeuserdata.location)
          SetphoneNumber(storeuserdata.phoneNumber)
          
        }
      }, [storeuserdata]);
      


  return (
    <>
    
    <h1 className='  text-5xl text-center font-bold mt-28 mb-10' >Profile Info</h1>

   <div className=' p-5 text-center text-gray-800 backdrop-blur-3xl bg-opacity-45 bg-white  md:p-10  md:w-2/3 mx-5 md:mx-auto border-2 rounded-2xl '  > 
    
   Bio <br /> <input className=' text-black p-2 rounded-md' type="text" placeholder='enter bio' value={bio!=""?bio:""}  onChange={(e)=> Setbio(e.target.value)  }/>
    <br />
    <br /> 
   Country Code <br /> <input className=' text-black p-2 rounded-md' type="text" placeholder='enter country code' value={countryCode!=""?countryCode:""} onChange={(e)=> SetcountryCode(e.target.value)}/>
    <br /> <br />
    Dob <br /> <input className=' text-black p-2 rounded-md' type="text" placeholder='yyyy-mm-dd' value={dob!=""?dob:""} onChange={(e)=> Setdob(e.target.value)}/>
    <br /> <br />
    First Name <br />
    <input className=' text-black p-2 rounded-md' type="text" placeholder='enter first name' value={firstName!=""?firstName:""} onChange={(e)=> SetfirstName(e.target.value)}/>
    <br /> <br />
    Last Name <br />
    <input className=' text-black p-2 rounded-md' type="text" placeholder='enter last name' value={lastName!=""?lastName:""} onChange={(e)=> SetlastName(e.target.value)}/>
    <br /> <br />
    Location <br />
    <input className=' text-black p-2 rounded-md' type="text" placeholder='enter location' value={location!=""?location:""} onChange={(e)=> Setlocation(e.target.value)}/>
    <br /> <br />
    Phone no. <br />
    <input className=' text-black p-2 rounded-md' type="text" placeholder='enter phone no.' value={phoneNumber!=""?phoneNumber:""} onChange={(e)=> SetphoneNumber(e.target.value)}/>
    <br /> <br />
    
    {loading? "Updating...." :<><button onClick={Runupdateprofile}  className=' bg-blue-500 p-2 text-white rounded-md'>Update</button></>}
    
   </div>
    
    </>
      )
    }else{

      return(
        <>
        <h1>Login First</h1>
        </>
      )
    }

}

export default Profile
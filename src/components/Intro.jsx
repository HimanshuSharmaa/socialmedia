import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Intro() {

   const state = localStorage.getItem('msgstatus')

   const [intro,Setintro] = useState(false)

   const userstatus = useSelector(state => state.auth.status)
    

   if(!userstatus){

    if(!state){
        return (
   
            <>
            
        
        <div className=' flex justify-center w-full' >
        
        
        <div style={{zIndex:1}} className='fixed m-3 text-white p-5 rounded-3xl h-4/5 backdrop-blur-3xl bg-opacity-15 bg-white mt-20    ' >
        
        <h1 className=' text-4xl font-bold' >Social Media.....</h1>
    
        <p className=' m-2  ' >
            This is a Social Media Project build using React 
          
            in this Project Social Media {"(Free API)"} is handelled.
            <br />
            <br /> This project includes :
            <br />
            React router ✅
            <br />
            React redux toolkit ✅
            <br />
            Tailwind ✅
            <br />
            React hooks ✅
            and other important things.
            <br />
            <br />
           
            the social media API mainly includes:
            <br />
            Authentication: {"(Signup , Login , Logout , Change password)"}
            <br />
            Account: {"(Uplaod avatar , Uplaod cover Image , user bio )"}
            <br />
            Social Media: {"(Share posts, Like , Comment , Delete posts , Bookmark Posts etc.)"}
            <br />
            this project is not yet completed And i am wokring on it.


        </p>
        
        <br />
        <button onClick={()=>{
            localStorage.setItem('msgstatus',true)
            Setintro(localStorage.getItem('msgstatus'))
            
        }}  className=' m-auto align-bottom bg-blue-500 p-3 rounded-lg hover:bg-gray-500' >Go Ahead</button>
        
        </div>
        
        
        </div>
        
            </>
          )
    }
   }


}

export default Intro

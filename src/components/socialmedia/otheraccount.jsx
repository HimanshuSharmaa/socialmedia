import React, { useEffect, useState } from 'react'
import socialmedia from '../../freeapi/socialmedia'
import { useNavigate, useParams } from 'react-router-dom'
import Post from './Post'
import { useSelector } from 'react-redux'

function Otheraccount(){

const {username} = useParams()
const [userdata,Setuserdata] = useState(undefined)
const [posts,Setposts] = useState([])
const storeuserdata = useSelector(state => state.auth.userdata)
const navigate = useNavigate()

async function getprofile(username){

    const getprofileMsg = await socialmedia.Getprofilebyusername(username)
    
    Setuserdata(getprofileMsg)

}

async function getposts(username){

  const getpostsMsg = await socialmedia.GetPostsbyUsername(username)

  Setposts(getpostsMsg.data.posts)

}

useEffect(()=>{

  getprofile(username)
  getposts(username)




},[username])

// console.log(storeuserdata.account.username)

if(userdata!=undefined){


  if(storeuserdata != null && storeuserdata.account.username == userdata.data.account.username ){
    navigate("/account")
  }else{

  return (
    <>
    <div className='  w-full ' > 
          <div className=' mt-14 w-full h-60' style={{backgroundImage:`url(${userdata.data.coverImage.url})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}} >
         
          </div>

          <br />
 

          <div className=' flex justify-center m-2' >
            <div className='text-center'>
              <img className=' w-40 min-w-28 -mt-20 mb-3 md:mb-3' src={userdata.data.account.avatar.url} alt="" />

            </div>

            <div className=' text-sm md:text-lg md:mx-10 text-white ml-2 '>
              <b>{userdata.data.account.username}</b>
              <br />
              <span className='' > {`following: ${userdata.data.followersCount}`} {" "} {`followers: ${userdata.data.followingCount}`}</span>
              <br />
              {userdata.data.bio}
              <br />
              {userdata.data.account.email}
            </div>

          </div>

<br />

<p className=' text-center text-2xl text-white font-bold' >Post By Himanshu Sharma</p>

<br />

{posts.length!=0?<> <div className=' flex flex-wrap justify-center '>
        {posts.map((eachpost) => (

<div 
className=' text-center w-3/3 max-w-lg mb-5'
  key={eachpost._id} >

  <Post eachpost={eachpost} />
  {/* {eachpost.author._id == storeuserdata._id ?<><button onClick={()=>{deletepost(eachpost._id)}} className='bg-white p-1 rounded-md mb-4 text-blue-500' >Delete Post</button></>:null} */}
</div>

))}
        </div></>
        :
        <>
        <h1 className=' text-center text-2xl m-5 text-white' ><b>No post Yet</b></h1>
          <div className=' text-center bg-white md:m-2 hover:text-white md:mx-auto m-1 mx-auto hover:bg-gray-500 w-52 p-2 rounded-lg text-blue-500 '  >
              <Link to={"/createpost"} >Share a post ➤</Link>
            </div>
        </>}


</div>

</>

  )
  }

        }
}

export default Otheraccount
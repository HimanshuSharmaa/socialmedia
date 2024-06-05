import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import socialmedia from '../../freeapi/socialmedia'
import Post from '../socialmedia/Post'



function Account() {

  const storeuserdata = useSelector(state => state.auth.userdata)
  const storestatus = useSelector(state => state.auth.status)
  const [username, Setusername] = useState("")
  const [email, Setemail] = useState("")
  const [profileurl, Setprofileurl] = useState("")
  const [bio, Setbio] = useState("")
  const [coverimageurl, Setcoverimage] = useState("")
  const [following, Setfollowing] = useState("")
  const [followers, Setfollowers] = useState("")
  const [posts, Setposts] = useState([])


  if (storestatus) {



    useEffect(() => {
      if (storeuserdata.account && storeuserdata.account !== null) {
        Setusername(storeuserdata.account.username);
        Setemail(storeuserdata.account.email);
        Setprofileurl(storeuserdata.account.avatar.url);
        Setbio(storeuserdata.bio)
        Setcoverimage(storeuserdata.coverImage.url)
        Setfollowers(storeuserdata.followersCount)
        Setfollowing(storeuserdata.followingCount)
      } else {
        Setusername(storeuserdata.username);
        Setemail(storeuserdata.email);
        Setprofileurl(storeuserdata.avatar.url);
      }
    }, [storeuserdata]);


    async function Myposts() {

      const MypostsMsg = await socialmedia.GetMyPosts()

      if (MypostsMsg.success) {

        Setposts(MypostsMsg.data.posts)

      }
      console.log(MypostsMsg.data.posts)

    }

    useEffect(() => {
      Myposts()
    }, [])


    async function deletepost(postid) {

      const ans = confirm("Delete Post Cannot be undone Are You Sure")

      if (ans) {
        const deletepostMsg = await socialmedia.DeletePostbyId(postid)

        if (deletepostMsg.success) {
          Myposts()
        }

      }

    }

    return (
      <>

        <div className='  w-full '
        > 
          <div className=' mt-14 w-full h-60' style={{backgroundImage:`url(${coverimageurl})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}} >
            {/* <img className=' w-screen h-60 bg-contain' src={coverimageurl} alt="" /> */}
         
          </div>

          <div className=' text-right -mt-8 mx-1   ' >

            <Link className=' text-blue-500 hover:text-white rounded-md bg-white p-2 hover:bg-gray-500' to={"/coverimage"}>Update Cover Image</Link>
          </div>

          <br />

          <div className=' flex justify-center m-2' >
            <div className='text-center'>
              <img className=' w-40 min-w-28 -mt-20 mb-3 md:mb-3' src={profileurl} alt="" />
              <Link className=' hover:text-white p-2 text-blue-500  rounded-md  hover:bg-gray-500  bg-white  z-0' to="/avatar">Update Avatar</Link>

            </div>

            <div className=' text-sm md:text-lg md:mx-10 text-white ml-2 '>
              <b>{username}</b>
              <br />
              <span className='' > {`following: ${following}`} {" "} {`followers: ${followers}`}</span>
              <br />
              {bio}
              <br />
              {email}
            </div>

          </div>




          <div className=' bg-white text-center p-10 mt-9 mb-5 text-md flex justify-evenly flex-wrap backdrop-blur-3xl bg-opacity-45 m-5 rounded-lg ' >

            <div >
              <Link className='bg-white md:m-2 m-1 hover:bg-gray-500 w-52 p-2  hover:text-white rounded-lg text-blue-500 ' to={"/createpost"} >Share a post ➤</Link>
            </div>
            <div >
              <Link className='bg-white md:m-2 m-1 hover:bg-gray-500 w-52 p-2  hover:text-white rounded-lg text-blue-500 ' to={"/updateprofile"} >UpdateProfile ⚙️</Link>

            </div>
            <div >
              <Link className='bg-white md:m-2 m-1 hover:bg-gray-500 w-52 p-2  hover:text-white rounded-lg text-blue-500 ' to={"/bookmarked"}>Book Marked ✅</Link>
            </div>
            <div>
              <Link className='bg-white md:m-2 m-1 hover:bg-gray-500 w-52 p-2  hover:text-white rounded-lg text-blue-500 ' to={"/changepassword"}>change password 🔒</Link>

            </div>
            <div className=' text-white font-extrabold text-2xl' >
              <  Logout /> ⤼
            </div>
          </div>


          <h2 className=' text-center mt-14 mb-5 text-4xl text-gray-800 font-bold' >My posts</h2>
          <br />
        
       {posts.length!=0?<> <div className=' flex flex-wrap justify-center '>
        {posts.map((eachpost) => (

<div 
className=' text-center w-3/3 max-w-lg mb-5'
  key={eachpost._id} >

  <Post eachpost={eachpost} />
  {eachpost.author._id == storeuserdata._id ?<><button onClick={()=>{deletepost(eachpost._id)}} className='bg-white p-1 rounded-md mb-4 text-blue-500' >Delete Post</button></>:null}
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
  } else {

    return (
      <><h1>Login first</h1></>
    )

  }

}

export default Account
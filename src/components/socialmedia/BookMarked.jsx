import React, { useEffect, useState } from 'react'
import socialmedia from '../../freeapi/socialmedia'
import Post from './Post'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function BookMarked() {

    const [posts,SetPosts] = useState([])

    const [suc,Setsuc] = useState(false)
    const storeuserdata = useSelector(state=> state.auth.userdata)

    useEffect(()=>{

      bookmarked()
    },[])

    async function bookmarked(){

        const bookmarkedMsg = await socialmedia.BookMarkPosts()

        SetPosts(bookmarkedMsg.data.bookmarkedPosts)
        Setsuc(bookmarkedMsg.success)
        console.log(bookmarkedMsg)


    }

    

    if(suc){

  
      if(posts.length!= 0){
        return (
          <>
       
           <h2 className=' text-center mb-10 mt-28 text-4xl text-gray-800 font-bold' >My BookMarked posts</h2>
           <br />
         
         <div className=' flex flex-wrap justify-center '>
         {posts.map((eachpost) => (
       
       <div 
       className=' text-center w-3/3 max-w-lg mb-5'
       key={eachpost._id} >
       
       <Post eachpost={eachpost} />
       {eachpost.author._id == storeuserdata._id ?<><button onClick={()=>{deletepost(eachpost._id)}} className=' bg-blue-500 p-1 rounded-md mb-4 text-white' >Delete Post</button></>:null}
       </div>
       
       ))}
         </div>
         </>
         )
      }else{
        return (<>
         <h2 className=' text-center text-2xl text-white font-bold mt-28' >My BookMarked posts</h2>
           <br />
<br />
           <h2 className=' text-center -mb-5 text-2xl text-white font-bold' >No Post Bookmarked</h2>
           <br />

           <div className=' text-center m-10' >
           <Link className=' text-red-300 text-2xl ' to={"/"} >See Posts</Link>
           </div>
        
        </>)
      }

    }else{

      return <><h2 className=' text-2xl text-white text-center m-10 mt-28'> unable to get your book marked Posts</h2></>

    }

    

}

export default BookMarked
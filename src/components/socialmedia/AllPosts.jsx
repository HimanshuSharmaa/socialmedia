import React, { useEffect } from 'react'
import { useState } from 'react'
import socialmedia, { SocialMedia } from '../../freeapi/socialmedia'
import { useSelector } from 'react-redux'
import LikeBookComment from './Likebookcomment'
import Post from './Post'

function AllPosts() {

    const [posts, Setposts] = useState([])



    // const [revposts,Setrevposts] = useState(posts.slice().reverse())


    async function Getallposts() {

        const GetallpostsMsg = await socialmedia.GetAllPosts()

        console.log(GetallpostsMsg)
        if (GetallpostsMsg.success) {
            Setposts(GetallpostsMsg.data.posts.slice().reverse())
        } else {
            console.log(GetallpostsMsg)
        }

        return GetallpostsMsg

    }


    useEffect(() => {
        Getallposts()
    }, [])


    return (

        <>

            <div className='' >

                {posts.map((eachpost) => 
                (

                    <div className=' w-3/3 max-w-lg ' key={eachpost._id} >
                        
                        <Post eachpost={eachpost} />

                    </div>

                )
                )}


            </div>
        
        
        </>

    )

    
}

export default AllPosts
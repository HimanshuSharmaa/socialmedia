import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LikeBookComment from './Likebookcomment'


function Post({ eachpost }) {

  const storestatus = useSelector(state => state.auth.status)

  return (
    <>

      <div className='m-5' key={eachpost._id} >

       <Link to={`/otheraccount/${eachpost.author.account.username}`}> <div className=' bg-gray-800 text-left p-2 text-white' >{eachpost.author.account.username}</div></Link>
        <img src={eachpost.images[0].url} alt="" />

        <div className=' text-center bg-gray-800 text-white p-2 ' >
          {storestatus ? (<>

            <LikeBookComment postId={eachpost._id} />

          </>) : "login to 🩷 💬 ✅"
          }
        </div>

        <div  className=' text-center bg-gray-800 text-white pt-2 pb-4'>
          {eachpost.content}
          </div>

         

      </div>

    </>
  )
}

export default Post
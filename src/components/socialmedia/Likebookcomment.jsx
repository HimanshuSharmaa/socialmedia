import React, { useEffect, useState } from 'react'
import socialmedia from '../../freeapi/socialmedia'
import { useSelector } from 'react-redux'



function LikeBookComment({ postId }) {

    const [commentbox, Setcommentbox] = useState(false)
    const [commentscount, Setcommentscount] = useState(0)
    const [comments, Setcomments] = useState([])
    const [like, Setlike] = useState(null)
    const [likecount, Setlikecount] = useState(0)
    // const [commentlike,Setcommentslike] = useState(false)
    const [bookmark, Setbookmark] = useState(false)
    const [content, Setcontent] = useState("")
    const storeuserdata = useSelector(state => state.auth.userdata)



    async function eachpost() {
        const eachpost = await socialmedia.GetPostbyId(postId)
        Setlike(eachpost.data.isLiked)
        Setbookmark(eachpost.data.isBookmarked)
        Setlikecount(eachpost.data.likes)
        Setcommentscount(eachpost.data.comments)
    }

    useEffect(() => {
        eachpost()
    }, [])


    async function likeunlike() {

        const likeunlikeMsg = await socialmedia.LikeUnlike(postId)
        const eachpost = await socialmedia.GetPostbyId(postId)
        Setlike(eachpost.data.isLiked)
        Setlikecount(eachpost.data.likes)

    }

    async function commentlikeunlike(commentid) {

        const commentlikeunlikeMsg = await socialmedia.LikeUnlikeComment(commentid)

        getcomments(postId)


    }

    async function bookmarked() {

        const bookmarkMsg = await socialmedia.BookMark(postId)
        const eachpost = await socialmedia.GetPostbyId(postId)
        Setbookmark(eachpost.data.isBookmarked)

    }

    async function Addcomment() {

        const AddcommentMsg = await socialmedia.AddComment(content, postId)

        if (AddcommentMsg.success) {
            const eachpost = await socialmedia.GetPostbyId(postId)
            Setcommentscount(eachpost.data.comments)
            Setcontent("")
        }


    }

    async function getcomments() {

        const getcommentsMsg = await socialmedia.GetComment(postId)
        if (getcommentsMsg.success) {

            if (getcommentsMsg.data.comments != 0) {
                console.log("have comments")
                console.log(getcommentsMsg.data.comments)
                Setcomments(getcommentsMsg.data.comments)
            } else {
                Setcomments([])
            }
        }
    }

    async function deletecomment(commentid) {


        const deletecommentMsg = await socialmedia.DeleteComment(commentid)

        if (deletecommentMsg.success) {

            await getcomments()
            const eachpost = await socialmedia.GetPostbyId(postId)
            Setcommentscount(eachpost.data.comments)

        }


    }



    return (

        <>
            <div className=' bg-gray-700 text-xl p-2 rounded-lg' >

                <button className=' mx-5' onClick={() => { likeunlike() }}>{like ? `🩷: ${likecount}` : `🖤 : ${likecount}`}</button>
                {/* {" | "} */}
                <button className=' mx-5' onClick={async () => { Setcommentbox(!commentbox), await getcomments() }} >💬 : {commentscount}</button>
                {/* {" | "} */}
                <button className=' mx-5' onClick={() => { bookmarked() }}>{bookmark ? "✅ Saved" : "❌ Save"}</button>


                {commentbox ?
                    (<> <br /> <input className=' mt-5 rounded-lg text-sm p-2 text-black ' type="text" placeholder='enter comment' value={content} onChange={(e) => Setcontent(e.target.value)} />
                        <br />
                        {content != "" ? <><br /> <button className=' bg-blue-500 text-sm p-3 rounded-lg'  onClick={async () => { await Addcomment(), await getcomments() }} >Add Comment</button>
                            <br />
                        </> : null}
                        <br />

                        {comments.length != 0 ? <>
                            {comments.map((comment) => (
                                <div className=' bg-gray-600 text-md p-2 m-1 rounded-lg ' key={comment._id} >

<div className=' text-sm text-right' >
   ~ {comment.author.account.username}
    </div>

                                  <div className=' text-white text-center p-2' >
                                  {comment.content}
                            

                                  
                                  <span className='m-5 '>
                                  <button onClick={() => commentlikeunlike(comment._id)} >{comment.isLiked ? `🩷 : ${comment.likes}` : `🖤 : ${comment.likes}`}</button>
                                  </span>
                                 
                                    {comment.author._id == storeuserdata._id ?
                                        <>
                                            <button onClick={() => { deletecomment(comment._id) }} >🗑️</button>
                                        </>
                                        : null}
                                              </div>
                                </div>
                            ))}
                        </>
                            : "Be First To Comment"}

                    </>)

                    : null}



            </div>
        </>
    )

}

export default LikeBookComment
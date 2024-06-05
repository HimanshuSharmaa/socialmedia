import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import socialmedia from '../../freeapi/socialmedia'
import { useNavigate } from 'react-router-dom'
function CreatePost() {

    const [content, Setcontent] = useState("")
    const [image, Setimage] = useState("")
    const [tags, Settags] = useState([])
    const [tag, Settag] = useState("")
    const [error, Seterror] = useState("")
    const storestatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()


    async function Createpost(content, image, tags) {

        const CreatePostMsg = await socialmedia.CreatePost(content, image, tags)

        if (CreatePostMsg.success) {
            console.log(CreatePostMsg)
            navigate("/")
        } else {
            Seterror(CreatePostMsg.message)

        }

    }

    async function Runcreatepost() {

        await Createpost(content, image, tags)

    }



    function addtag(tag) {

        Settags([...tags, tag])
        Settag("")
    }

    if (storestatus) {

        return (
            <>

<h1 className=' text-5xl font-semibold mb-0 text-center mt-32 ' >Create Post</h1>
                <div className=' text-center border-2 rounded-2xl mx-4 my-5 
                 backdrop-blur-3xl bg-opacity-45 bg-white text-gray-800 p-3 md:w-2/3 md:mx-auto' >

<br />
                    {error && <p className=' text-red-300 m-4 '>{error}</p>}
                   <div  > <h3 className=' text-2xl ' ><b>Select image</b></h3>
                   <br />
                    <input type="file" accept='image/*' onChange={(e) => Setimage(e.target.files[0])} /></div>
                   
                   <div className=' my-5' >
<br />
                   <h3 className=' text-2xl '><b>Write Content</b></h3>
                    <br />
                    <textarea className='text-black p-2 md:w-96 rounded-md h-60 ' type="text" placeholder='Enter Content' onChange={(e) => Setcontent(e.target.value)} />
                   </div>
<br />
<div className=' '>
<h3 className=' text-2xl '><b>Enter Tags</b></h3>
<br />
                    <input className= 'p-2 rounded-md text-black' type="text" placeholder='Enter tags' value={tag} onChange={(e) => Settag(e.target.value)} /> {" "}
                    {tag != "" ? (<><button className=' bg-blue-500 p-2  m-3 rounded-md' onClick={() => addtag(tag)} >Add Tag</button></>) : ""}
                    <br /><br />
                    {tags.length != 0 ? `Tags Added :${tags}` : "No Tag Added"}
                    <br /><br />

</div>


                    <button onClick={Runcreatepost} className=' bg-blue-500 text-white mb-20 p-2 rounded-md ' >Create Post</button>


                </div>


            </>

        )

    } else {
        return (
            <>Login First</>
        )
    }
}

export default CreatePost
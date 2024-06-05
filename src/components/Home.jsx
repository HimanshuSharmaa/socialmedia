import React, { useState } from 'react'
import AllPosts from './socialmedia/AllPosts'
import { useSelector } from 'react-redux'
import Intro from './Intro'

function Home() {

  const storestatus = useSelector(state => state.auth.status)

  if (!storestatus) {
    localStorage.removeItem('accessToken')
  }

  return (
    <>

      <Intro />
      <div className=' flex justify-center' >
        <div className=' h-screen overflow-scroll backdrop-blur-1xl p-1 bg-white bg-opacity-15 rounded-3xl min-w-96 m-3 md:mr-0 mt-20 ' >
          <div  >
            <AllPosts />
          </div>
        </div>
        <div
          className=' mt-20 m-3 sm:ml-0 md:m-3 h-2/3 md:mt-20 text-sm lg:text-lg  p-4 lg:p-7 w-2/4 max-w-2/4 text-white  rounded-2xl bg-gray-800 hidden sm:block  backdrop-blur-1xl bg-opacity-55 justify-center' >

          <p className=' font-bold  text-5xl ' >Hey!...</p>
          <br />

          <p className=' text-center' >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, quia voluptas ipsum amet in odio unde cum exercitationem perspiciatis a perferendis adipisci, labore dicta, similique atque consequatur. Corporis esse itaque velit facilis fuga labore suscipit sed ex explicabo laborum inventore quidem quod, aut excepturi. Nihil exercitationem ratione recusandae id neque!
          </p>
          <br />
          <hr />
          <br />
          <p className=' text-center' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa et mollitia nihil, minus autem cupiditate molestias hic dolores dolor minima inventore. Expedita, cumque dolorum aspernatur pariatur numquam id accusamus minima natus veniam quae eveniet nobis dolor rem veritatis ad suscipit tempore cum, ipsa ex temporibus excepturi porro commodi? Quia, dolores.</p>

       

          <p className=' text-center   sm:mt-10 sm:text-2xl md:text-4xl' >Like! 🩷
         <br />
         <br />
            Comment! 💬
            <br />
         <br />
            Save! ✅
          </p>
          <br /><br />

          <p className=' text-center'>By~ Himanshu Sharma</p>
        </div>
      </div>

<div className=' m-5 p-16 backdrop-blur-1xl bg-opacity-55 text-center rounded-3xl bg-white' >
 <p className='  text-5xl  text-white font-extrabold' >Project....</p>
</div>
    </>
  )

}

export default Home

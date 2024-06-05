import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  const storestatus = useSelector(state=> state.auth.status)


return(

  <>
  <div style={{zIndex:1}}  className=' w-full fixed top-0 p-4 text-right bg-gray-800 text-white border-b-2' >
<nav>

<Link className='p-5' to={"/"}>Home</Link>
{" "}
  
  {storestatus? 
 (
  <>
  {" "}
  <Link className='p-5' to={"/account"}>Account</Link>
  {" "}
  <Link className=' p-5' to={"/createpost"} >Share Post +</Link>
  </>
 )
  :(<>

<Link className='p-5' to={"/signup"} >Signup</Link>
{" "}
<Link className='p-5' to={"/login"} >Login</Link>
{" "}

  </>)
  }
  
  
  </nav>
  </div>

  </>


)



}

export default Header
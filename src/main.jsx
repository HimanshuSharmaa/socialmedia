import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import Store from './store/Store.js'
import Signup from './pages/account/Signup.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/account/Login.jsx'
import Account from './pages/account/Account.jsx'
import ChangePassword from './pages/account/ChangePassword.jsx'
import Avatar from './pages/account/Avatar.jsx'
import Profile from './components/socialmedia/UpdateProfile.jsx'
import CoverImage from './components/account/CoverImage.jsx'
import CreatePost from './components/socialmedia/CreatePost.jsx'
import BookMarked from './components/socialmedia/BookMarked.jsx'
import Otheraccount from './components/socialmedia/otheraccount.jsx'



const router = createBrowserRouter([

  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },{
        path:"/signup",
        element:<Signup/>
      },{
        path:"/login",
        element:<Login/>
      },
      {
        path:"/account",
        element:<Account/>
      },{
        path:"/changepassword",
        element:<ChangePassword/>
      },{
        path:"/avatar",
        element:<Avatar/>
      },{
        path:"/updateprofile",
        element:<Profile/>
      },{
        path:"/coverimage",
        element:<CoverImage/>
      },{
        path:"/createpost",
        element:<CreatePost/>
      },{
        path:"/bookmarked",
        element:<BookMarked/>
      },{
        path:`/otheraccount/:username`,
        element:<Otheraccount/>
      }
    ]
  }


])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>


   <Provider store={Store} >

<RouterProvider router={router} />

   </Provider>




  // </React.StrictMode>,
)

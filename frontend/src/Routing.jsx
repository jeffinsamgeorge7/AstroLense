import React from 'react'
import {useRoutes} from 'react-router-dom'
import { Authlayer } from './components/Authlayer'
import { Signin } from './auth/Signin'
import { Signup } from './auth/Signup'
import { Home } from './pages/Home'
import Dashboard from './components/Dashboard'
import { Dash } from './pages/Dash/Dash'
import { Confirmplanet } from './pages/Dash/Confirmplanet'
import Exoplanetlist from './pages/Dash/Exoplanetlist'
import Exoml from './pages/Exoml'
import ApodViewer from './pages/Apodviewer'
import Predicttab from './pages/Dash/Predicttab'

import ImageUpload from './pages/ImageUpload'
import Fitsupload from './pages/Fitsupload'
import ImageGenerator from './pages/Skyview'
import RegistrationForm from './auth/Registrationform'
import UpdateUserForm from './auth/Updateform'




export const Routing = () => {
  let element= useRoutes([
    {
      element:<Home/>,
      children:[
        {path:'/',element:<Home/>}

      ]
    },
    {
      element: <Authlayer/>,
      children:[
        {path:'/signin',element:<Signin/>},
        {path:'/signup',element:<Signup/>},
        {path:'/reg',element:<RegistrationForm/>}

      ]
    },{
      element:<Dashboard/>,
      children:[
        {path:'/dashboard',element:<Dash/>},
        {path:'/conflist',element:<Confirmplanet/>},
        {path:'/updateform',element:<UpdateUserForm/>},
        {path:'/exolist',element:<Exoplanetlist/>},
        {path:'/prediction',element:<Predicttab/>},
        {path:'/apodapod',element:<ApodViewer/>},
        {path:'/img',element:<ImageUpload/>},
        {path:'/nupload',element:<Fitsupload/>},
        {path:'/skyview',element:<ImageGenerator/>},
      ]
    }
    ,
    
    ])
  return element;
  }
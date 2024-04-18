import React from 'react'
import {useRoutes} from 'react-router-dom'
import { Authlayer } from './components/Authlayer'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import Dashboard from './components/Dashboard'
import { Dash } from './pages/Dash/Dash'
import { Confirmplanet } from './pages/Dash/Confirmplanet'
import Exoplanetlist from './pages/Dash/Exoplanetlist'
import Exoml from './pages/Exoml'
import ApodViewer from './pages/Apodviewer'
import Predicttab from './pages/Dash/Predicttab'
import KeplerImage from './pages/Keplerimg'
import ImageUpload from './pages/ImageUpload'
import Fitsupload from './pages/Fitsupload'
import ImageGenerator from './pages/Skyview'




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
        {path:'/signup',element:<Signup/>}
      ]
    },{
      element:<Dashboard/>,
      children:[
        {path:'/dashboard',element:<Dash/>},
        {path:'/conflist',element:<Confirmplanet/>},
        {path:'/exolist',element:<Exoplanetlist/>},
        {path:'/prediction',element:<Predicttab/>},
        {path:'/apodapod',element:<ApodViewer/>},
        {path:'/kepler',element:<KeplerImage/>},
        {path:'/img',element:<ImageUpload/>},
        {path:'/nupload',element:<Fitsupload/>},
        {path:'skyview',element:<ImageGenerator/>},
      ]
    }
    ,
    
    ])
  return element;
  }
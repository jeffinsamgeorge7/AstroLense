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
import Predicttab from './pages/Dash/Predicttab'
import Iman from './pages/Iman'
import Exoml from './pages/Exoml'
import UploadFITS from './pages/Uploadfits'
import ExoplanetSearch from './pages/Fitsimg'
import ApodViewer from './pages/Apodviewer'
import SpaceWeatherDashboard from './pages/SpaceWeatherData'




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
        {path:'/prediction',element:<Exoml/>},
        {path:'/apodapod',element:<ApodViewer/>},
       
        
        
      ]
    }
    ,
    
    ])
  return element;
  }
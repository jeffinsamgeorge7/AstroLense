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
        {path:'/prediction',element:<Predicttab/>}
       
        
        
      ]
    }
    ,
    
    ])
  return element;
  }
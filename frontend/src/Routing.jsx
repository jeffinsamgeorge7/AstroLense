import React from 'react'
import {useRoutes} from 'react-router-dom'
import { Authlayer } from './components/Authlayer'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import Dashboard from './components/Dashboard'
import { Confirmplanet } from './pages/Dash/Confirmplanet'
import { Dash } from './pages/Dash/Dash'

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
        {path:'/conflist',element:<Confirmplanet/>}
      ]
    }
    ,
    
    ])
  return element;
  }
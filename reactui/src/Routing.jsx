import React from 'react'
import {useRoutes} from 'react-router-dom' 
import { Home } from './Components/Home';
import DoubleNavbar from './Dashboard/DoubleNavbar';
import { Account } from './Components/Account';
import { Signin } from './Auth/Signin';


export const Routing = () => {
  let element= useRoutes([
    {
      element:<Home/>,
      children:[
        {path:'/',element:<Home/>}

      ]
    },
    {
      element: <DoubleNavbar/>,
      children:[
        {path:'/acc',element:<Account/>},
        {path:'/home',element:<Signin/>}
      ]
    },
    ,
    
    ])
  return element;
  }
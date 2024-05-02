import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DoubleNavbar from './Dashboard/DoubleNavbar.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { NavbarMinimal } from './Dashboard/NavbarMinimal.jsx';
import { Routing } from './Routing.jsx';
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <DoubleNavbar />
  // </React.StrictMode>,
  <BrowserRouter>
   <MantineProvider defaultColorScheme="dark">
    <Routing/>
  </MantineProvider>
  </BrowserRouter>
 ,

)

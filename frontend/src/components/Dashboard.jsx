import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TableChartIcon from '@mui/icons-material/TableChart';
import style from "../components/dashboard.module.css";
import { Link,Outlet,useNavigate } from "react-router-dom";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {Dash} from '../pages/Dash/Dash'
import {useAuthToken} from '../auth/useAuthToken'

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrigger = () => setIsOpen(!isOpen);
  const token = useAuthToken();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/signin'); // Redirect to signin page
  };



  return (
    <>
    {token && (
    <div className={style.App}>
        <div style={{width:'100%',height:'100px',backgroundColor:'blueviolet',color:'white',fontFamily:'sans-serif',fontSize:'25px',paddingRight:'82%'}}>
            <h2 style={{paddingLeft:'50px',paddingTop:'20px'}}>Astro Lense</h2>
          </div>
          <useAuthToken/>
      <div className={style.page}>
        <div className={style.content}>
        
          <Outlet/>
        </div>
        <div className={`${style.sidebar} ${isOpen ? `${style.sidebaropen}` : ""}`}>
          <div className={style.trigger} onClick={handleTrigger}>
            {isOpen ? <MenuOpenIcon/>: <MenuIcon/>} 
          </div>

          <div className={style.sidebarposition} onClick={handleTrigger} >
        
          <AccountBoxIcon/>
          <span>
           
          <Link to='/dashboard'>
              Home </Link></span>
             
           
          </div>
          <div className={style.sidebarposition}  onClick={handleTrigger}>
            <SettingsApplicationsIcon />
            <span>
              <Link to='/exolist'>
              Confirm lists</Link>
              </span>
          </div>
          <div className={style.sidebarposition} onClick={handleTrigger}>
            <OnlinePredictionIcon/>
            <span>
              <Link to='/prediction'>
              Prediction</Link>
              </span>
          </div>
         

          <div className={style.sidebarposition}  onClick={handleTrigger}>
          <LegendToggleIcon />
            
            <span> <Link to='/nupload'>
              Light Curve</Link></span>
          </div>

          <div className={style.sidebarposition} onClick={handleTrigger}>
          <TableChartIcon />
            <span> <Link to='/apodapod'>
              Event</Link></span>
          </div>


          <div className={style.sidebarposition} onClick={handleTrigger}>
          <SatelliteAltIcon />
            <span> <Link to='/skyview'>
              Space Sky</Link></span>
          </div>

         

          <div className={style.sidebarposition} onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
              </div>

        </div>
      </div>
    </div>)}
    </>
  );
  
}



import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TableChartIcon from '@mui/icons-material/TableChart';
import style from "../components/dashboard.module.css";
import { Link,Outlet } from "react-router-dom";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import {Dash} from '../pages/Dash/Dash'


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    
    <div className={style.App}>
        <div style={{width:'100%',height:'100px',backgroundColor:'blueviolet',color:'white',fontFamily:'sans-serif',fontSize:'25px',paddingRight:'82%'}}>
            <h2 style={{paddingLeft:'50px',paddingTop:'10px'}}>Astro Lense</h2>
          </div>
      <div className={style.page}>
        <div className={style.content}>
        
          <Outlet/>
        </div>
        <div className={`${style.sidebar} ${isOpen ? `${style.sidebaropen}` : ""}`}>
          <div className={style.trigger} onClick={handleTrigger}>
            {isOpen ? <MenuOpenIcon/>: <MenuIcon/>} 
          </div>

          <div className={style.sidebarposition}>
        
          <AccountBoxIcon/>
          <span>
           
          <Link to='/dashboard'>
              Home </Link></span>
             
           
          </div>
          <div className={style.sidebarposition}>
            <SettingsApplicationsIcon />
            <span>
              <Link to='/exolist'>
              Confirm lists</Link>
              </span>
          </div>
          <div className={style.sidebarposition}>
            <OnlinePredictionIcon/>
            <span>
              <Link to='/prediction'>
              Prediction</Link>
              </span>
          </div>
         

          <div className={style.sidebarposition}>
          <LegendToggleIcon />
            
            <span> <Link to='/kepler'>
              Light Curve</Link></span>
          </div>

          <div className={style.sidebarposition}>
          <TableChartIcon />
            <span> <Link to='/apodapod'>
              Event</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TableChartIcon from '@mui/icons-material/TableChart';
import style from "../components/dashboard.module.css";
import { Link,Outlet } from "react-router-dom";
import {Dash} from '../pages/Dash/Dash'


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <div className={style.App}>
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
              <Link to='/conflist'>
              Confirm lists</Link>
              </span>
          </div>
          <div className={style.sidebarposition}>
            <TableChartIcon />
            <span>Menu item 3</span>
          </div>

          <div className={style.sidebarposition}>
            <TableChartIcon />
            <span>Position 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}



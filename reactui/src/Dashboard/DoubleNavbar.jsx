// DoubleNavbar.jsx

import React, { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { 
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconFingerprint,
  IconSettings,
} from '@tabler/icons-react';
import classes from './DoubleNavbar.module.css';

const mainLinksMockdata = [
  { path: '/acc', label: 'Home', icon: <IconHome2 /> },
  { path: '/home', label: 'Dashboard', icon: <IconGauge /> },
  { path: '/analytics', label: 'Analytics', icon: <IconDeviceDesktopAnalytics /> },
  { path: '/releases', label: 'Releases', icon: <IconCalendarStats /> },
  { path: '/account', label: 'Account', icon: <IconUser /> },
  { path: '/security', label: 'Security', icon: <IconFingerprint /> },
  { path: '/settings', label: 'Settings', icon: <IconSettings /> },
];


function DoubleNavbar() {
  const [active, setActive] = useState('Releases');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <Link
        to={link.path}
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        {link.icon}
      </Link>
    </Tooltip>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <h1>hai</h1>
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            Astro Lense <br/>
            {/* {active} */}
          </Title>
          <Outlet/>
          {/* Add component rendering here based on the route */}
        </div>
      </div>
    </nav>
  );
}

export default DoubleNavbar;

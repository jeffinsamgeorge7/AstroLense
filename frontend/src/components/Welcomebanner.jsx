import React from 'react'
import WavingHandIcon from '@mui/icons-material/WavingHand';

export const Welcomebanner = () => {
  return (
    <div style={{backgroundColor:'white',borderRadius:'20px',width:'87%',marginLeft:'60px',marginTop:'20px'}}>
        <h1>Welcome to Astro Lense <WavingHandIcon/></h1>
        <p>Astro Lense is a digital platfoem to learn and understand astronomy.</p>
    </div>
  )
}

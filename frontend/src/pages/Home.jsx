import React from 'react'
import style from './home.module.css'
import Image from '../assets/illu.png'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <>
     <div className={style.screen}>
      
     <div className={style.container1}>
       
      
      </div>

      <div className={style.container2}>
        <div className={style.content1}>
           <p>#ASTRONOMY</p>
           <h2>ASTRO LENSE</h2>
           <h1>"TRAVELING THROUGH SPACE"</h1>
           <Link to='/signin'>
           <Button variant="contained">Explore</Button>
           </Link>
        </div>
        <div className={style.content2}>
          <img src={Image} alt="" />
        </div>
      </div>


      <div className={style.container3}>
        <div className={style.content31}>
           <h1>About Us</h1>
           <p>Welcome to our website dedicated to exoplanet detection and image generation 
            from FITS files! At our platform, we delve into the captivating realm of exoplanets, 
            harnessing cutting-edge technology to explore distant celestial bodies beyond our solar system.
             Through our advanced algorithms and data analysis techniques, we sift through vast repositories of FITS files, 
             extracting invaluable insights and crafting stunning visualizations that unveil the mysteries of these distant worlds.
              Whether you're an avid astronomer, a curious enthusiast, or a passionate explorer of the cosmos, join us on an exhilarating journey as we unravel the secrets of exoplanets and broaden our understanding of the universe.</p>
          
        </div>
       
      </div>
     

     </div>
    
    </>
  )
}

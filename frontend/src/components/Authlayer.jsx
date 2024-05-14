import React,{useState} from 'react'
import style from './account.module.css'
import Image from '../assets/exo.png'
import { Signin } from '../auth/Signin'

import {Link,Outlet} from 'react-router-dom' 
export const Authlayer  = () => {
  const[action,setAction] = useState('login')
  return (
    <>
     <div className={style.screen}>
        <div className={style.container}>
            <div className={style.content1}>
            
            
              <img src={Image} alt="sdcsd" />
              
            </div>

            <div className={style.content2}>
              
              {action === 'login' ?
              <p className={style.option}>Not a member?
             <span onClick={()=>setAction('signup')}>
              {/* signup */}
               <Link to="/signup">Signup</Link>
             </span>
            
                </p>:
                <p className={style.option}>Already have account?
                <span onClick={()=>setAction('login')}>
                <Link to="/signin">Signin</Link>
                {/* signin */}
                </span>
                </p>
                }


          {action === 'login' ?


          <>
                <h2>Hello Again!</h2>
                 <p className={style.p1}>Welcome back you've been missed!</p>
                   </>
                :

            <>
             <h2>Welcome!</h2>
            </>

}
                


            
<Outlet/>


            </div>
        </div>
     </div>
    
    </>
  )
}

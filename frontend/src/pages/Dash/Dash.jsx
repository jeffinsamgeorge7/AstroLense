import React from 'react'
import style from './dashboard.module.css'
import { Piechart } from '../Graph/Piechart'
import { Piechart1 } from '../Graph/Piechart1'
import { Piechart2 } from '../Graph/Piechart2'
import Table1 from '../Table/Table1'
import { Welcomebanner } from '../../components/Welcomebanner'





export const Dash = () => {
  return (
    <>
    <div className={style.main}>
      <Welcomebanner/>
      <div className={style.layer1}>

   <Piechart/>
   <Piechart1/>
   <Piechart2/>
      </div>
      <div className={style.layer2}>
        <Table1/>
      </div>

      
    </div>
  
    
    </>
  )
}
//npm install @mui/material @mui/styled-engine-sc styled-components
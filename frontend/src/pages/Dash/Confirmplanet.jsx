import React from 'react'
import Table from '@mui/joy/Table';

function createData(planet, host, stars, planets, method,year) {
    return { planet, host, stars, planets, method,year };
  }
  
  const rows = [
    createData('KIC 10001893 b','KIC 10001893',1,3,'Orbital Brightness Modulation',2014),
    createData('KIC 10001893 c','KIC 10001893',1,3,'Orbital Brightness Modulation',2014),
    createData('KIC 10001893 d','KIC 10001893',1,3,'Orbital Brightness Modulation',2014),
    createData('KIC 10068024 b','KIC 10068024',1,1,'Orbital Brightness Modulation',2021),
    createData('KIC 10525077 b','KIC 10525077',1,1,'Transit',2015),
    createData('KIC 3558849 b','KIC 3558849',1,1,'Transit',2015),
    createData('KIC 5095269 b','KIC 5095269',2,1,'Eclipse Timing Variations',2017),
    createData('KIC 5437945 b','KIC 5437945',1,2,'Transit',2015),
  ];
export const Confirmplanet = () => {
  return (
    <div>
        <h1>Confirmed exoplanet by kepler</h1>
                <Table hoverRow>
      <thead>
        <tr>
          <th >Planet name</th>
          <th>Host name</th>
          <th>Number of stars</th>
          <th>Number of planets</th>
          <th>Discovery method</th>
          <th>Discovery year</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.planet}>
            <td>{row.planet}</td>
            <td>{row.host}</td>
            <td>{row.stars}</td>
            <td>{row.planets}</td>
            <td>{row.method}</td>
            <td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </Table>

    </div>
  )
}



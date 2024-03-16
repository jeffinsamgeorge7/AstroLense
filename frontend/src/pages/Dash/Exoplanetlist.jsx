// // ExoplanetList.js
// import React, { useState, useEffect } from 'react';

// const Exoplanetlist = () => {
//     const [exoplanets, setExoplanets] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/api/exoplanets/') // Make sure this URL matches your Django endpoint
//             .then(response => response.json())
//             .then(data => setExoplanets(data))
//             .catch(error => console.error('Error fetching exoplanet data:', error));
//     }, []);

//     return (
//         <div>
//             <h2>Exoplanets</h2>
//             <ul>
//                 {exoplanets.map(exoplanet => (
//                     <li key={exoplanet.id}>
//                         {exoplanet.pl_name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Exoplanetlist;



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Exoplanetlist = () => {
  const [exoplanets, setExoplanets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/exoplanets/') // Make sure this URL matches your Django endpoint
      .then(response => response.json())
      .then(data => setExoplanets(data))
      .catch(error => console.error('Error fetching exoplanet data:', error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'pl_name', headerName: 'Planet Name', width: 150 },
    { field: 'hostname', headerName: 'Host Name', width: 150 },
    { field: 'sy_snum', headerName: 'Number of Stars', width: 150 },
    { field: 'sy_pnum', headerName: 'Number of Planets', width: 150 },
    { field: 'discoverymethod', headerName: 'Discovery Method', width: 200 },
    { field: 'disc_year', headerName: 'Discovery Year', width: 150 },
  ];

  return (
    <>
     <h1>Confirmed exoplanet by kepler</h1>
    <div style={{display:'flex',justifyContent:'center'}}>
    <div style={{ height: 700, width: '80%' }}>
      <DataGrid
        rows={exoplanets}
        columns={columns}
        pageSize={10} // Set the number of rows per page
        disableSelectionOnClick // Disable row selection on click
      />
    </div>
    </div>
    </>
  );
};

export default Exoplanetlist;

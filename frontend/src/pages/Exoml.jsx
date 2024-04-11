// import React, { useState } from 'react';
// import axios from 'axios';
// import datas from '../assets/data.json'
// function Exoml() {
//   const [koiName, setKeplerName] = useState('');
//   const [prediction, setPrediction] = useState(null);
//   console.log(datas);

//   const handlePrediction = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/predict_exoplanet/?kepler_name=${koiName}`);
//       setPrediction(response.data.is_exoplanet ? 'Exoplanet detected!' : 'Not an exoplanet.');
//     } catch (error) {
//       console.error('Error fetching prediction:', error);
//       setPrediction('Error occurred while fetching prediction.');
//     }
//   };

//   return (
//     <div>
//       <h1>Exoplanet Detection</h1>
//       <input type="text" value={koiName} onChange={(e) => setKeplerName(e.target.value)} />
//       <button onClick={handlePrediction}>Predict</button>
//       {prediction && <p>{prediction}</p>}
//     </div>
//   );
// }

// export default Exoml;


import React, { useState } from 'react';
import axios from 'axios';
import datas from '../assets/data.json';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';



function Exoml() {
  const [koiName, setKeplerName] = useState('');
  const [prediction, setPrediction] = useState(null);
  console.log(datas);

  // const getKeplerName = (koi) => {
  //   const dataEntry = datas.find((entry) => entry.KOIName === koi);
  //   return dataEntry ? dataEntry.KeplerName : 'Kepler name not found';
  // };
  const getKeplerName = (koi) => {
    const dataEntry = datas.find((entry) => entry.KOIName === koi);
    if (dataEntry) {
      return dataEntry.KeplerName !== 'null' ? `Exoplanet detected! Kepler name: ${dataEntry.KeplerName}` : 'Name not defined';
    } else {
      return 'KOI name not found';
    }
  };
  

  const handlePrediction = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/predict_exoplanet/?kepler_name=${koiName}`);
      const keplerName = getKeplerName(koiName);
      setPrediction(response.data.is_exoplanet ? `Exoplanet detected! Kepler name: ${keplerName}` : 'Not an exoplanet.');
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Error occurred while fetching prediction.');
    }
  };

  return (
    <div>
      <h1>Exoplanet Detection</h1>
      <h2>Random Forest Algorithm</h2>
      <TextField
          id="outlined-multiline-flexible"
          label="KOI Name"
          multiline
          maxRows={4}
          style={{height:'20px',paddingRight:'30px'}}
          value={koiName} onChange={(e) => setKeplerName(e.target.value)} 
        />
      <Button onClick={handlePrediction}    style={{height:'20px',paddingRight:'30px',width:'250px',height:'55px'}}  >Predict</Button>
      {prediction && <h4>{prediction}</h4>}
    </div>
  );
}

export default Exoml;

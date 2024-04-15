import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import Button from '@mui/joy/Button';

function KeplerImage() {
    const [keplerName, setKeplerName] = useState('');
    const [imageUrls, setImageUrls] = useState({});

    const fetchImages = async () => {
        const response = await axios.get(`http://localhost:8000/api/kepler_image_view?kepler_name=${keplerName}`);
        setImageUrls(response.data);
    };

    return (
        <div>
            <h1>Kepler Light Curve</h1>
             <TextField
          id="outlined-multiline-flexible"
          label="Kepler Name"
          multiline
          maxRows={4}
          style={{height:'20px',paddingRight:'30px'}}
          value={keplerName} onChange={e => setKeplerName(e.target.value)} 
        />
        <Button onClick={fetchImages}   style={{height:'20px',paddingRight:'30px',width:'250px',height:'55px'}} >Submit</Button>

            {imageUrls.lightcurve_url && <img src={imageUrls.lightcurve_url} alt="Lightcurve" width="200px" height='200px' />}
            {imageUrls.periodogram_url && <img src={imageUrls.periodogram_url} alt="Periodogram" width="200px" height='200px'  />}
            {imageUrls.folded_lightcurve_url && <img src={imageUrls.folded_lightcurve_url} alt="Folded Lightcurve" width="200px" height='200px' />}
        </div>
    );
}

export default KeplerImage;

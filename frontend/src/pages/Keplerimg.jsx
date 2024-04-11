import React, { useState } from 'react';
import axios from 'axios';

function KeplerImage() {
    const [keplerName, setKeplerName] = useState('');
    const [imageUrls, setImageUrls] = useState({});

    const fetchImages = async () => {
        const response = await axios.get(`http://localhost:8000/api/kepler_image_view?kepler_name=${keplerName}`);
        setImageUrls(response.data);
    };

    return (
        <div>
            <input value={keplerName} onChange={e => setKeplerName(e.target.value)} />
            <button onClick={fetchImages}>Generate Images</button>
            {imageUrls.lightcurve_url && <img src={imageUrls.lightcurve_url} alt="Lightcurve" width="200px" height='200px' />}
            {imageUrls.periodogram_url && <img src={imageUrls.periodogram_url} alt="Periodogram" width="200px" height='200px'  />}
            {imageUrls.folded_lightcurve_url && <img src={imageUrls.folded_lightcurve_url} alt="Folded Lightcurve" width="200px" height='200px' />}
        </div>
    );
}

export default KeplerImage;

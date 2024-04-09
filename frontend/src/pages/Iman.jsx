import React, { useState } from 'react';
import axios from 'axios';

const Iman = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:8000/api/fitsfile/', formData)
            .then((response) => {
                setImage(URL.createObjectURL(file));
            });
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
            {image && <img src={image} alt="FITS file" />}
        </div>
    );
};

export default Iman;

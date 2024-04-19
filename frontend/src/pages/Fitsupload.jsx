import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const Fitsupload = () => {
  const [file, setFile] = useState(null);  
  const [imageUrl, setImageUrl] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [imageSrcs, setImageSrcs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData);
      if (response.status === 201) {
        setImageUrl(true); // Set image URL if upload is successful
        setResponseText('File uploaded successfully!');
        console.log(response.data); // Print the response data in the console
        setRefreshKey(oldKey => oldKey + 1); // Increment the refresh key to trigger a re-render
      } else {
        console.error('Error uploading file:', response.statusText);
        setResponseText('Error uploading file: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponseText('Error uploading file: ' + error.message);
    }
  };

  useEffect(() => {
    const imageNames = ['image1.png', 'image2.png', 'image3.png']; // replace with your image names

    setTimeout(() => {
      Promise.all(imageNames.map(imageName => 
        fetch(`http://localhost:8000/api/media/${imageName}`)
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
      ))
      .then(urls => {
        setImageSrcs(urls);
        setLoading(false); // Set loading to false when all images have loaded
      });
    }, 1000); // delay of 5 seconds
  }, [refreshKey]); // Add the refresh key as a dependency

  return (
    <div>
      <h1>TESS Lightkurve Analyser</h1>
       <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"><DriveFolderUploadIcon /></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            onChange={onFileChange} 
            type='file'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
         
        </FormControl>

        <ColorButton variant="contained"  style={{marginTop:"20px"}} onClick={onFileUpload}>Submit</ColorButton>
      {/* <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />} */}
      <p>{responseText}</p>
      {!loading && imageUrl && 
        <div>
          <p>The Transiting Exoplanet Survey Satellite (TESS) is a NASA-sponsored Astrophysics Explorer-class mission that is performing a near all-sky survey to search for planets transiting nearby stars.</p>
           <p>
           Simple Aperture Photometry (SAP): The SAP light curve is calculated by summing together the brightness of pixels that fall within an aperture set by the TESS mission. This is often referred to as the optimal aperture, but in spite of its name, it can sometimes be improved upon! Because the SAP light curve is a sum of the brightness in chosen pixels, it is still subject to systematic artifacts of the mission.
           </p><p>
Pre-search Data Conditioning SAP flux (PDCSAP) flux: SAP flux from which long term trends have been removed using so-called Co-trending Basis Vectors (CBVs). PDCSAP flux is usually cleaner data than the SAP flux and will have fewer systematic trends.
</p>

         
          <img src={imageSrcs[0]} alt="From server 1" />
          <h1>Flattening Lightkurve</h1>
          <img src={imageSrcs[1]} alt="From server 2" />
         <h1>Binning the light curve</h1>
          <img src={imageSrcs[2]} alt="From server 3" />
        </div>
      }
    </div>
  );
};

export default Fitsupload;

import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const ImageGenerator = () => {
  const [ra, setRa] = useState('');
  const [dec, setDec] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://skyservice.pha.jhu.edu/DR8/ImgCutout/getjpeg.aspx?ra=${ra}&dec=${dec}&width=712&height=712`;
    setImageUrl(url);
  };

  return (
    <div>
      <h1>Celestial Map</h1>
      <form onSubmit={handleSubmit}>

      <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={ra} onChange={(e) => setRa(e.target.value)}
            aria-describedby="outlined-weight-helper-text"
            placeholder='RA'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={dec} onChange={(e) => setDec(e.target.value)} 
            aria-describedby="outlined-weight-helper-text"
            placeholder='DEC'
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>

        <ColorButton variant="contained"  style={{marginTop:"20px"}}  type="submit">Submit</ColorButton>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;

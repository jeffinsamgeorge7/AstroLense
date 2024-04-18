import React, { useState } from 'react';

const ImageGenerator = () => {
  const [ra, setRa] = useState('');
  const [dec, setDec] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://skyservice.pha.jhu.edu/DR8/ImgCutout/getjpeg.aspx?ra=${ra}&dec=${dec}&width=712&height=712`;
    setImageUrl(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          RA:
          <input type="text" value={ra} onChange={(e) => setRa(e.target.value)} />
        </label>
        <label>
          DEC:
          <input type="text" value={dec} onChange={(e) => setDec(e.target.value)} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;

// ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onImageUpload = () => {
    const formData = new FormData();
    formData.append('image', image);
    axios.post('http://localhost:8000/api/upload/fits/', formData);
  };

  return (
    <div>
      <input type="file" onChange={onImageChange} />
      <button onClick={onImageUpload}>Upload!</button>
    </div>
  );
};

export default ImageUpload;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fitsupload = () => {
  const [file, setFile] = useState(null);  
  const [imageUrl, setImageUrl] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [imageSrcs, setImageSrcs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key

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
        setResponseText('Image uploaded successfully!');
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
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      <p>{responseText}</p>
      {!loading && imageUrl && 
        <div>
          <img src={imageSrcs[0]} alt="From server 1" />
          <p>Your paragraph text goes here.</p>
          <img src={imageSrcs[1]} alt="From server 2" />
          <p>Your paragraph text goes here.</p>
          <img src={imageSrcs[2]} alt="From server 3" />
        </div>
      }
    </div>
  );
};

export default Fitsupload;

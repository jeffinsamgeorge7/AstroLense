import React, { useState, useEffect } from 'react';

function ApodViewer() {
    const [apodData, setApodData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/apod/')
            .then(response => response.json())
            .then(data => setApodData(data));
    }, []);

    if (!apodData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{width:'1000px', alignItems:'center', marginLeft:'500px'}}>
            <h1>{apodData.title}</h1>
            <img src={apodData.url} alt={apodData.title} width='700px'height='400px' />
            <h4>{apodData.explanation}</h4>
        </div>
    );
}

export default ApodViewer;

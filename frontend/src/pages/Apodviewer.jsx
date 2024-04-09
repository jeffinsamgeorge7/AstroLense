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
        <div>
            <h1>{apodData.title}</h1>
            <img src={apodData.url} alt={apodData.title} width='700px'height='400px' />
            <p>{apodData.explanation}</p>
        </div>
    );
}

export default ApodViewer;

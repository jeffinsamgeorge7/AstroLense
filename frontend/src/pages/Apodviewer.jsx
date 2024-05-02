import React, { useState, useEffect } from 'react';
import style from './event.module.css'

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
        <div className={style.main}>
            <h1>Latest Astronomical event</h1>
            <h2 >{apodData.title}</h2>
            <div className={style.content}>
            
            <img src={apodData.url} alt={apodData.title} />
            <p>{apodData.explanation}</p>
            </div>
        </div>
    );
}

export default ApodViewer;

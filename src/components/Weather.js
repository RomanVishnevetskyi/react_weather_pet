import React, {useEffect, useState} from 'react';
import './Weather.css';
import axios from "axios";

const Weather = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState('');

    const searchCity = async (event) => {
        if (event.key === 'Enter') {
            fetchData(city)
            setCity('');
        }
    }

    const fetchData = async (city = 'Dnipro') => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b2e5436d2cfc0def4de91fbf8d654a51&units=metric`);
        setData(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (<div className='container'>
        <div className="search">
            <input type="text" placeholder='Enter city' id="city" value={city}
                   onChange={(event) => setCity(event.target.value)}
                   onKeyDown={searchCity}/>
        </div>
        <div className="top">
            <div className="location">
                <p>{data.name}</p>
            </div>
            <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
        </div>
        <div className="bottom">
            <div className="feels">
                {data.main ? <p className='bold'>Fells Like: {data.main.feels_like.toFixed()}°C</p> : null}
            </div>
            <div className="humidity">
                {data.main ? <p className='bold'>Humidity: {data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
                {data.wind ? <p className='bold'>Wind speed: {data.wind.speed.toFixed()}m/s</p> : null}
            </div>
        </div>

    </div>);
};

export default Weather;

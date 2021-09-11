import React, {useState,useEffect} from 'react';
import "./style.css";
import Weathercard from './weathercard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState("patna");
    const [tempInfo, setTempInfo] = useState({});
    const weatherinfo = async ()=>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6e914bd529ed8ae81f6c3f6442c31eed`;
            const res = await fetch(url);
            const data =await res.json();
            const {temp, humidity, pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset}  = data.sys;
            const myNewWeatherApp = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherApp);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        weatherinfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="Search..." autoFocus id="search" className="searchTerm" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
                    <button className="searchButton" type="button" onClick={weatherinfo}>Search</button>
                </div>
            </div>
            <Weathercard tempInfo={tempInfo}/>
         </>
    )
}

export default Temp;

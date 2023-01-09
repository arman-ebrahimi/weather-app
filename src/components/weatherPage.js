import {useEffect, useState} from "react";

export const WeatherPage = () => {
    let appId = "68c02f7a9cd3ec9754de9eeeb7592328";
    let units = "imperial";
    let searchMethod;
    const [text, setText] = useState("");
    const [weather, setWeather] = useState(null);
    const handleChange = (e) => {
        setText(e.target.value)
    }
    function getSearchMethod(txt){
        if(txt.length === 5 && Number.parseInt(txt) + '' === txt){
            searchMethod = "zip";
        }
        else{
            searchMethod = "q";
        }
    }
    const sendRequest = () => {
        if(text){
            getSearchMethod(text);
            fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${text}&APPID=${appId}&units=${units}`)
                .then(result => result.json())
                .then(result => setWeather(result))
        }
    }

    useEffect(() => {
        console.log(weather)
    },[weather])

    let climate = weather && weather.weather[0].main;
    return(
        <div className={`weather-page ${weather && climate === "Clear" ? "clear" : weather && climate === "Clouds" ? "cloudy" : weather && (climate === "Rain" || climate === "Drizzle") ? "rainy" : weather && climate === "Thunderstorm" ? "thunder" : weather && climate === "Snow" ? "snow" : weather && (climate === "Fog" || climate === "Mist" || climate === "Haze") ? "foggy" : weather && climate === "Dust" ? "dust" : weather && (climate === "Tornado" || climate === "Squall") ? "tornado" : ""}`}>
            <div className="search-box">
                <input type="text" onChange={handleChange} placeholder="City number or zip code" />
                <button onClick={sendRequest}>Search</button>
            </div>
            {weather &&
                <div className="weather-box">
                    <h2>{weather.name}-{weather.sys.country}</h2>
                    <div className="condition-row"><span>{weather.main.temp}&deg;</span><span>{weather.weather[0].description}</span><img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"} alt="icon" /></div>
                    <hr />
                    <div>Humidity Levels at {weather.main.humidity}%</div>
                    <div style={{marginTop: '8px'}}>Winds at {weather.wind.speed} m/s</div>
                </div>
            }
        </div>
    )
}
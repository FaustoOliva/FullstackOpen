import { useEffect, useState } from 'react'
import axios from '../services/weather'

function CountryData({ country }) {
    const [temperature, setTemperature] = useState(0)
    const [weather, setWeather] = useState("")
    const [icon, setIcon] = useState('')
    useEffect(() => {
        axios
            .getWeather(country.latlng[0], country.latlng[1])
            .then(response => {
                setTemperature((response.main.temp - 273.15).toFixed(1)) // Convert from Kelvin to Celsius and format to one decimal place
                setWeather(response.weather[0].main + ' ' + response.weather[0].description)
                setIcon(response.weather[0].icon)
            })
            .catch(e => console.log(e))
    }, [country])

    return (
        <div >
            <h1 style={{ marginRight: '10px' }}>{country.name.common}</h1>
            <p>capital {country.capital.map(capital =>capital)}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} style={{ width: '150px' }} />
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {temperature}</p>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" style={{ width: '100px' }}/>
            <p>weather: {weather}</p>
        </div >
    )
}

export default CountryData
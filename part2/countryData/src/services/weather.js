import axios from "axios"

const getWeather = (lat, lon) => {
    const apiKey = import.meta.env.VITE_APY_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getWeather };
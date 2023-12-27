import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const Weather = ({country}) => {
  console.log("Getting weather for ", country.capital[0])
  const[weather, setWeather] = useState(null)

  useEffect(() => {
      const api_key = import.meta.env.VITE_REACT_APP_API_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
        .then(response => {setWeather(response.data)})
  },[])

  if (weather === null) return null

  console.log(weather)
  return(
      <div>
          <h2>{`weather in ${country.capital[0]}`}</h2>
          <p>{`tempeature ${(weather.main.temp - 273.5).toFixed(2)} Celcius`}</p>
          <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>{`wind ${weather.wind.speed} m/s`}</p> 
      </div>
  )
}

const View = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="200px"/>
      <Weather country={country}/>

    </div>
  )
}

const Filter = ({handleFilterChange}) => {
  return (
    <div>
      <p>Show countries with the following letters: <input onChange={handleFilterChange}></input></p>
    </div>
  )
}

const Countries = ({countriesToShow}) => {
  const [toShow, setToShow] = useState('')
  const handleClick = (country) => {setToShow(country)}

  if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>

  else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <p key={country.name.common}>{country.name.common} <button onClick = {() => handleClick(country)}>Show</button></p>)}
        {toShow ? <View country={toShow}/> : null}
      </div>)
  }
  
  else if (countriesToShow.length === 1) {return <div>{countriesToShow.map(country => <View key={country.name.common} country={country}/>)}</div>
} 
  
  else {return <p>No matches, specify another filter</p>}
}

function App() {
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => setFilter(event.target.value)
  const [countries, setCountries] = useState([])

  // First get all the countries from the API
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  // Then we use the filter to figure out which ones to display
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <h1>Country Data</h1>
      <Filter handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App

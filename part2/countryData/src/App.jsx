import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import axios from './services/countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    if (!search) {
      setCountries([])
      console.log("useEffect", countries)
      return
    }

    console.log("useEffect", search)
    if (search) {
      axios
        .getAll()
        .then(response => filterCountries(response))
        .catch(e => console.log(e))
    }
  }, [search])


  const filterCountries = (countries) => {
    const countriesSearched = countries.filter(
      country => country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setCountries(countriesSearched)
  }

  return (
    <>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      {
        !search
          ? null
          : countries.length > 10
            ? <p>Too many matches, specify another filter</p>
            : countries.length === 1
              ? <Country country={countries[0]} />
              : <Countries countriesToShow={countries} />
      }
    </>
  )
}

export default App
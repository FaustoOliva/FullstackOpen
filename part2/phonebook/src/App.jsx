import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState('')

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const { name, number } = newPerson
    if (persons.find(person => person.name === name)) {
      alert(`${name} is already added to phonebook`)
      setNewPerson({
        name: '',
        number: ''
      })
      return
    }
    const personObject = {
      name: name,
      number: number
    }

    setPersons(persons.concat(personObject))
    setNewPerson({
      name: '',
      number: ''
    })
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target
    console.log(name, value)
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add new number</h2>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
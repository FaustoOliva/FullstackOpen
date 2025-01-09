import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    className: ''
  })

  useEffect(() => {
    axios
      .getAll('http://localhost:3001/persons')
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  const clearForm = () => {
    setNewPerson({
      name: '',
      number: ''
    })
  }

  const addPerson = (event) => {

    event.preventDefault()
    const { name, number } = newPerson
    if (persons.find(person => person.name === name && person.number !== number)) {
      if (window.confirm(`${name} is aleady added to phonebook, replace the old number with a new one?`)) {
        const personToChange = persons.find(person => person.name === name)
        const personToChangeNew = { ...personToChange, number: number }
        axios
          .update(personToChange.id, personToChangeNew)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(e => {
            setNotification({
              message: `information of ${name} has already been removed from server`,
              className: 'notificationError'
            })

            setTimeout(() => {
              setNotification({...notification, message: null})
            }, 4000);
            setPersons(persons.filter(person => person.id !== personToChange.id))

          })
        setNotification({
          message: `Updated ${name}`,
          className: 'notificationSuccess'
        })
        setTimeout(() => {
          setNotification({...notification, message:null})
        }, 4000);
      }
      clearForm()
      return
    } else if (persons.find(person => person.name === name && person.number === number)) {
      alert(`${name} is already added to phonebook`)
      clearForm()
      return
    }
    const personObject = {
      name: name,
      number: number
    }

    axios
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification({
          message: `Added ${name}`,
          className: 'notificationSuccess'
        })
        setTimeout(() => {
          setNotification({...notification, message: null})
        }, 4000);
        clearForm()
      })
      .catch(e => {
        setNotification(
          {
            message: `information of ${name} has already been removed from server`,
            className: 'notificationError'
          }
        )
        setTimeout(() => {
          setNotification({...notification, message: null})
        }, 4000);
        setPersons(persons.filter(person => person.id !== personToChange.id))
      })
  }

  const handlePersonChange = (event) => {
    const { name, value } = event.target
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  const handleDeletePersonChange = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      axios
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(e => {
          setNotification({
            message: `information of ${person.name} has already been removed from server`,
            className: 'notificationError'
          })
          setTimeout(() => {
            setNotification({...notification, message: null})
          }, 4000);
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add new number</h2>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePersonChange={handleDeletePersonChange} />
    </div>
  )
}

export default App
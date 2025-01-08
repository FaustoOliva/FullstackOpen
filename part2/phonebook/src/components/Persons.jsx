function Persons({ personsToShow, handleDeletePersonChange }) {

    return (
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person} handleDeletePersonChange={handleDeletePersonChange} />)}
        </div>
    )
}

function Person({ person, handleDeletePersonChange }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>{person.name} {person.number}</p>
            <button onClick={() => handleDeletePersonChange(person.id)}>
                delete</button>
        </div >
    )
}

export default Persons
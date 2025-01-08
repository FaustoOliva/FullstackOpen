function Persons({ personsToShow }) {
    return (
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person} />)}
        </div>
    )
}

function Person({ person }) {
    return (
        <p>{person.name} {person.number}</p>
    )
}

export default Persons

import CountryData from "./Country"
import { useState } from 'react'

function Countries({ countriesToShow }) {
    return (
        <div>
            {countriesToShow.map(country => <Country key={country.flag} country={country} />)}
        </div>
    )
}

function Country({ country }) {
    const [show, setShow] = useState(false)

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '10px' }}>{country.name.common}</p>
                <button onClick={() => setShow(!show)}>{
                    show ? 'hide' : 'show'
                }</button>
            </div >
            {
                show ? <CountryData country={country} /> : null
            }

        </>
    )
}


export default Countries
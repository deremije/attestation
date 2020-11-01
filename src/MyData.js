import { useState, useEffect } from 'react'
import Instructions from './Instructions'

const MyData = ({ english, setEnglish, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, updateBirthday, setPlaceofbirth, setAddress, setCity, setZipcode, updateData }) => {
    const [showInstructions, setShowInstructions] = useState(false)
    useEffect(() => {
        if (firstname.length === 0) setShowInstructions(true)
    }, [])

    return (
        <div className="modal">
            <div className='header-bar'>
                <h1 className='title'>{english ? "My Data" : "Mes données"}</h1>
                <div onClick={() => setEnglish(english ? false : true)}>
                    {english ? "Passer au français" : "Switch to English"}
                </div>
            </div>
            <form autoComplete="off">
                <label>
                    {english ? "First Name" : "Prénom"} <input type="text" value={firstname} placeholder="Emmanuel" onChange={e => setFirstname(e.target.value)} />
                </label>
                <label>
                    {english ? "Last Name" : "Nom"} <input type="text" value={lastname} placeholder="Macron" onChange={e => setLastname(e.target.value)} />
                </label>
                <label>
                    {english ? "Birthdate" : "Date de naissance"} <input type="text" value={birthday} placeholder="21/12/1977" onChange={e => updateBirthday(e)} />
                </label>
                <label>
                    {english ? "Birthplace" : "Lieu de naissance"} <input type="text" value={placeofbirth} placeholder="Amiens" onChange={e => setPlaceofbirth(e.target.value)} />
                </label>
                <label>
                    {english ? "Address" : "Addresse"} <input type="text" value={address} placeholder="Palais de l’Élysée" onChange={e => setAddress(e.target.value)} />
                </label>
                <label>
                    {english ? "City" : "Ville"} <input type="text" value={city} placeholder="Paris" onChange={e => setCity(e.target.value)} />
                </label>
                <label>
                    {english ? "Postal Code" : "Code postal"} <input type="text" value={zipcode} placeholder="75008" onChange={e => setZipcode(e.target.value)} />
                </label>
                
                <button type="button" onClick={updateData}>
                    Save & Continue
                </button>
            </form>
            <p className="how-to-link">
                <span onClick={() => setShowInstructions(true)}>
                    <img src="/favicon-16x16.png" /> {english ? "How to Use Sortir.io" : "Comment utiliser Sortir.io"} <img src="/favicon-16x16.png" />
                </span>
            </p>
            {showInstructions ? <Instructions setShowInstructions={setShowInstructions} /> : ""}
        </div>
    )
}

export default MyData
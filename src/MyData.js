import { useState, useEffect } from 'react'
import StyledSection from './styles/StyledSection'
import styled from 'styled-components'
import StyledHeaderBar from './styles/StyledHeaderBar'
import StyledButton from './styles/StyledButton'

const StyledSectionHeader = styled(StyledHeaderBar)`
    text-align: right;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-top: 10px;
    text-decoration: none;
    h1 {
        font-family: 'Montserrat', sans-serif;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        width: calc(100% - 40px);
        color: #1a1a1a;
        text-align: left;
        margin: 0;
        padding: 0;
    }
`


const MyData = ({ english, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, updateBirthday, setPlaceofbirth, setAddress, setCity, setZipcode, updateData }) => {
    const birthdayValid = () => {
        return birthday.length === 0 || (birthday.length === 10 && birthday.match(/\d{2}\/\d{2}\/\d{4}/)) ? "" : "error"
    }
    const postalCodeValid = () => {
        return zipcode.length === 0 || zipcode.length === 5 ? "" : "error"
    }
    return (
        <StyledSection>
            <StyledSectionHeader>
                <h1>{english ? "My Identity Details" : "Mes données"}</h1>
            </StyledSectionHeader>
            <form autoComplete="off">
                <label>
                    {english ? "First Name" : "Prénom"} <input type="text" value={firstname} placeholder="Emmanuel" onChange={e => setFirstname(e.target.value)} />
                </label>
                <label>
                    {english ? "Last Name" : "Nom"} <input type="text" value={lastname} placeholder="Macron" onChange={e => setLastname(e.target.value)} />
                </label>
                <label>
                    {english ? "Birthdate (form" : "Date de naissance (forme"} 21/12/1977) <input type="text" value={birthday} className={birthdayValid()} placeholder="21/12/1977" onChange={e => updateBirthday(e)} />
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
                    {english ? "Postal Code (5 digits)" : "Code postal (5 chiffres)"} <input type="number" step='0' value={zipcode} className={postalCodeValid()} placeholder="75008" onChange={e => setZipcode(e.target.value)} />
                </label>
                
                
            </form>
            <StyledButton type="button" onClick={updateData}>
                {english ? "Save" : "Suivant"}
            </StyledButton>
            <p className="indent">
                {english ? 
                    "Identity details are stored locally and never transmitted to anyone" : 
                    "Les détails d'identité sont stockés localement et ne sont jamais transmis à personne"}
            </p>
        </StyledSection>
    )
}

export default MyData
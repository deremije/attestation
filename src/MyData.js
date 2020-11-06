import StyledSection from './styles/StyledSection'
import styled from 'styled-components'

const StyledDataForm = styled(StyledSection)`
    transition: all 200ms;
    height: ${props => props.showData ? "calc(100% - 120px)" : "0"};
    form {
        padding: 20px 0;
    }
`

const MyData = ({ showData, updateLanguage, updateBirthday, updateData, english, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, setPlaceofbirth, setAddress, setCity, setZipcode, setShowData }) => {
    const birthdayValid = () => {
        return birthday.length === 0 || (birthday.length === 10 && birthday.match(/\d{2}\/\d{2}\/\d{4}/)) ? "" : "error"
    }
    const postalCodeValid = () => {
        return zipcode.length >= 5 || zipcode.length === 0 ? "" : "error"
    }
    return (
        <StyledDataForm showData={showData}>
            <form autoComplete="off">
                <label>
                    {english ? "First Name" : "Prénom"} <input type="text" value={firstname} placeholder="Emmanuel" onChange={e => setFirstname(e.target.value)} />
                </label>
                <label>
                    {english ? "Last Name" : "Nom"} <input type="text" value={lastname} placeholder="Macron" onChange={e => setLastname(e.target.value)} />
                </label>
                <label>
                    {english ? "Birthdate" : "Date de naissance"} (format 21/12/1977) <input type="text" value={birthday} className={birthdayValid()} placeholder="21/12/1977" onChange={e => updateBirthday(e)} />
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
                    {english ? "Postal Code" : "Code postal"} <input type="text" value={zipcode} className={postalCodeValid()} placeholder="75008" onChange={e => setZipcode(e.target.value)} />
                </label>               
            </form>
            <p className="indent">
                {english ? 
                    "Identity details are stored only on your device and never uploaded" : 
                    "Les détails d'identité sont stockés localement et ne sont jamais transmis à personne"}
            </p>
        </StyledDataForm>
    )
}

export default MyData
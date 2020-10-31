import "./NewPersonForm.css"
import { useState } from 'react'

const NewPersonForm = ({ setView, addPerson }) => {
    const [addresse, setAddresse] = useState("")
    const [dateDeNaissance, setDateDeNaissance] = useState("")
    const [ville, setVille] = useState("")
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [lieuDeNaissance, setLieuDeNaissance] = useState("")
    const [codePostal, setCodePostal] = useState("")

    const [profile, setProfile] = useState({})

    const addNewProfile = () => {
        console.log('addNewProfile')
        setProfile({
            "address": addresse,
            "birthday": dateDeNaissance,
            "city": ville,
            "firstname": prenom,
            "lastname": nom,
            "placeofbirth": lieuDeNaissance,
            "zipcode": codePostal
        })
        console.log(profile)

        if (!Object.values(profile).filter(p => p === "").length) {
            console.log('ok to proceed', profile)
            addPerson(profile)
            // setView("")
        }
    }

    return (
        <form autoComplete="off">
            <label for="prenom">
                Prénom <input type="text" placeholder="Brigitte" onChange={e => setPrenom(e.target.value)} />
            </label>
            <label for="nom">
                Nom <input type="text" placeholder="Macron" onChange={e => setNom(e.target.value)} />
            </label>
            <label for="dateDeNaissance">
                Date de naissance <input type="text" placeholder="01/01/2020" onChange={e => setDateDeNaissance(e.target.value)} />
            </label>
            <label for="lieuDeNaissance">
                Lieu de naissance <input type="text" placeholder="Lyon" onChange={e => setLieuDeNaissance(e.target.value)} />
            </label>
            <label for="addresse">
                Addresse <input type="text" placeholder="1 Champs-Elysses" onChange={e => setAddresse(e.target.value)} />
            </label>
            <label for="ville">
                Ville <input type="text" placeholder="Paris" onChange={e => setVille(e.target.value)} />
            </label>
            <label for="codePostal">
                Code postal <input type="text" placeholder="10101" onChange={e => setCodePostal(e.target.value)} />
            </label>
            <button type="button" onClick={addNewProfile}>Continue</button>
        </form>
    )
}

export default NewPersonForm
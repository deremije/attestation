import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import pdfBase from './certificate.pdf'

const App = () => {
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState("")
    const [city, setCity] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [placeofbirth, setPlaceofbirth] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [english, setEnglish] = useState(false)
    const [showData, setShowData] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const [showInfo, setShowInfo] = useState("")
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem('personal-info')) {
            let personalInfo = JSON.parse(window.localStorage.getItem('personal-info'))
            setAddress(personalInfo.address) 
            setBirthday(personalInfo.birthday) 
            setCity(personalInfo.city) 
            setFirstname(personalInfo.firstname) 
            setLastname(personalInfo.lastname) 
            setPlaceofbirth(personalInfo.placeofbirth) 
            setZipcode(personalInfo.zipcode)
        } else {
            setShowData(true)
        }
    }, [])

    const updateData = () => {
        if (allFieldsValidated()) {
            window.localStorage.setItem('personal-info', 
                JSON.stringify({
                    address: address,
                    birthday: birthday,
                    city: city,
                    placeofbirth: placeofbirth,
                    zipcode: zipcode,
                    firstname: firstname,
                    lastname:lastname 
                })
            )
            setShowData(false)
        }
    }

    const updateBirthday = (e) => {
        if ((e.target.value.length === 2 && e.target.value.match(/\d{2}/)) || (e.target.value.length === 5 && e.target.value.match(/\d{2}\/\d{2}/))) {
            setBirthday(`${e.target.value}/`)
        } else {
            setBirthday(e.target.value)
        }
    }

    const allFieldsValidated = () => {
        return address.length && birthday.length === 10 && city.length && firstname.length && lastname.length && placeofbirth.length && zipcode.length === 5 && zipcode.match(/\d{5}/) && birthday.match(/\d{2}\/\d{2}\/\d{4}/)
    }

    const attemptPDF = (reason) => {
        if (allFieldsValidated) {
            let profile = {
                address,
                birthday,
                city,
                placeofbirth,
                zipcode,
                firstname,
                lastname,
                "ox-achats": "achats",
                "ox-convocation": "convocation",
                "ox-enfants": "enfants",
                "ox-famille": "famille",
                "ox-handicap": "handicap",
                "ox-missions": "missions",
                "ox-sante": "sante",
                "ox-sport_animaux": "sport_animaux",
                "ox-travail": "travail",
                datesortie: new Date().toLocaleString('fr-FR').substring(0,10),
                heuresortie: new Date().toLocaleString('fr-FR').substring(13,18)
            }
            createPDF(profile, reason, pdfBase)
            setDownloading(true)
            setTimeout(() => setDownloading(false), 5000)
        } else {
            console.log("missing a value")
        }
    }

    const createPDF = async (profile, reason, pdfBase) => {
        const pdfBlob = await generatePdf(profile, reason, pdfBase)

        const creationInstant = new Date()
        const creationDate = creationInstant.toLocaleDateString('fr-CA')
        const creationHour = creationInstant
        .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        .replace(':', '-')

        downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`)
    }

    const info = {
        "Travail": "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.",
        "Sport": "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
        "Animaux": "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
        "Achat": "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité [3] dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.",
        "Handicap": "Déplacement des personnes en situation de handicap et leur accompagnant",
        "Missions": "Participation à des missions d'intérêt général sur demande de l'autorité administrative",
        "L'ecole": "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires",
        "Convocation": "Convocation judiciaire ou administrative et pour se rendre dans un service public",
        "Famille": "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants",
        "Sante": "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments"
    }

    const buttons = [
        {
            reason: "travail",
            french: "Travail",
            english: "Work",
            emoji: "🏢",
        },
        {
            reason: "sport_animaux",
            french: "Sport",
            english: "Exercise",
            emoji: "🏃‍♀️",
        },
        {
            reason: "sport_animaux",
            french: "Animaux",
            english: "Pets",
            emoji: "🐩",
        },
        {
            reason: "achats",
            french: "Achat",
            english: "Shopping",
            emoji: "🛒",
        },
        {
            reason: "handicap",
            french: "Handicap",
            english: "Assist Disabled",
            emoji: "♿",
        },
        {
            reason: "missions",
            french: "Missions",
            english: "Missions",
            emoji: "😇",
        },
        {
            reason: "enfants",
            french: "L'ecole",
            english: "School",
            emoji: "🏫",
        },
        {
            reason: "convocation",
            french: "Convocation",
            english: "Convocation",
            emoji: "⚖️",
        },
        {
            reason: "famille",
            french: "Famille",
            english: "Family",
            emoji: "👨‍👩‍👧‍👧",
        },
        {
            reason: "sante",
            french: "Sante",
            english: "Health",
            emoji: "🩺",
        },
    ]

    
    return (
        <div className="App">
            <div className='header-bar'>
                <div onClick={() => setShowData(true)}>
                    {english ? "Update My Data" : "Mettre à jour mes données"}
                </div>
                <div onClick={() => setEnglish(english ? false : true)}>
                    {english ? "Passer au français" : "Switch to English"}
                </div>
            </div>
            <div className="title">
                {english ? "Choose Motive to Create Attestation" : "Choisissez un motif pour créer une attestation"}
            </div>
            <div className='execute-buttons'>
                {buttons.map(b => 
                    <button>
                        <div onClick={() => attemptPDF(b.reason)}>
                            {b.emoji}
                        </div>
                        <div onClick={() => attemptPDF(b.reason)}>
                            {english ? b.english : b.french}
                        </div>
                        <div>
                            <div className='info' onClick={() => setShowInfo(b.french)}>i</div>
                        </div>
                    </button>
                )}
            </div>

            {showAbout ? 
            <div className="modal">
                <p>
                    Sortir.io was built by <a href='https://jeremyrandall.dev' target="_blank" rel="noreferrer">Jeremy Randall</a>, a Front End Engineer
                    living in Lyon.  Use of this tool is free.
                </p>
                <p>
                    Comments and user feedback are welcome.  Please email <a href="mailto:feedback@sortir.io">feedback@jeremyrandall.dev</a>
                </p>
                <p>
                    This attestation generator is available on <a href="https://github.com/deremije/attestation" target="_blank" rel="noreferrer">Github</a>.  It is based on the official attestation 
                    generator, which can be found in <a href="https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020" target="_blank" rel="noreferrer">this repository</a>.
                </p>
                <p>
                    Please wear a mask in all public places, observe social distancing
                    by staying at least 1 meter from other people, use hand sanitizer, 
                    and wash your hands frequently.  Taking precautions will save lives -
                    possibly even your own.
                </p>
                <button type="button" onClick={() => setShowAbout(false)}>Back</button>
            </div> : ""} 

            {showData ? 
            <div className="modal">
                <div className='header-bar'>
                    <h1 className='title'>{english ? "My Data" : "Mes données"}</h1>
                    <div onClick={() => setEnglish(english ? false : true)}>
                        {english ? "Passer au français" : "Switch to English"}
                    </div>
                </div>
                <form autoComplete="off">
                    <label>
                        {english ? "First Name" : "Prénom"} <input type="text" value={firstname} placeholder="Brigitte" onChange={e => setFirstname(e.target.value)} />
                    </label>
                    <label>
                        {english ? "Last Name" : "Nom"} <input type="text" value={lastname} placeholder="Macron" onChange={e => setLastname(e.target.value)} />
                    </label>
                    <label>
                        {english ? "Birthdate" : "Date de naissance"} <input type="text" value={birthday} placeholder="01/01/2020" onChange={e => updateBirthday(e)} />
                    </label>
                    <label>
                        {english ? "Birthplace" : "Lieu de naissance"} <input type="text" value={placeofbirth} placeholder="Lyon" onChange={e => setPlaceofbirth(e.target.value)} />
                    </label>
                    <label>
                        {english ? "Address" : "Addresse"} <input type="text" value={address} placeholder="1 Champs-Elysses" onChange={e => setAddress(e.target.value)} />
                    </label>
                    <label>
                        {english ? "City" : "Ville"} <input type="text" value={city} placeholder="Paris" onChange={e => setCity(e.target.value)} />
                    </label>
                    <label>
                        {english ? "Postal Code" : "Code postal"} <input type="text" value={zipcode} placeholder="10101" onChange={e => setZipcode(e.target.value)} />
                    </label>
                    
                    <button type="button" onClick={updateData}>
                        Save & Continue
                    </button>
                </form>
            </div> : "" }

            {showInfo !== "" ? 
            <div className="modal">
                    <h1>{showInfo}</h1>
                    <p>
                        Je certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire :
                    </p>
                    <p className='uniqueInfo'>{info[showInfo]}</p>
                    <button type="button" onClick={() => setShowInfo("")}>Back</button> 
                </div> : ""}

            <div className='footer-bar' onClick={() => setShowAbout(true)}>About</div>
            
            {downloading ? 
            <div className='created-notice'>
                {english ? "Downloading your attestation" : "Téléchargement de votre attestation"}
            </div> : ""}
        
        </div>
    );
}

export default App;

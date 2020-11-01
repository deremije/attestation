import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import pdfBase from './certificate.pdf'
import About from './About'
import Info from './Info'
import MyData from './MyData'
import ExecuteButtons from './ExecuteButtons'

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
            
            { showAbout ? 
                <About setShowAbout={setShowAbout} /> 
            : showData ? 
                <MyData english={english} 
                            firstname={firstname}
                            lastname={lastname}
                            birthday={birthday}
                            placeofbirth={placeofbirth}
                            address={address}
                            city={city}
                            zipcode={zipcode}
                            setEnglish={setEnglish}
                            setFirstname={setFirstname}
                            setLastname={setLastname}
                            updateBirthday={updateBirthday}
                            setPlaceofbirth={setPlaceofbirth}
                            setAddress={setAddress}
                            setCity={setCity}
                            setZipcode={setZipcode}
                            updateData={updateData} /> 
            : showInfo !== "" ? 
                <Info showInfo={showInfo} info={info} setShowInfo={setShowInfo} /> 
            : 
                <ExecuteButtons buttons={buttons} english={english} attemptPDF={attemptPDF} setShowInfo={setShowInfo} />
            }

            <div className='footer-bar' onClick={() => setShowAbout(true)}>About</div>
            {downloading ? 
                <div className='created-notice'>
                    {english ? "Downloading your attestation.  Please remember to wear your mask." : "Téléchargement de votre attestation.  SVP, ne pas oublier votre masque."}
                </div> : ""
            }
        </div>
    );
}

export default App;

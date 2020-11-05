import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import pdfBase from './certificate.pdf'
import styled from 'styled-components'
import MainNavigation from "./MainNavigation"
import Instructions from './Instructions'
import Header from './Header'
const StyledContainer = styled.div`
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: #303030;
    min-height: 568px;
    max-width: 450px;
    height: 100vh;
    min-height: 100%;
    width: 100vw;
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    h1 {
        font-size: 24px;
    }
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #3c70e0;
    }
`

const StyledConfirmation = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    font-size: 14px;
    line-height: 20px;
    padding: 10px;
    color: white;
    background-color: navy;
    box-shadow: 5px 5px #1a1a1a88;
    border-radius: 8px;
    display: ${props => props.downloading ? "block" : "none"};
    animation: fade 5s ease;
    @keyframes fade {
        0% {
            opacity: 1;
        }   
        70% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`

const App = () => {
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState("")
    const [city, setCity] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [placeofbirth, setPlaceofbirth] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [english, setEnglish] = useState(true)
    const [showData, setShowData] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [showReasons, setShowReasons] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)
    const [showMain, setShowMain] = useState(false)
    const [showDescriptions, setShowDescriptions] = useState(false)
    
    useEffect(async () => {
        if (window.localStorage.getItem('use-english')) setEnglish(window.localStorage.getItem('use-english') === "true")
        
        if (window.localStorage.getItem('personal-info')) {
            let personalInfo = JSON.parse(window.localStorage.getItem('personal-info'))
            setAddress(personalInfo.address) 
            setBirthday(personalInfo.birthday) 
            setCity(personalInfo.city) 
            setFirstname(personalInfo.firstname) 
            setLastname(personalInfo.lastname) 
            setPlaceofbirth(personalInfo.placeofbirth) 
            setZipcode(personalInfo.zipcode)
            setShowReasons(true)
            setShowMain(true)
        } else {
            setShowInstructions(true)
        }
    }, [])
    const updateLanguage = () => {
        window.localStorage.setItem('use-english', !english)
        setEnglish(!english)
    }
    const allFieldsValidated = () => {
        return address.length && birthday.length === 10 && city.length && firstname.length && lastname.length && placeofbirth.length && zipcode.toString().length === 5 && zipcode.match(/\d{5}/) && birthday.match(/\d{2}\/\d{2}\/\d{4}/)
    }
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
    const expandReasons = () => {
        if (allFieldsValidated()) {
            updateData()
            setShowReasons(true)
        }
    }
    useEffect(() => expandReasons(), [])
    const updateBirthday = (e) => {
        if ((e.target.value.length === 2 && e.target.value.match(/\d{2}/)) || (e.target.value.length === 5 && e.target.value.match(/\d{2}\/\d{2}/))) {
            setBirthday(`${e.target.value}/`)
        } else {
            setBirthday(e.target.value)
        }
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
        } 
    }
    const createPDF = async (profile, reason, pdfBase) => {
        const pdfBlob = await generatePdf(profile, reason, pdfBase)

        downloadBlob(pdfBlob, `attestation-sortir-io-${new Date().toLocaleDateString('fr-FR') + "-" + new Date().toLocaleTimeString('fr-FR')}.pdf`)
    }
    
    return (
        <StyledContainer>
            <Header setShowDescriptions={setShowDescriptions}
                showDescriptions={showDescriptions}
                showInstructions={showInstructions} 
                setShowInstructions={setShowInstructions} />
         
            <MainNavigation 
                showDescriptions={showDescriptions}
                setShowDescriptions={setShowDescriptions}
                expandReasons={expandReasons}
                updateLanguage={updateLanguage} 
                english={english} 
                setEnglish={setEnglish}
                showData={showData}
                setShowData={setShowData}
                showReasons={showReasons}
                setShowReasons={setShowReasons} 
                allFieldsValidated={allFieldsValidated}
                updateData={updateData}
                updateBirthday={updateBirthday}
                updateBirthday={updateBirthday}
                firstname={firstname}
                lastname={lastname}
                birthday={birthday}
                placeofbirth={placeofbirth}
                address={address}
                city={city}
                zipcode={zipcode}
                setFirstname={setFirstname}
                setLastname={setLastname}
                setPlaceofbirth={setPlaceofbirth}
                setAddress={setAddress}
                setCity={setCity}
                setZipcode={setZipcode}
                attemptPDF={attemptPDF} />

            <Instructions setShowInstructions={setShowInstructions} showInstructions={showInstructions} english={english} setEnglish={setEnglish} />

            <StyledConfirmation downloading={downloading}>
                {english ? "Generating your attestation. Please check for it in your downloads." : "Génération de l'attestation.  Veuillez le vérifier dans vos téléchargements."}
            </StyledConfirmation>

        </StyledContainer>
    );
}

export default App;

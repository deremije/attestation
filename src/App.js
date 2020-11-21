import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import { isFacebookBrowser } from "./scripts/facebook-util.js"
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
    height: ${() => navigator.userAgent.indexOf("Firefox") !== -1 ? "calc(100vh + 40px)" : "100vh"};
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
    const [english, setEnglish] = useState(false)
    const [showData, setShowData] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [showReasons, setShowReasons] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)
    const [showMain, setShowMain] = useState(false)
    const [showDescriptions, setShowDescriptions] = useState(false)
    const [generateDefault, setGenerateDefault] = useState(true)
    const [urlParams, setUrlParams] = useState(new URLSearchParams(window.location.search))
    
    const host = "http://www.sortir.io/"
    const reasonsList = [
        "travail",
        "achats",
        "sante",
        "famille",
        "handicap",
        "sport",
        "convocation",
        "missions",
        "ecole",
        "work",
        "shopping",
        "health",
        "family",
        "disabled",
        "exercise",
        "school"
    ]
    const parseParams = (paramsArray) => {

        let redirectAddress = `${host}?`
        paramsArray.forEach((param) => {
            if (reasonsList.includes(param)) redirectAddress += `action=${param}&`
            else if (param[0] === "@") redirectAddress += `at=${param.substring(1)}&`
            else if (param[0] === "-" || param[0] === "m") redirectAddress += `past=${param.substring(1)}&`
            else if (param[0] === "p") redirectAddress += `future=${param.substring(1)}&`
            else if (Number(param) == param) redirectAddress += `future=${param}&`
        })
        if (redirectAddress === `${host}?`) redirectAddress = host
        window.location = redirectAddress
    }
    useEffect(() => {
        if (urlParams.get("params")) {
            parseParams(urlParams.get("params").split("/"))
        }
        else if (window.location.pathname.length > 1) {
            parseParams(window.location.pathname.substring(1).split("/"))
        }
    }, [])

    useEffect(() => {
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

    const allFieldsValidated = () => {
        return address.length && birthday.length === 10 && city.length && firstname.length && lastname.length && placeofbirth.length && zipcode.length >= 5 && birthday.match(/\d{2}\/\d{2}\/\d{4}/)
    }
    useEffect(() => {
        if (generateDefault && urlParams && urlParams.get("action") && allFieldsValidated()) {
            setGenerateDefault(false)
            if (window.localStorage.getItem('personal-info')) attemptPDF(urlParams.get("action"))
        }
    }, [allFieldsValidated()])

    const updateLanguage = () => {
        window.localStorage.setItem('use-english', !english)
        setEnglish(!english)
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
    const attestationTime = () => urlParams && urlParams.get("past") ? new Date(Number(new Date()) - (Number(urlParams.get("past")) * 60000)) : urlParams && urlParams.get("future") ? new Date((Number(urlParams.get("future")) * 60000) + Number(new Date())) : new Date()
            
    const attemptPDF = (reason) => {
        if (allFieldsValidated()) {
            let profile = {
                address,
                birthday,
                city,
                placeofbirth,
                zipcode,
                firstname,
                lastname,
                datesortie: attestationTime().toLocaleString('fr-FR').substring(0,10),
                heuresortie: urlParams && urlParams.get("at") ? urlParams.get("at") : attestationTime().toLocaleString('fr-FR').substring(13,18)
            }
            createPDF(profile, reason, pdfBase)
            setDownloading(true)
            setTimeout(() => setDownloading(false), 5000)
        } 
    }
    const createPDF = async (profile, reason, pdfBase) => {
        const pdfBlob = await generatePdf(profile, reason, pdfBase)
        downloadBlob(pdfBlob, `attestation-sortir-io-${attestationTime().getUTCDate()}_${attestationTime().getMonth() + 1}_${attestationTime().getUTCFullYear()}-${attestationTime().toLocaleTimeString('fr-FR')}.pdf`)
    }
    
    return (
        <StyledContainer>
            <Header english={english} 
                updateLanguage={updateLanguage}
                setShowDescriptions={setShowDescriptions}
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
                {isFacebookBrowser() ? 
                    english ? "Sortir.io cannot generate an attestation in Facebook browser. Please visit Sortir.io in any other browser." : "Sortir.io cannot generate an attestation in Facebook browser. Please visit Sortir.io in any other browser." :
                    english ? "Generating your attestation. Please check for it in your downloads." : "Génération de l'attestation.  Veuillez le vérifier dans vos téléchargements."
                }
            </StyledConfirmation>

        </StyledContainer>
    );
}

export default App;

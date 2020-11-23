import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import { isFacebookBrowser } from "./scripts/facebook-util.js"
import pdfBase from './certificate.pdf'
import styled from 'styled-components'
import MyData from './MyData'
import ExecuteButtons from './ExecuteButtons'
import Descriptions from './Descriptions'
import Instructions from './Instructions'
import Header from './Header'
import SportInfo from './SportInfo'

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
const StyledMain = styled.section`
    background-color: white;
    height: calc(100% - 60px);
    width: 100%;
    position: relative;
`
const DynamicButtonTemplate = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    position: relative;
    cursor: pointer;
    transition: all 200ms linear;
    width: 100%;
    span {
        margin: auto;
    }
`
const StyledInfoButton = styled(DynamicButtonTemplate)`
    background-color: ${props => props.showData ? "#324977" : props.showReasons ? "#E9E9E9" : "#205DDB"};
    color: ${props => props.showReasons ? "#324977" : "white"};
    height: ${props => (props.showData || props.showReasons) ? "60px" : "calc(50% - 31px)"};
    transform-origin: top;
`
const StyledReasonButton = styled(DynamicButtonTemplate)`
    background-color: ${props => props.showReasons ? "#324977" : props.allFieldsValidated ? "#205DDB" : "#818FAB"};
    color: white;
    height: ${props => props.showData || props.showReasons ? "60px" : "calc(50% - 31px)"};
    transform-origin: bottom;
`
const StyledFooter = styled.footer`
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    width: 100%;
    height: 60px;
    color: #484848;
    position: relative;
    transition: all 200ms linear;
    transform: scaleY(${props => props.showData || props.showReasons ? "0" : "1"});
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
    const [showDescriptions, setShowDescriptions] = useState(false)
    const [generateDefault, setGenerateDefault] = useState(true)
    const [urlParams, setUrlParams] = useState(new URLSearchParams(window.location.search))
    const [adjustment, setAdjustment] = useState(0)
    const [staticTime, setStaticTime] = useState(null)
    
    const host = "http://localhost:3000/"
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
    const [lastSportTime, setLastSportTime] = useState(window.localStorage.getItem("lastSportTime") ? new Date(window.localStorage.getItem("lastSportTime")) : null)
    const displaySportInfo = () => lastSportTime && (new Date() < Number(new Date(lastSportTime)) + (1000 * 60 * 60))
    const parseParams = (paramsArray) => {
        let redirectAddress = `${host}?`
        paramsArray.forEach((param) => {
            if (reasonsList.includes(param)) redirectAddress += `action=${param}&`
            else if (param[0] === "@") redirectAddress += `at=${param.substring(1)}&`
            else if (param[0] === "-" || Number(param) == param) redirectAddress += `adjust=${param}&`
        })
        if (redirectAddress === `${host}?`) redirectAddress = host
        window.location = redirectAddress
    }
    const updateStaticTime = () => {
        if (urlParams.get("at")) {
            let d = new Date().toString()
            setStaticTime(`${d.substring(0,16)}${urlParams.get("at")}${d.substring(21)}`)   
        }
    }
    useEffect(() => {
        if (urlParams.get("params")) {
            parseParams(urlParams.get("params").split("/"))
        }
        else if (window.location.pathname.length > 1) {
            parseParams(window.location.pathname.substring(1).split("/"))
        }
        else if (urlParams.get("adjust")) setAdjustment(60000 * Number(urlParams.get("adjust")))
        else updateStaticTime()
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
        } else {
            setShowInstructions(true)
        }
    }, [])

    const allFieldsValidated = () => address.length && birthday.length === 10 && city.length && firstname.length && lastname.length && placeofbirth.length && zipcode.length >= 5 && birthday.match(/\d{2}\/\d{2}\/\d{4}/)
    
    

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
        if (e.target.value.length === 3 && e.target.value.match(/\d{3}/)) {
            setBirthday(`${e.target.value.substring(0,2)}/${e.target.value.substring(2)}`)
        } else if (e.target.value.length === 6 && e.target.value.match(/\d{2}\/\d{3}/)) {
            setBirthday(`${e.target.value.substring(0,5)}/${e.target.value.substring(5)}`)
        } else {
            setBirthday(e.target.value)
        }
    }
    const [now, setNow] = useState(Number(new Date()))
    useEffect(() => {
        setInterval(() => {
            setNow(Number(new Date()), 1000)
        })
    }, [])

    const attestationTime = () => {
        if (staticTime) return new Date(staticTime)
        return new Date(Number(new Date()) + adjustment)
    }
    const datesortie = () => urlParams && urlParams.get("at") ? new Date().toLocaleString('fr-FR').substring(0,10) : attestationTime().toLocaleString('fr-FR').substring(0,10)
    const heuresortie = () => urlParams && urlParams.get("at") ? urlParams.get("at") : attestationTime().toLocaleString('fr-FR').substring(13,18)
        
    const attemptPDF = async (reason) => {
        if (allFieldsValidated()) {
            let profile = {
                address,
                birthday,
                city,
                placeofbirth,
                zipcode,
                firstname,
                lastname,
                datesortie: datesortie(),
                heuresortie: heuresortie()
            }
            const pdfBlob = await generatePdf(profile, reason, pdfBase)
            downloadBlob(pdfBlob, `attestation-sortir-io-${firstname}-${datesortie()}-${heuresortie()}.pdf`.split("/").join("_"))
            setDownloading(true)
            if (!isFacebookBrowser()) setTimeout(() => setDownloading(false), 5000)
            if (reason === "sport") updateLastSportTime(new Date(attestationTime()))
        }
    }

    const expandData = () => {
        setShowData(true)
        setShowReasons(false)
    }

    const reasons = [
        {
            reason: "travail",
            french: "Travail",
            english: "Work",
            emoji: "🏢",
            description: {
                french: "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.",
                english: "Travel between the home and the place of exercise of the professional activity or an educational or training establishment, professional travel that cannot be postponed, travel for a competition or an exam."
            }
        },
        {
            reason: "sport",
            french: "Sport",
            english: "Exercise",
            emoji: "🏃‍♀️",
            description: {
                french: "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
                english: "Short trips, within the limit of one hour daily and within a maximum radius of one kilometer around the home, related either to the individual physical activity of the persons, excluding any collective sports practice and any proximity with other persons, or to the walk with only the persons grouped together in the same home, or to the needs of pets."
            }
        },
        {
            reason: "achats",
            french: "Achats",
            english: "Shopping",
            emoji: "🛒",
            description: {
                french: "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.",
                english: "Travel to make purchases of supplies necessary for the professional activity, purchases of basic necessities in establishments whose activities remain authorized, withdrawal of orders and home deliveries."
            }
        },
        {
            reason: "handicap",
            french: "Handicap",
            english: "Disabled",
            emoji: "♿",
            description: {
                french: "Déplacement des personnes en situation de handicap et leur accompagnant",
                english: "Movement of people with disabilities and their companions"
            }
        },
        {
            reason: "missions",
            french: "Missions",
            english: "Missions",
            emoji: "😇",
            description: {
                french: "Participation à des missions d'intérêt général sur demande de l'autorité administrative",
                english: "Participation in missions of general interest at the request of the administrative authority"
            }
        },
        {
            reason: "ecole",
            french: "Ecole",
            english: "School",
            emoji: "🏫",
            description: {
                french: "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires",
                english: "Travel to pick up children at school and during their extracurricular activities"
            }
        },
        {
            reason: "convocation",
            french: "Convocation",
            english: "Convocation",
            emoji: "⚖️",
            description: {
                french: "Convocation judiciaire ou administrative et pour se rendre dans un service public",
                english: "Judicial or administrative summons and to attend public services"
            }
        },
        {
            reason: "famille",
            french: "Famille",
            english: "Family",
            emoji: "👨‍👩‍👧‍👧",
            description: {
                french: "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants",
                english: "Travel for compelling family reasons, for assistance to vulnerable and precarious persons or for child care"
            }
        },
        {
            reason: "sante",
            french: "Sante",
            english: "Health",
            emoji: "⚕️",
            description: {
                french: "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments",
                english: "Consultations, examinations and care that cannot be provided remotely and the purchase of medication"
            }
        },
    ]  
    
    

    const updateLastSportTime = (newTime) => {
        setLastSportTime(newTime)
        window.localStorage.setItem("lastSportTime", newTime)
    }
    useEffect(() => {
        if (generateDefault && urlParams && urlParams.get("action") && allFieldsValidated()) {
            setGenerateDefault(false)
            updateStaticTime()
            if (window.localStorage.getItem('personal-info')) attemptPDF(urlParams.get("action"))
        }
    }, [allFieldsValidated()])
    
    return (
        <StyledContainer>
            <Header english={english} 
                updateLanguage={updateLanguage}
                setShowDescriptions={setShowDescriptions}
                showDescriptions={showDescriptions}
                showInstructions={showInstructions} 
                setShowInstructions={setShowInstructions} />
         
            <StyledMain>
                <StyledInfoButton showReasons={showReasons} showData={showData} allFieldsValidated={allFieldsValidated()} onClick={() => allFieldsValidated() && !showReasons ? expandReasons() : expandData()}>
                    <span>{showReasons ? english ? "Your Info" : "Vos informations" : english ? "Enter your info" : "Entrez vos informations"}</span>
                </StyledInfoButton>
                
                <MyData updateLanguage={updateLanguage}
                    updateBirthday={updateBirthday}
                    updateData={updateData}
                    english={english}
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
                    setShowData={setShowData}
                    showData={showData} />

                <StyledReasonButton showData={showData} showReasons={showReasons} allFieldsValidated={allFieldsValidated()} onClick={() => expandReasons()}>
                    <span>{english ? "Choose your reason to go out" : "Choisissez votre raison de sortir"}</span>
                </StyledReasonButton>
                {showReasons ? 
                    <ExecuteButtons
                        urlParams={urlParams}
                        attemptPDF={attemptPDF}
                        now={now}
                        attestationTime={attestationTime}
                        staticTime={staticTime}
                        adjustment={adjustment}
                        setAdjustment={setAdjustment}
                        reasons={reasons} 
                        english={english} 
                        showReasons={showReasons}
                        setShowDescriptions={setShowDescriptions} /> : ""}
                <StyledFooter showData={showData} showReasons={showReasons}>... {english ? "to generate Attestation" : "pour générer une Attestation"}</StyledFooter> 
                <Descriptions showDescriptions={showDescriptions} english={english} setShowDescriptions={setShowDescriptions} attemptPDF={attemptPDF} reasons={reasons} />
            </StyledMain>

            <Instructions setShowInstructions={setShowInstructions} showInstructions={showInstructions} english={english} setEnglish={setEnglish} />

            {displaySportInfo() ? <SportInfo now={now} lastSportTime={lastSportTime} english={english} /> : ""}

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

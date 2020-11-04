import './App.css';
import { useEffect, useState } from 'react'; 
import { generatePdf } from "./scripts/pdf-util"
import { downloadBlob } from "./scripts/dom-utils"
import pdfBase from './certificate.pdf'
import styled from 'styled-components'
import Info from './Info'
import MyData from './MyData'
import ExecuteButtons from './ExecuteButtons'
import MainNavigation from "./MainNavigation"
import Instructions from './Instructions'
import Header from './Header'
import StyledHeaderBar from './styles/StyledHeaderBar'
const StyledContainer = styled.div`
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: #303030;
    min-height: 568px;
    max-width: 450px;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
`
const StyledLangSelector = styled.div`
    width: 88px;
    margin-right: -6px;
    position: relative;
`
const StyledLangButton = styled.img`
    margin: ${props => props.currentLanguage ? "1px 3px" : "3px 5px"};
    border: ${props => props.currentLanguage ? "solid 2px #1a1a1a" : "none"};
    padding: 1px;
    border-radius: 50%;
`
const StyledFooterBar = styled(StyledHeaderBar)`
    display: block;
    height: 30px;
    line-height: 30px;
    padding-bottom: 20px;
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
const StyledHowToLink = styled.p`
    color: #3c70e0;
    cursor: pointer;
    span {
        text-align: center;
        width: 100%;
        display: inline-block;
        img {
            position: relative;
            vertical-align: middle;
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
    const [showInfo, setShowInfo] = useState("")
    const [downloading, setDownloading] = useState(false)
    const [openPDF, setOpenPDF] = useState(true)
    const [showReasons, setShowReasons] = useState(false)
    const [mainTransition, setMainTransition] = useState(false)
    const [instructionsTransition, setInstructionsTransition] = useState(false)
    const [showInstructions, setShowInstructions] = useState(true)
    const [showMain, setShowMain] = useState(false)
    
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
        } else {
            console.log("missing a value")
        }
    }
    const createPDF = async (profile, reason, pdfBase) => {
        const pdfBlob = await generatePdf(profile, reason, pdfBase)

        downloadBlob(pdfBlob, `attestation-sortir-io.pdf`)
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
    const transitionToInstructions = () => {
        setShowInstructions(true)
        setShowMain(false)
    }
    const transitionToMain = () => {
        setShowMain(true)
        setShowInstructions(false)
    }
    
    return (
        <StyledContainer>
            <Header english={english}
                showInstructions={showInstructions} 
                transitionToInstructions={transitionToInstructions} />
        {showInstructions ? <Instructions transitionToMain={transitionToMain} english={english} setEnglish={setEnglish} /> : ""}
        {showMain ? 
        <MainNavigation english={english} 
            setEnglish={setEnglish}
            showData={showData}
            setShowData={setShowData}
            showReasons={showReasons}
            setShowReasons={setShowReasons} 
            allFieldsValidated={allFieldsValidated}
            updateData={updateData}
            updateBirthday={updateBirthday}
            mainTransition={mainTransition}
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
            setZipcode={setZipcode} /> : "" }
        </StyledContainer>
    );
}

export default App;

{/* <StyledLangSelector onClick={updateLanguage}>
    <StyledLangButton src="/france-flag-round-icon-32.png" currentLanguage={!english} />
    <StyledLangButton src="/united-kingdom-flag-round-icon-32.png" currentLanguage={english} /> 
</StyledLangSelector> */}

{/* { showData ? 
    <MyData english={english}  
            firstname={firstname}
            lastname={lastname}
            birthday={birthday}
            placeofbirth={placeofbirth}
            address={address}
            city={city}
            zipcode={zipcode}
            setFirstname={setFirstname}
            setLastname={setLastname}
            updateBirthday={updateBirthday}
            setPlaceofbirth={setPlaceofbirth}
            setAddress={setAddress}
            setCity={setCity}
            setZipcode={setZipcode}
            updateData={updateData} /> 
: showInfo !== "" ? 
     
            <Info english={english} showInfo={showInfo} info={info} setShowInfo={setShowInfo} />
: 
    <ExecuteButtons buttons={buttons} english={english} attemptPDF={attemptPDF} setShowInfo={setShowInfo} />
} */}

{/*  */}

{/* <StyledFooterBar>
    {!showInstructions ? <StyledHowToLink>
        <span onClick={() => setShowInstructions(true)}>
            <img src="/favicon-16x16.png" /> {english ? "How to use Sortir.io" : "Comment utiliser Sortir.io"} <img src="/favicon-16x16.png" />
        </span>
    </StyledHowToLink> : ""}
</StyledFooterBar> */}
{/* {downloading ? 
    <StyledConfirmation>
        {english ? "Generating your attestation. Please check for it in your downloads." : "Génération de l'attestation.  Veuillez le vérifier dans vos téléchargements."}
    </StyledConfirmation> : ""
} */}

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
import NewUpdates from './NewUpdates'
import {content, reasons} from './content'
import {host, version} from './system'

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
    const [showData, setShowData] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [showReasons, setShowReasons] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)
    const [showDescriptions, setShowDescriptions] = useState(false)
    const [generateDefault, setGenerateDefault] = useState(true)
    const [urlParams, setUrlParams] = useState(new URLSearchParams(window.location.search))
    const [adjustment, setAdjustment] = useState(0)
    const [staticTime, setStaticTime] = useState(null)
    const [language, setLanguage] = useState("french")
    const [showUpdates, setShowUpdates] = useState(true)
    
    const reasonsList = () => {
        let array = []
        reasons.forEach(reason => {
            ["french", "english", "german", "italian", "spanish"].forEach(lang => {
                if (reason[lang] && !array.includes(reason[lang].toLowerCase())) {
                    array.push(reason[lang].toLowerCase())
                }
            })
        })
        return array
    }
    const [lastSportTime, setLastSportTime] = useState(window.localStorage.getItem("lastSportTime") ? new Date(window.localStorage.getItem("lastSportTime")) : null)
    const displaySportInfo = () => lastSportTime && (new Date() < Number(new Date(lastSportTime)) + (1000 * 60 * 60))
    const parseParams = (paramsArray) => {
        let redirectAddress = `${host}?`
        paramsArray.forEach((param) => {
            if (reasonsList().includes(param)) redirectAddress += `action=${param}&`
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
        if (urlParams.get("params")) parseParams(urlParams.get("params").split("/"))
        else if (window.location.pathname.length > 1) parseParams(window.location.pathname.substring(1).split("/"))
        else if (urlParams.get("adjust")) setAdjustment(60000 * Number(urlParams.get("adjust")))
        else updateStaticTime()
    }, [])

    useEffect(() => {
        if (window.localStorage.getItem("version") === version || window.localStorage.getItem("noUpdateNotes")) setShowUpdates(false)
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
    
    const updateLanguage = (lang) => {
        window.localStorage.setItem('language', lang)
        setLanguage(lang)
    }
    
    useEffect(() => {
        if (window.localStorage.getItem("language")) setLanguage(window.localStorage.getItem("language"))
        else {
            if (window.localStorage.getItem('use-english') === "true") {
                updateLanguage("english")
            }
            if (window.localStorage.getItem('use-english') === "false") {
                updateLanguage("french")
            }
            window.localStorage.removeItem('use-english')
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
    const expandReasons = () => {
        if (allFieldsValidated()) {
            updateData()
            setShowReasons(true)
        }
    }
    useEffect(() => expandReasons(), [])
    
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

    const updateLastSportTime = (newTime) => {
        setLastSportTime(newTime)
        window.localStorage.setItem("lastSportTime", newTime)
    }
    useEffect(() => {
        if (generateDefault && urlParams && urlParams.get("action") && allFieldsValidated()) {
            setGenerateDefault(false)
            updateStaticTime()
            let action = reasons.filter(reason => Object.values(reason).includes(urlParams.get("action")[0].toUpperCase() + urlParams.get("action").substring(1)))[0].reason
            if (window.localStorage.getItem('personal-info')) attemptPDF(action)
        }
    }, [allFieldsValidated()])
    const versionCheck = () => window.localStorage.getItem("version")
    useEffect(() => {
        if (window.localStorage.getItem("version") !== version) setShowUpdates(true)
    }, [versionCheck()])
    return (
        <StyledContainer>
            <Header  
                language={language}
                updateLanguage={updateLanguage}
                setShowDescriptions={setShowDescriptions}
                showDescriptions={showDescriptions}
                showInstructions={showInstructions} 
                setShowInstructions={setShowInstructions} />
         
            <StyledMain>
                <StyledInfoButton showReasons={showReasons} showData={showData} allFieldsValidated={allFieldsValidated()} onClick={() => allFieldsValidated() && !showReasons ? expandReasons() : expandData()}>
                    <span>{showReasons ? content.nav["Your Info"][language] : content.nav["Enter your info"][language]}</span>
                </StyledInfoButton>
                
                <MyData 
                    language={language}
                    content={content.myData}
                    updateLanguage={updateLanguage}
                    setBirthday={setBirthday}
                    updateData={updateData}
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
                    <span>{content.nav["Choose your reason to go out"][language]}</span>
                </StyledReasonButton>
                {showReasons ? 
                    <ExecuteButtons
                        language={language}
                        content={content.reasons}
                        urlParams={urlParams}
                        attemptPDF={attemptPDF}
                        now={now}
                        attestationTime={attestationTime}
                        staticTime={staticTime}
                        adjustment={adjustment}
                        setAdjustment={setAdjustment}
                        reasons={reasons} 
                        showReasons={showReasons}
                        setShowDescriptions={setShowDescriptions} /> : ""}
                <Descriptions language={language} content={content.reasons} showDescriptions={showDescriptions} setShowDescriptions={setShowDescriptions} attemptPDF={attemptPDF} reasons={reasons} />
            </StyledMain>

            <Instructions setShowUpdates={setShowUpdates} language={language} setLanguage={setLanguage} content={content.instructions} setShowInstructions={setShowInstructions} showInstructions={showInstructions} />

            {displaySportInfo() ? <SportInfo now={now} lastSportTime={lastSportTime} language={language} content={content.sport} /> : ""}

            {showUpdates ? <NewUpdates content={content.updates} language={language} version={version} setShowUpdates={setShowUpdates} /> : ""}

            <StyledConfirmation downloading={downloading}>
                {isFacebookBrowser() ? 
                    content.nav["Sortir.io cannot generate an attestation in Facebook browser. Please visit Sortir.io in any other browser."][language] :
                    content.nav["Generating your attestation. Please check for it in your downloads."][language]
                }
            </StyledConfirmation>

        </StyledContainer>
    );
}

export default App;

import styled from 'styled-components'
import MyData from './MyData'
import ExecuteButtons from './ExecuteButtons'
import Descriptions from './Descriptions'

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

const MainNavigation = ({ showDescriptions, setShowDescriptions, expandReasons, setShowInfo, attemptPDF, updateLanguage, english, setEnglish, showData, showReasons, setShowReasons, allFieldsValidated, updateBirthday, updateData, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, setPlaceofbirth, setAddress, setCity, setZipcode, setShowData }) => {
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
                english: ""
            }
        },
        {
            reason: "sport_animaux",
            french: "Sport",
            english: "Exercise",
            emoji: "🏃‍♀️",
            description: {
                french: "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
                english: ""
            }
        },
        {
            reason: "achats",
            french: "Achats",
            english: "Shopping",
            emoji: "🛒",
            description: {
                french: "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.",
                english: ""
            }
        },
        {
            reason: "handicap",
            french: "Handicap",
            english: "Assist Disabled",
            emoji: "♿",
            description: {
                french: "Déplacement des personnes en situation de handicap et leur accompagnant",
                english: ""
            }
        },
        {
            reason: "missions",
            french: "Missions",
            english: "Missions",
            emoji: "😇",
            description: {
                french: "Participation à des missions d'intérêt général sur demande de l'autorité administrative",
                english: ""
            }
        },
        {
            reason: "enfants",
            french: "L'ecole",
            english: "School",
            emoji: "🏫",
            description: {
                french: "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires",
                english: ""
            }
        },
        {
            reason: "convocation",
            french: "Convocation",
            english: "Convocation",
            emoji: "⚖️",
            description: {
                french: "Convocation judiciaire ou administrative et pour se rendre dans un service public",
                english: ""
            }
        },
        {
            reason: "famille",
            french: "Famille",
            english: "Family",
            emoji: "👨‍👩‍👧‍👧",
            description: {
                french: "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants",
                english: ""
            }
        },
        {
            reason: "sante",
            french: "Sante",
            english: "Health",
            emoji: "🩺",
            description: {
                french: "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments",
                english: ""
            }
        },
    ]    
    
    return (
        <StyledMain>
            <StyledInfoButton showReasons={showReasons} showData={showData} allFieldsValidated={allFieldsValidated()} onClick={() => expandData()}>
                <span>{showReasons ? "Your Info" : "Enter your info"}</span>
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
                <span>Choose your reason to go out</span>
            </StyledReasonButton>
            {showReasons ? 
                <ExecuteButtons
                    reasons={reasons} 
                    english={english} 
                    attemptPDF={attemptPDF} 
                    setShowInfo={setShowInfo}
                    showReasons={showReasons}
                    setShowDescriptions={setShowDescriptions} /> : ""}
            <StyledFooter showData={showData} showReasons={showReasons}>... to generate Attestation</StyledFooter> 
            <Descriptions showDescriptions={showDescriptions} english={english} setShowDescriptions={setShowDescriptions} attemptPDF={attemptPDF} reasons={reasons} />
        </StyledMain>
    )
}

export default MainNavigation
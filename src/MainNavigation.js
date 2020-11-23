import styled from 'styled-components'
import MyData from './MyData'
import ExecuteButtons from './ExecuteButtons'
import Descriptions from './Descriptions'
import { useState, useEffect } from 'react'

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

const MainNavigation = ({ attestationTime, staticTime, adjustment, setAdjustment, showDescriptions, setShowDescriptions, expandReasons, setShowInfo, attemptPDF, updateLanguage, english, setEnglish, showData, showReasons, setShowReasons, allFieldsValidated, updateBirthday, updateData, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, setPlaceofbirth, setAddress, setCity, setZipcode, setShowData }) => {
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
    
    const [now, setNow] = useState(Number(new Date()))
    useEffect(() => {
        setInterval(() => {
            setNow(Number(new Date()), 1000)
        })
    }, [])
    
    return (
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
                    now={now}
                    attestationTime={attestationTime}
                    staticTime={staticTime}
                    adjustment={adjustment}
                    setAdjustment={setAdjustment}
                    reasons={reasons} 
                    english={english} 
                    attemptPDF={attemptPDF} 
                    setShowInfo={setShowInfo}
                    showReasons={showReasons}
                    setShowDescriptions={setShowDescriptions} /> : ""}
            <StyledFooter showData={showData} showReasons={showReasons}>... {english ? "to generate Attestation" : "pour générer une Attestation"}</StyledFooter> 
            <Descriptions showDescriptions={showDescriptions} english={english} setShowDescriptions={setShowDescriptions} attemptPDF={attemptPDF} reasons={reasons} />
        </StyledMain>
    )
}

export default MainNavigation
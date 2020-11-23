import styled from 'styled-components'
import { useState, useEffect } from 'react'
import haversine from 'haversine-js'
import StyledButton from './styles/StyledButton'

const StyledSportInfo = styled.section`
    width: ${props => props.showModal ? "calc(100% - 82px)" : "80px"};
    height: ${props => props.showModal ? "auto" : "80px"};
    max-height: calc(100% - 160px);
    transition: all linear 100ms;
    position: absolute;
    top: ${props => props.showModal ? "80px" : "80px"};
    right: ${props => props.showModal ? "40px" : "25px"};
    background-color: #1e448f;
    color: white;
    border-radius: ${props => props.showModal ? "10px" : "50%"};
    text-align: center;
    font-size: 18px;
    overflow-y: auto;
    border: solid 1px white;
    span.overlay {
        position: absolute;
        right: 10px;
        top: 10px;
        display: block;
        border-radius: 50%;
        border: solid 2px transparent;
        width: 36px;
        height: 36px;
        line-height: 36px;
        transform: rotate(45deg);
        font-size: 30px;
        background-color: white;
        color: #1e448f;
    }
`
const StyledContainer = styled.div`
    width: calc(100% - 40px);
    height: auto;
    position: relative;
    margin: auto;
    padding: 20px 0;
    opacity: ${props => props.showModal ? "1" : "0"};
    transition: opacity 100ms linear;
    background-color: #1e448f;
    color: white;
    h1.icon {
        font-size: 60px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`

const StyledDistance = styled.div`
    padding-bottom: 20px;
    p {
        font-size: 14px;
    }
`
const StyledGPSButton = styled(StyledButton)`
    font-size: 16px;
    margin: 10px 0;
    line-height: 24px;
    height: auto;
    width: auto;
    padding: 13px 5px;
`

const StyledOverlayIcon = styled.div`
    font-size: 40px;
    text-align: center;
    background-color: #fff;
    color: white;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 76px;
    height: 76px;
    line-height: 76px;
    border: solid 2px #1e448f;
`

const SportInfo = ({ english }) => {
    const formatTime = () => {
        let totalSeconds = (Math.max(new Date(), new Date(window.localStorage.getItem("lastSportTime"))) - Math.min(new Date(), new Date(window.localStorage.getItem("lastSportTime")))) / 1000
        totalSeconds = new Date() > new Date(window.localStorage.getItem("lastSportTime")) ? (60 * 60) - totalSeconds : totalSeconds
        let seconds = totalSeconds % 60
        let minutes = (totalSeconds - seconds) / 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds === 60 ? 0 : seconds.toFixed(0)}`
    }
    const [coordsSaved, setCoordsSaved] = useState(window.localStorage.getItem("homeCoords"))
    const saveCoords = () => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position) => {
            window.localStorage.setItem('homeCoords', JSON.stringify({
                "latitude" : position.coords.latitude,
                "longitude" : position.coords.longitude
            }))
            setCoordsSaved(true)
            updateCoords()
        })
    }
    const [showModal, setShowModal] = useState(true)
    const [displayTime, setDisplayTime] = useState(formatTime())
    const [currentCoords, setCurrentCoords] = useState(null)

    const updateCoords = () => {
        if (navigator.geolocation && window.localStorage.getItem("homeCoords")) navigator.geolocation.getCurrentPosition((position) => {
            setCurrentCoords({
                "latitude" : position.coords.latitude,
                "longitude" : position.coords.longitude
            })
        })
    }
    useEffect(() => {
        setInterval(() => setDisplayTime(formatTime()), 1000)
        setInterval(() => updateCoords(), 20000)
    }, [coordsSaved])

    return (
        <StyledSportInfo showModal={showModal}>
            <StyledContainer showModal={showModal}>
                <h1 className='icon'><span style={{"fontSize": "36px"}}>🐩</span>🏃‍♀️</h1>
                {english ? "Exercise period" : "Période du sport"} {new Date() > new Date(window.localStorage.getItem("lastSportTime")) ? english ? "ends in" : "se termine en" : english ? "starts in" : "commence en "}:
                <h1>{displayTime}</h1>
                <StyledDistance>
                    {window.localStorage.getItem("homeCoords") ? 
                    <div>
                        {english ? "Distance from home" : "Distance de votre maison "}:
                        <h1>
                            {currentCoords ? haversine(JSON.parse(window.localStorage.getItem('homeCoords')), currentCoords, {radius: haversine.EARTH.M}).toFixed(0) : ""}m
                        </h1> 
                    </div> :
                    <div>
                        <p>{english ? "Click to save your home GPS coordinates and stay within 1km" : "Cliquez pour enregistrer les coordonnées GPS de votre domicile et rester à moins d'un kilomètre"}</p>
                        <StyledGPSButton onClick={saveCoords}>{english ? "I am home right now" : "Je suis chez moi"}</StyledGPSButton>
                        <p>{english ? "Location data is not sent to anyone" : "Les données de localisation ne sont envoyées à personne"}</p>
                    </div>
                }
                </StyledDistance>
            </StyledContainer>
            {showModal ? <span className='overlay' onClick={() => setShowModal(false)}>+</span> : <StyledOverlayIcon onClick={() => setShowModal(true)}>🏃‍♀️</StyledOverlayIcon>}
                
        </StyledSportInfo>
    )
}

export default SportInfo
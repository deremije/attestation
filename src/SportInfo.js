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
    background-color: ${props => props.tooFar || props.tooLate ?  "#db2020" : "#205DDB"};
    color: white;
    border-radius: ${props => props.showModal ? "10px" : "50%"};
    text-align: center;
    font-size: 18px;
    overflow-y: auto;
    overflow-x: hidden;
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
        color: #205DDB;
    }
`
const StyledContainer = styled.div`
    width: calc(100% - 40px);
    height: auto;
    position: relative;
    margin: auto;
    padding: 20px 0;
    opacity: ${props => props.showModal ? "1" : "0"};
    transition: all 100ms linear;
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
    padding: 13px 10px;
    background-color: white;
    color: #205DDB;
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
    border: solid 2px #205DDB;
`

const SportInfo = ({ lastSportTime, now, language, content }) => {
    const [showModal, setShowModal] = useState(true)
    const [currentCoords, setCurrentCoords] = useState(null)
    const originalLimit = () => new Date().getTime() < 1606518000000
    const timeAllowance = () => originalLimit() ? 3600 : 3600 * 3
    const currentCountdown = () => (new Date(now) - new Date(lastSportTime)) / 1000
    const distanceFromHome = () => currentCoords ? haversine(homeCoords, currentCoords, {radius: haversine.EARTH.KM}) : 0
    const allowedDistance = () => originalLimit() ? 1 : 20

    const formatTime = () => {
        const getTotalSeconds = () => {
            if (new Date(now) > new Date(lastSportTime)) return timeAllowance() - currentCountdown()
            return (new Date(lastSportTime) - new Date(now)) / 1000
        }
        let totalSeconds = getTotalSeconds()
        let seconds = totalSeconds % 60
        let minutes = ((totalSeconds - seconds) / 60) % 60
        let hours = (((totalSeconds - seconds) / 60) - minutes) / 60
        return `0${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`
    }
    
    const [displayTime, setDisplayTime] = useState(formatTime())
    const [homeCoords, setHomeCoords] = useState(window.localStorage.getItem("homeCoords") ? JSON.parse(window.localStorage.getItem("homeCoords")) : null)
    const saveCoords = () => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position) => {
            window.localStorage.setItem('homeCoords', JSON.stringify({
                "latitude" : position.coords.latitude,
                "longitude" : position.coords.longitude
            }))
            setHomeCoords({
                "latitude" : position.coords.latitude,
                "longitude" : position.coords.longitude
            })
            updateCoords()
        })
    }

    const updateCoords = () => {
        if (navigator.geolocation && homeCoords) navigator.geolocation.getCurrentPosition((position) => {
            setCurrentCoords({
                "latitude" : position.coords.latitude,
                "longitude" : position.coords.longitude
            })
        })
    }
    useEffect(() => {
        setShowModal(true)
    }, [lastSportTime])
    useEffect(() => {
        setDisplayTime(formatTime())
        homeCoords && updateCoords()
    }, [now])

    return (
        <StyledSportInfo showModal={showModal} tooFar={distanceFromHome() > allowedDistance()} tooLate={currentCountdown() > timeAllowance()}>
            <StyledContainer showModal={showModal}>
                <h1 className='icon'><span style={{"fontSize": "36px"}}>🐩</span>🏃‍♀️</h1>
                {content["Exercise period"][language]} {new Date() > new Date(lastSportTime) ? content["ends in"][language] : content["starts in"][language]}:
                <h1>{displayTime}</h1>
                <StyledDistance>
                    {homeCoords ? 
                    <div onClick={updateCoords}>
                        {content["Distance from home"][language]}:
                        <h1>
                            {distanceFromHome().toFixed(3)}km
                        </h1> 
                    </div> :
                    <div>
                        <p>{content[`Click to save your home GPS coordinates and stay within ${originalLimit() ? 1 : 20}km`][language]}</p>
                        <StyledGPSButton onClick={saveCoords}>{content["I am home right now"][language]}</StyledGPSButton>
                        <p>{content["Location data is not sent to anyone"][language]}</p>
                    </div>
                }
                </StyledDistance>
            </StyledContainer>
            {showModal ? <span className='overlay' onClick={() => setShowModal(false)}>+</span> : <StyledOverlayIcon onClick={() => setShowModal(true)}>🏃‍♀️</StyledOverlayIcon>}
                
        </StyledSportInfo>
    )
}

export default SportInfo
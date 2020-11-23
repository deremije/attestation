import styled from 'styled-components'
import { useEffect, useState } from 'react'

const StyledReasonButtons = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr) repeat(2, 60px);
    position: relative;
    transition: all 200ms;
    background-color: #eee;
    overflow-y: auto;
    height: ${props => props.showReasons ? "calc(100% - 120px)" : "0"};
    button {
        display: flex;
        width: calc(100vw / 3);
        height: 100%;
        border: none;
        position: relative;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        background-color: transparent;
        div {
            margin: auto;
            height: 62px;
            line-height: 42px;
            font-size: 30px;
            position: relative;
            span {
                height: 20px;
                display: block;
                line-height: 20px;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
`
const StyledInfoLink = styled.div`
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #3c70e0;
    text-decoration: underline;
    grid-column: 1 / span 3;
    background-color: #eee;
`
const StyledTimeSelector = styled.div`
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    grid-column: 1 / span 3;
    background-color: #324977;
    color: white;
    display: grid;
    grid-template-columns: 1fr 70px 1fr;
    width: calc(100% - 40px);
    padding: 0 20px;
    div.text {
        font-size: 14px;
        font-weight: normal;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        text-align: left;
    }
    div.adjust {
        position: relative;
        vertical-align: middle;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        height: 60px;
        line-height: 60px;
        span {
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
            border: solid 2px white;
            border-radius: 50%;
            height: 24px;
            width: 24px;
            line-height: 24px;
            text-align: center;
            position: relative;
            margin: 15px 5px;
        }
    }
`   

const ExecuteButtons = ({ now, attestationTime, staticTime, adjustment, setAdjustment, reasons, setShowDescriptions, english, attemptPDF, setShowInfo, showReasons }) => {
    const backInTime = () => {
        setAdjustment(adjustment - 300000)
    }
    const forwardInTime = () => {
        setAdjustment(adjustment + 300000)
    }
    const makeAttestation = (reason) => {
        attemptPDF(reason)
        if (reason === "sport") {
            window.localStorage.setItem("lastSportTime", attestationTime())
        }
    }
    
    return (
        <StyledReasonButtons showReasons={showReasons}>
            {reasons.map(b => 
                <button onClick={() => makeAttestation(b.reason)} key={b.reason}>
                    <div>
                        {b.emoji}
                        <span>
                            {english ? b.english : b.french}
                        </span>
                    </div>
                </button>
            )}
        {staticTime ? 
            <StyledTimeSelector>
                { staticTime }
            </StyledTimeSelector> :
            <StyledTimeSelector>
                <div className='text'>{english ? "Starting at" : "Heure de Sortie "}: </div>
                <div onClick={() => setAdjustment(0)}>{new Date(now + adjustment).toLocaleTimeString("fr-FR").substring(0,5).split(":").join(english ? ":" : "h")}</div>
                <div className='adjust'>
                    <span onClick={backInTime}> - </span>
                    <span onClick={forwardInTime}> + </span> 
                </div>
            </StyledTimeSelector> 
        }
            <StyledInfoLink onClick={() => setShowDescriptions(true)}>
                {english ? "Which reason should I choose?" : "Quelle raison devrais-je choisir ?"}
            </StyledInfoLink>
        </StyledReasonButtons>
    )
}

export default ExecuteButtons
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import MyData from './MyData'
// import ExecuteButtons from './ExecuteButtons'

const StyledMain = styled.section`
    background-color: white;
    height: calc(100% - 60px);
    width: 100%;
    position: relative;
    /* animation: ${props => props.transition ? "slide_out_right" : "slide_in_left"} 200ms linear;
    @keyframes slide_in_left {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    @keyframes slide_out_right {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    } */
`
const DynamicButtonTemplate = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    position: absolute;
    cursor: pointer;
    transition: all 200ms linear;
    width: 100%;
    span {
        margin: auto;
    }
`
const StyledInfoButton = styled(DynamicButtonTemplate)`
    background-color: ${props => props.showData ? "#324977" : props.showReasons ? "#E9E9E9" : "#205DDB"};
    color: white;
    height: ${props => (props.showData || props.showReasons) ? "60px" : "calc(50% - 31px)"};
    top: 0;
`
const StyledReasonButton = styled(DynamicButtonTemplate)`
    background-color: ${props => props.showReasons ? "#324977" : props.allFieldsValidated ? "#205DDB" : "#818FAB"};
    color: white;
    height: ${props => props.showData || props.showReasons ? "60px" : "calc(50% - 31px)"};
    bottom: ${props => props.showData || props.showReasons ? "0px" : "60px"};
`
const StyledFooter = styled.footer`
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    width: 100%;
    height: 60px;
    color: #484848;
    position: absolute;
    bottom: 0;
    transition: all 200ms linear;
    transform: scaleY(${props => props.showData || props.showReasons ? "0" : "1"});
`

const MainNavigation = ({ mainTransition, english, setEnglish, showData, showReasons, setShowReasons, allFieldsValidated, updateBirthday, updateData, firstname, lastname, birthday, placeofbirth, address, city, zipcode, setFirstname, setLastname, setPlaceofbirth, setAddress, setCity, setZipcode, setShowData }) => {
    const expandData = () => {
        setShowData(true)
        setShowReasons(false)
    }
    const expandReasons = () => {
        if (allFieldsValidated()) {
            setShowData(false)
            setShowReasons(true)
        }
    }
    useEffect(() => {
        console.log(showData, showReasons)
    }, [])
    // useEffect(() => expandReasons(), [])
    
    return (
        <StyledMain transition={mainTransition} >
            <StyledInfoButton showReasons={showReasons} showData={showData} allFieldsValidated={allFieldsValidated()} onClick={() => expandData()}>
                <span>Enter your info</span>
            </StyledInfoButton>
            {showData ? 
                <MyData updateBirthday={updateBirthday}
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
                    setShowData={setShowData} /> : ""}
            <StyledReasonButton showData={showData} showReasons={showReasons} allFieldsValidated={allFieldsValidated()} onClick={() => expandReasons()}>
                <span>Choose your reason to go out</span>
            </StyledReasonButton>
            {showReasons ? <div>ExecuteButtons</div> : ""}
            <StyledFooter showData={showData} showReasons={showReasons}>... to generate Attestation</StyledFooter> 
        </StyledMain>
    )
}

export default MainNavigation
import styled from 'styled-components'
const StyledHeader = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    img {
        display: block;
        margin: auto;
        height: 24px;
        width: auto;
        position: relative;
        top: -1px;
    }
    .back {
        height: 32px;
        width: 32px;
        position: absolute;
        top: 15px;
        left: 15px;
        transform: translateX(${props => props.showDescriptions ? "0" : "-72px" });
        transition: all 200ms linear;
    }
`
const StyledInfoIcon = styled.div`
    height: 27px;
    width: 27px;
    position: absolute;
    top: 15px;
    left: 15px;
    border-radius: 50%;
    border: solid 2.5px #303030;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    transform: translateX(${props => props.showInstructions || props.showDescriptions ? "-72px" : "0"});
    transition: all 200ms linear;
`
const StyledLangSelector = styled.div`
    padding: 0;
    line-height: 24px;
    height: 24px;
    text-align: center;
    position: absolute;
    right: 15px;
    top: 18px;
    display: flex;
    justify-content: center;
`
const StyledLangButton = styled.div`
    font-weight: bold;
    font-size: 12px;
    width: 28px;
    height: 20px;
    line-height: 20px;
    border: solid 2px #3c70e0;
    transition: all 200ms linear;
    background-color: ${props => props.currentLanguage ? "#3c70e0" : "white"};
    color: ${props => props.currentLanguage ? "white" : "#3c70e0"};
`

const Header = ({ english, updateLanguage, setShowDescriptions, showDescriptions, setShowInstructions, showInstructions }) => {
    
    return (
        <StyledHeader showDescriptions={showDescriptions} >
            <img src="logo.svg" onClick={() => {setShowDescriptions(false); setShowInstructions(false);}}/>
            <img src="back-arrow.png" className='back' onClick={() => setShowDescriptions(false)} />
            <StyledInfoIcon showDescriptions={showDescriptions} showInstructions={showInstructions} onClick={() => setShowInstructions(true)}>i</StyledInfoIcon>
            <StyledLangSelector onClick={() => updateLanguage()}>
                <StyledLangButton currentLanguage={!english}>FR</StyledLangButton>
                <StyledLangButton currentLanguage={english}>EN</StyledLangButton>
            </StyledLangSelector>
        </StyledHeader>
    )
}

export default Header
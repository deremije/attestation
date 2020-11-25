import styled from 'styled-components'
const StyledHeader = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    a {
        display: block;
        margin: auto;
        height: auto;
        width: auto;
        position: relative;
        top: -1px;
        img {
            height: 24px;
        }
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
const StyledSelect = styled.select`
    padding: 0;
    line-height: 40px;
    height: 40px;
    text-align: center;
    position: absolute;
    right: 15px;
    top: 8px;
    border-color: #3c70e0;
    border: none;
    color: #3c70e0;
    font-size: 24px;
`

const Header = ({ language, updateLanguage, setShowDescriptions, showDescriptions, setShowInstructions, showInstructions }) => {
    
    return (
        <StyledHeader showDescriptions={showDescriptions} >
            <a href="/"><img src="logo.svg" alt='Sortir.io Logo' /></a>
            <img src="back-arrow.png" alt='Back to Reasons' className='back' onClick={() => setShowDescriptions(false)} />
            <StyledInfoIcon showDescriptions={showDescriptions} showInstructions={showInstructions} onClick={() => setShowInstructions(true)}>i</StyledInfoIcon>
            <StyledSelect value={language} onChange={(e) => updateLanguage(e.target.value)}>
                <option value="french">FR</option>
                <option value="italian">IT</option>
                <option value="spanish">ES</option>
                <option value="english">EN</option>
                <option value="german">DE</option>
            </StyledSelect>
        </StyledHeader>
    )
}

export default Header
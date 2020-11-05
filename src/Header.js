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

const Header = ({ setShowDescriptions, showDescriptions, setShowInstructions, showInstructions }) => {
    
    return (
        <StyledHeader showDescriptions={showDescriptions} >
            <img src="logo.svg" onClick={() => {setShowDescriptions(false); setShowInstructions(false);}}/>
            <StyledInfoIcon showDescriptions={showDescriptions} showInstructions={showInstructions} onClick={() => setShowInstructions(true)}>i</StyledInfoIcon>
            <img src="back-arrow.png" className='back' onClick={() => setShowDescriptions(false)} />
        </StyledHeader>
    )
}

export default Header
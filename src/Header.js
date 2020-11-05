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
        position: absolute;
        height: 24px;
        padding: 10px;
        top: 10px;
        right: 8px;
        width: auto;
        transition: all 200ms linear;
        transform: translateX(${props => props.showDescriptions ? "0" : "58px"});
    }
`
const StyledInfoIcon = styled.div`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 13px;
    left: 15px;
    border-radius: 50%;
    border: solid 2px #303030;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    transform: translateX(${props => props.showInstructions ? "-72px" : "0"});
    transition: all 200ms linear;
`

const Header = ({ setShowDescriptions, showDescriptions, setShowInstructions, showInstructions }) => {
    
    return (
        <StyledHeader showDescriptions={showDescriptions} >
            <img src="logo.svg" />
            <StyledInfoIcon showInstructions={showInstructions} onClick={() => setShowInstructions(true)}>i</StyledInfoIcon>
            <img src="back-arrow.png" className='back' onClick={() => setShowDescriptions(false)} />
        </StyledHeader>
    )
}

export default Header
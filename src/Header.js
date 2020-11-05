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

const Header = ({ setShowInstructions, showInstructions, english }) => {
    
    return (
        <StyledHeader>
            <img src="logo.svg"/>
            <StyledInfoIcon showInstructions={showInstructions} onClick={() => setShowInstructions(true)}>i</StyledInfoIcon>
        </StyledHeader>
    )
}

export default Header
import styled from 'styled-components'
const StyledHeader = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    h2 {
        margin: auto;
        font-size: 16px;
        font-weight: bold;
    }
`
const StyledInfoIcon = styled.div`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 13px;
    left: 28px;
    border-radius: 50%;
    border: solid 2px #303030;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
`

const Header = ({ transitionToInstructions, showInstructions, english }) => {
    
    return (
        <StyledHeader>
            <h2>
                {/* SORTIR.IO */}
                <img src="logo.svg"/>
            </h2>
            {!showInstructions ? <StyledInfoIcon onClick={transitionToInstructions}>i</StyledInfoIcon> : ""}
        </StyledHeader>
    )
}

export default Header
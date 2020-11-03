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
    height: 40px;
    width: 40px;
    position: absolute;
    top: 8px;
    left: 28px;
    border-radius: 50%;
    border: solid 2px #303030;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
`

const Header = ({ showInstructions, setShowInstructions, english }) => {
    return (
        <StyledHeader>
            <h2>
                SORTIR.IO
            </h2>
            {!showInstructions ? <StyledInfoIcon onClick={() => setShowInstructions(true)}>i</StyledInfoIcon> : ""}
        </StyledHeader>
    )
}

export default Header
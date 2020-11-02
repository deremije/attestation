import StyledButton from "./styles/StyledButton"
import StyledSection from "./styles/StyledSection"
import styled from 'styled-components'

const StyledBlock = styled.div`
    width: calc(100% - 60px);
    margin: 0 10px 20px;
    padding: 20px;
    background-color: #fff;
    border-bottom: solid 1px #AAA;
    border-right: solid 1px #AAA;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
    font-family: 'Montserrat', sans-serif;
`

const Info = ({ english, showInfo, info, setShowInfo }) => {
    return (
        <StyledSection>
            <h1>{showInfo}</h1>
            <p>
                Je certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire :
            </p>
            <StyledBlock>{info[showInfo]}</StyledBlock>
            <StyledButton onClick={() => setShowInfo("")}>
                {english ? "Back" : "Retour"}
            </StyledButton> 
        </StyledSection>
    )
}

export default Info
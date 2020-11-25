
import styled from 'styled-components'
import StyledButton from './styles/StyledButton'
import FAQ from './FAQ'

const StyledInstructions = styled.div`
    position: absolute;
    top: 60px;
    background-color: #eee;
    overflow-y: auto;
    width: 100%;
    padding-top: 30px;
    height: calc(100% - 60px);
    transition: all 200ms linear;
    transform: translateX(${props => props.showInstructions ? "0" : "-100%"});
    h1 {
        font-size: 32px;
        line-height: 40px;
        font-weight: 900;
        letter-spacing: 1.25px;
        color: #205ddb;
        text-align: center;
        margin: 30px 0 6px 0;
        padding: 0 20px;
    }
    p, h4 {
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #464646;
        margin: 0 auto;
        padding: 0;
        width: calc(100% - 60px);
        min-width: 240px;
        font-weight: normal;
        strong {
            font-weight: bold;
            font-style: italic;
        }
    }
    h4 {
        font-size: 14px;
    }
`

const Instructions = ({ content, showInstructions, setShowInstructions, language }) => {
    return (
        <StyledInstructions showInstructions={showInstructions}>
            <h4>
                {content["Generate your"][language]}<br />
                <strong>Attestation de déplacement dérogatoire</strong>
            </h4>
            <h1>
            {content["SUPER FAST"][language]}
            </h1> 
            <p>
                {content["Enter your info just"][language]}&nbsp;
                <strong>{content["once"][language]}</strong>.&nbsp;
                {content["Then, create an Attestation in"][language]}&nbsp;  
                <strong>{content["one tap"][language]}</strong>.
            </p>
            <h1>
                {content["TOTAL PRIVACY"][language]}
            </h1>
            <p>
                {content["Your info is"][language]}&nbsp;
                <strong>{content["only"][language]}</strong>&nbsp;  
                {content["stored on"][language]}&nbsp;
                <strong>{content["your device"][language]}</strong>&nbsp;
                {content["and never seen, sent, or sold to"][language]}&nbsp;
                <strong>{content["anyone"][language]}</strong>.
            </p>
            <StyledButton type="button" onClick={() => setShowInstructions(false)}>
                {content["LET'S GO"][language]}
            </StyledButton>
            <FAQ language={language} />
        </StyledInstructions>
    )
}

export default Instructions
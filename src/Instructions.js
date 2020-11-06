
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
        padding: 0;
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

const Instructions = ({ showInstructions, setShowInstructions, english, setEnglish }) => {
    return (
        <StyledInstructions showInstructions={showInstructions}>
            <h4>
               {english ? "Generate your" : "Générez votre"}<br />
                <strong>Attestation de déplacement dérogatoire</strong>
            </h4>
            <h1>
                {english ? "SUPER FAST" : "SUPER RAPIDE"}
            </h1>
            {english ? 
            <p>
                Enter your info just <strong>once</strong>. Then, create an Attestation in <strong>one tap</strong>.
            </p> : 
            <p>
                Entrez vos informations <strong>une seule fois</strong>. Ensuite, créez une attestation en <strong>un seul clic</strong>.
            </p>}
            <h1>
                {english ? "TOTAL PRIVACY" : "CONFIDENTIALITÉ TOTALE"}
            </h1>
            {english ? 
            <p>
                Your info is <strong>only</strong> stored on <strong>your device</strong> and never seen, sent, or sold to <strong>anyone</strong>.
            </p> :
            <p>
                Vos informations sont <strong>uniquement</strong> stockées sur <strong>votre appareil</strong> et ne sont jamais vues, envoyées ou vendues à <strong>personne</strong>.
            </p>}
            <StyledButton type="button" onClick={() => setShowInstructions(false)}>
                {english ? 
                    "Let's Go" : 
                    "Allons-y"
                }
            </StyledButton>
            <FAQ english={english} setEnglish={setEnglish} />
        </StyledInstructions>
    )
}

export default Instructions
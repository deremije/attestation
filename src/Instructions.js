
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
        width: calc(100% - 80px);
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
                Generate your <br />
                <strong>Attestation de deplacement derogatoire</strong>
            </h4>
            <h1>
                SUPER FAST
            </h1>
            <p>
                Enter your info just <strong>once</strong>. Then, create an Attestation in just <strong>one tap</strong>
            </p>
            <h1>
                TOTAL PRIVACY
            </h1>
            <p>
                Your info is <strong>only</strong> stored on <strong>your device</strong> and never sent to <strong>anyone</strong>
            </p>
            <StyledButton type="button" onClick={() => setShowInstructions(false)}>
                {english ? 
                    "Let's Go" : 
                    "On Y Va"
                }
            </StyledButton>
            <FAQ english={english} setEnglish={setEnglish} />
        </StyledInstructions>
    )
}

export default Instructions
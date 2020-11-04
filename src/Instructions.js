
import styled from 'styled-components'
import StyledButton from './styles/StyledButton'
import FAQ from './FAQ'

const StyledInstructions = styled.div`
    position: relative;
    background-color: #eee;
    overflow-y: auto;
    width: 100%;
    padding-top: 30px;
    /* animation: slide_in_right 200ms linear;
    @keyframes slide_in_right {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    @keyframes slide_out_left {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    } */
    h1 {
        font-size: 32px;
        line-height: 40px;
        font-weight: 900;
        letter-spacing: 1.25px;
        color: #205ddb;
        text-align: center;
        margin: 40px 0 10px 0;
        padding: 0;
    }
    p {
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #464646;
        margin: 0 auto;
        padding: 0;
        width: calc(100% - 80px);
        min-width: 240px;
        strong {
            font-weight: bold;
            font-style: italic;
        }
    }
`

const Instructions = ({ instructionsTransition, english, transitionToMain, setEnglish }) => {
    return (
        <StyledInstructions transition={instructionsTransition}>
            <p>
                Generate your <br />
                <strong>Attestation de deplacement derogatoire</strong>
            </p>
            <h1>
                SUPER FAST
            </h1>
            <p>
                You only enter your info <strong>once</strong>. Afterwards, you can simply create an Attestation in <strong>one tap</strong>
            </p>
            <h1>
                TOTAL PRIVACY
            </h1>
            <p>
                Your info is <strong>only</strong> stored on <strong>your device</strong> and not sent to <strong>anyone</strong>
            </p>
            <StyledButton type="button" onClick={transitionToMain}>
                {english ? 
                    "Get Started" : 
                    "Get Started"
                }
            </StyledButton>
            <FAQ english={english} setEnglish={setEnglish} />
        </StyledInstructions>
    )
}

export default Instructions
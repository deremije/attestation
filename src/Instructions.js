
import styled from 'styled-components'
import StyledButton from './styles/StyledButton'
import FAQ from './FAQ'

const StyledInstructions = styled.div`
    position: absolute;
    background-color: #eee;
    overflow-y: auto;
    top: 40px;
    left: 0;
    width: 100%;
    height: calc(100% - 40px);
    padding-bottom: 0px;
    font-family: 'Monserrat', sans-serif;
    h3 {
        padding: 10px 10px 20px;
        margin: 0;
        font-size: 26px;
        font-family: 'Merriweather', serif;
    }
    h4 {
        margin: 0;
        padding: 20px 10px 0;
        font-size: 18px;
    }
    p {
        width: calc(100% - 80px);
        padding: 0px 40px;
        font-size: 18px;
        text-align: left;
    }
    ol {
        font-weight: bold;
        margin: 25px auto;
        line-height: 20px;
        text-align: left;
        padding: 0px 60px;
        font-size: 20px;
        li {
            margin: 10px 0;
            line-height: 32px;
        }
    }
`

const Instructions = ({ english, setShowInstructions }) => {
    return (
        <StyledInstructions>
            <h4>
                {english ? "Easily generate an" : "Générez facilement votre"}
            </h4>
            <h3>
                Attestation de Deplacement Derogatoire
            </h3>
            <ol>
                <li>
                    {english ? "Save your identity details" : "Enregistrez vos données d'identité"}
                </li>
                <li>
                    {english ? "Choose your reason to be out" : "Choisissez votre raison de sortir"}
                </li>
            </ol>
            <p>
                {english ? "Your attestation is saved automatically to your device. And the next time you need one, you can skip step 1!" : "Votre attestation est enregistrée automatiquement sur votre appareil. Et la prochaine fois que vous en aurez besoin, vous pourrez sauter la première étape !"}
            </p>
            <StyledButton type="button" onClick={() => setShowInstructions(false)}>
                {english ? "Got It" : "D'accord"}
            </StyledButton>
            <FAQ english={english} />
        </StyledInstructions>
    )
}

export default Instructions
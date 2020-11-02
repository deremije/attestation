import styled from 'styled-components'
import StyledTitle from './styles/StyledTitle'

const StyledReasonButtons = styled.div`
    width: 100%;
    height: calc(100% - 92px);
    display: flex;
    flex-direction: column;
    position: relative;
    button {
        display: grid;
        grid-template-columns: 50px 1fr 40px;
        width: calc(100% - 40px);
        padding: 0 20px 2px;
        border: none;
        border-bottom: solid 1px #AAA;
        margin: 3px auto;
        height: 10%;
        position: relative;
        font-size: 20px;
        font-weight: 400;
        font-family: 'Merriweather', serif;
        text-align: left;
        background-color: transparent;
        div {
            height: 24px;
            line-height: 24px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            span {
                width: 14px;
                height: 14px;
                border: solid 2px gray;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                position: relative;
                top: 50%;
                left: 50%;
                color: gray;
                font-size: 10px;
                font-weight: bold;
                line-height: 14px;
                text-align: center;
                display: block;
            }
        }
    }
`

const ExecuteButtons = ({ buttons, english, attemptPDF, setShowInfo }) => {
    return (
        <StyledReasonButtons>
            <StyledTitle>
                {english ? "Choose Motive to Create Attestation" : "Choisissez un motif pour créer une attestation"}
            </StyledTitle>
            {buttons.map(b => 
                <button>
                    <div onClick={() => attemptPDF(b.reason)}>
                        {b.emoji}
                    </div>
                    <div onClick={() => attemptPDF(b.reason)}>
                        {english ? b.english : b.french}
                    </div>
                    <div>
                        <span className='info' onClick={() => setShowInfo(b.french)}>i</span>
                    </div>
                </button>
            )}
        </StyledReasonButtons>
    )
}

export default ExecuteButtons
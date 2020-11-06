import styled from 'styled-components'

const StyledReasonButtons = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    transition: all 200ms;
    background-color: #eee;
    height: ${props => props.showReasons ? "calc(100% - 120px)" : "0"};
    button {
        display: flex;
        width: calc(100vw / 3);
        height: calc(100vw / 3);
        border: none;
        position: relative;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        background-color: transparent;
        div {
            margin: auto;
            height: 62px;
            line-height: 42px;
            font-size: 30px;
            position: relative;
            span {
                height: 20px;
                display: block;
                line-height: 20px;
                font-size: 14px;
                font-weight: bold;
            }
        }
        
    }
`
const StyledInfoLink = styled.div`
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #3c70e0;
    text-decoration: underline;
    grid-column: 1 / span 3;
    background-color: #eee;
`

const ExecuteButtons = ({ reasons, setShowDescriptions, english, attemptPDF, setShowInfo, showReasons }) => {
    
    return (
        <StyledReasonButtons showReasons={showReasons}>
            {reasons.map(b => 
                <button onClick={() => attemptPDF(b.reason)}>
                    <div>
                        {b.emoji}
                        <span>
                            {english ? b.english : b.french}
                        </span>
                    </div>
                </button>
            )}
            <StyledInfoLink onClick={() => setShowDescriptions(true)}>
                {english ? "Which reason should I choose?" : "Quelle raison devrais-je choisir ?"}
            </StyledInfoLink>
        </StyledReasonButtons>
    )
}

export default ExecuteButtons
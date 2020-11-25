import StyledButton from "./styles/StyledButton"
import styled from 'styled-components'

const StyledDescriptions = styled.section`
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px 0 40px;
    background-color: #fff;
    overflow-y: auto;
    transform: translateX(${props => props.showDescriptions ? "0%" : "100%"});
    transition: all 200ms linear;
    div {
        width: calc(100% - 40px);
        margin: auto;
        text-align: left;
        padding: 20px 0;
        .icon {
            font-size: 32px;
            line-height: 32px;
            width: 80px;
            display: inline-block;
            background-color: #ddd;
            text-align: center;
            padding: 20px 0;
        }
        .title {
            font-size: 20px;
            font-weight: bold;
            line-height: 32px;
            padding: 0 10px;
        }
        p {
            font-size: 16px;
            text-align: left;
        }
    }    
`

const Info = ({ language, content, setShowDescriptions, attemptPDF, reasons, showDescriptions }) => {
    const choose = (reason) => {
        attemptPDF(reason)
        setShowDescriptions(false)
    }
    return (
        <StyledDescriptions showDescriptions={showDescriptions}>
            {reasons.map(b => 
                <div key={b.french}>
                    <span className='icon' onClick={() => choose(b.reason)}>{b.emoji}</span>
                    <span className='title'>{b[language]}</span>
                    <p>
                        {b.description[language]}
                    </p>
                </div>
            )}
            
            <StyledButton onClick={() => setShowDescriptions(false)}>
                {content["Back"][language]}
            </StyledButton> 
        </StyledDescriptions>
    )
}

export default Info
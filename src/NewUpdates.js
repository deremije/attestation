import styled from 'styled-components'

const StyledUpdates = styled.section`
    width: calc(100% - 80px);
    height: auto;
    max-height: 80%;
    overflow-y: auto;
    padding:  0 20px;
    background-color: white;
    border: solid 2px black;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    ul {
        font-size: 14px;
        text-align: left;
    }
`

const NewUpdates = ({ version, content, language, setShowUpdates }) => {
    const dismiss = () => {
        window.localStorage.setItem('version', version)
        setShowUpdates(false)
    }
    const noMoreUpdates = () => {
        window.localStorage.setItem('noUpdateNotes', 'true')
        dismiss()
    }
    return (
        <StyledUpdates>
            <p>Sortir.io v3 ({content["25 November 2020"][language]})</p>
            <p>
            {content["New in this release:"][language]}
                <ul>
                    <li>{content["You can now set a custom time before generating your attestation from the bottom of the icons screen."][language]}</li>
                    <li>{content["Sortir.io now supports Spanish, Italian, and German.  Please email"][language]} <a href="mailto:feedback@sortir.io">feedback@sortir.io</a> {content["with suggestions to improve the translations, or to request another language."][language]}</li>
                    <li>{content["When you create an attestation for exercise, you'll now get an automatic timer that tells you how long you have left. You can also activate GPS so that it will tell you if you're outside of your allowed radius. As with all other data on Sortir.io, nothing is seen, sent, or sold to anyone. Only you have access to your location data."][language]}</li>
                    <li>{content["You can create custom links using the URI to make Sortir.io even faster. Find full details in the FAQ."][language]}</li>
                    <li>{content["I will continue to support this site as long as people are using it, so please share Sortir.io with your friends and family!"][language]}</li>               
                </ul>
            </p>
            <p style={{'color':'blue'}} onClick={dismiss}>
                {content["Ok, thanks"][language]}
            </p>
            <p style={{'color':'blue'}} onClick={noMoreUpdates}>
                {content["Never show me update notes"][language]}
            </p>
        </StyledUpdates>
    )
}

export default NewUpdates
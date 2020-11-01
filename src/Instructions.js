import { useState } from 'react'
import styled from 'styled-components'
import StyledButton from './styles/StyledButton'

const StyledInstructions = styled.div`
    position: absolute;
    background-color: #eee;
    overflow-y: auto;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 20px);
    padding-bottom: 20px;
    font-family: 'Monserrat', sans-serif;
    h3, h4 {
        padding: 5px;
        margin: 0;
    }
    h4 {
        font-family: 'Merriweather', serif;
        font-size: 15px;
    }
    p {
        width: calc(100% - 40px);
        padding: 0px 20px;
        font-size: 14px;
        text-align: left;
    }
`
const StyledOrderedList = styled.ol`
    font-weight: bold;
    margin: 5px auto;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    li {
        margin: 5px 0;
    }
`
const StyledFAQ = styled.h5`
    background-color: #fff;
    text-align: left;
    width: calc(100% - 50px);
    margin: 20px auto 10px;
    padding: 5px;
    color: #3c70e0;
    text-decoration: underline;
    cursor: pointer;
`
const StyledAnswer = styled.div`
    width: calc(100% - 60px);
    padding: 0px 20px 0 40px;
    font-size: 14px;
    text-align: left;
`

const Instructions = ({ english, setShowInstructions }) => {
    const [faq1, setFaq1] = useState(false)
    const [faq2, setFaq2] = useState(false)
    const [faq3, setFaq3] = useState(false)
    const [faq4, setFaq4] = useState(false)
    return (
        <StyledInstructions>
            <h3>
                {english ? "Generate your" : "Générez votre"}
            </h3>
            <h4>
                Attestation de Deplacement Derogatoire
            </h4>
            <h3>
                {english ? "in 2 steps or fewer:" : "en 2 étapes ou moins"}
            </h3>
            <StyledOrderedList>
                <li>
                    {english ? "Save your identity details" : "Enregistrez vos données d'identité"}
                </li>
                <li>
                    {english ? "Choose your reason to be out" : "Choisissez votre raison de sortir"}
                </li>
            </StyledOrderedList>
            <p>
                {english ? "Your attestation is saved automatically to your device. And the next time you need one, you can skip step 1!" : "Votre attestation est enregistrée automatiquement sur votre appareil. Et la prochaine fois que vous en aurez besoin, vous pourrez sauter la première étape !"}
            </p>
            <StyledButton type="button" onClick={() => setShowInstructions(false)}>
                {english ? "Got It" : "D'accord"}
            </StyledButton>
            <StyledFAQ onClick={() => setFaq1(faq1 ? false : true)}>
                {english ? "What is" : "Qu'est-ce que"} Sortir.io ?</StyledFAQ>
            {faq1 ? english ? 
            <StyledAnswer>
                Sortir.io is a quick attestation generator to help you when you need to go out during lockdown in France. You only need to enter your identity details once. Then each time you return, just tap on the reason you're going out and an attestation will be generated immediately.
            </StyledAnswer> : 
            <StyledAnswer>    
                Sortir.io est un générateur d'attestations rapide pour vous aider lorsque vous devez sortir pendant un lockdown en France. Vous n'avez à saisir vos données d'identité qu'une seule fois. Ensuite, à chaque retour, il vous suffit d'appuyer sur le motif vous sortez et une attestation sera générée immédiatement. 
            </StyledAnswer> : ""}
            <StyledFAQ onClick={() => setFaq2(faq2 ? false : true)}>
                {english ? "Is this a mobile app?" : "S'agit-il d'une application mobile ?"}
            </StyledFAQ>
            {faq2 ? english ? 
            <StyledAnswer> 
                Sortir.io is a website, but it is intended to be used on your phone. Go to https://sortir.io on your mobile device, then choose "Add to Home Screen" from your browser menu to save it as an App. If you are using a computer and want to print an attestation, we recommend using <a href="https://media.interieur.gouv.fr/deplacement-covid-19/" target="_blank" rel="noreferrer">this</a>.
            </StyledAnswer> :
            <StyledAnswer>
                Sortir.io est un site web, mais il est destiné à être utilisé sur votre téléphone. Rendez-vous sur https://sortir.io sur votre appareil mobile, puis choisissez "Ajouter à l'écran d'accueil" dans le menu de votre navigateur pour l'enregistrer sous forme d'application. Si vous utilisez un ordinateur et que vous souhaitez imprimer une attestation, <a href="https://media.interieur.gouv.fr/deplacement-covid-19/" target="_blank" rel="noreferrer">nous vous recommandons de l'utiliser</a>.
            </StyledAnswer> : ""}
            <StyledFAQ onClick={() => setFaq3(faq3 ? false : true)}>
                {english ? "How does it work?" : "Comment cela fonctionne-t-il ?"}
            </StyledFAQ>
            {faq3 ? english ? 
            <StyledAnswer> 
                Sortir.io saves your identity details to your browser's local storage, which means that until you clear
                your cache, it can keep the form filled in for you.  It also means that none of your data is transmitted
                anywhere, so it's entirely safe to use.
            </StyledAnswer> :
            <StyledAnswer>
                Sortir.io enregistre vos données d'identité dans la mémoire locale de votre navigateur, ce qui signifie que tant que vous n'avez pas vidé votre cache, il peut conserver le formulaire rempli pour vous. Cela signifie également qu'aucune de vos données n'est transmise, ce qui rend leur utilisation tout à fait sûre.
            </StyledAnswer> : ""}
            <StyledFAQ onClick={() => setFaq4(faq4 ? false : true)}>
                {english ? "How do I find my attestation?" : "Comment puis-je trouver mon attestation ?"}
            </StyledFAQ>
            {faq4 ? english ?
            <StyledAnswer>
                When you click any reason button to generate your attestation, it will be downloaded to your device.
                Each device shows this differently. Check your notifications first, but it may not appear there. 
                On Android phones, open "Files" and it will usually be the first file listed (unless you've
                downloaded something else since creating the attestation).
            </StyledAnswer> :
            <StyledAnswer>
                Lorsque vous choisissez une raison quelconque pour générer votre attestation, celle-ci sera téléchargée sur votre appareil. Chaque appareil le montre différemment. Vérifiez d'abord vos notifications, mais il se peut qu'elles n'y apparaissent pas. Sur les téléphones Android, ouvrez "Fichiers" et ce sera généralement le premier fichier listé (à moins que vous n'ayez téléchargé autre chose depuis la création de l'attestation).
            </StyledAnswer> : ""}
        </StyledInstructions>
    )
}

export default Instructions
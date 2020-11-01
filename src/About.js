import StyledButton from "./styles/StyledButton"
import StyledSection from "./styles/StyledSection"

const About = ({ english, setShowAbout }) => {
    return (
        <StyledSection>
            
        {english ? 
        <div>
            <p>
                Sortir.io was built by <a href='https://jeremyrandall.dev' target="_blank" rel="noreferrer">Jeremy Randall</a>, a Web Developer
                living in Lyon. Please email feedback to <a href="mailto:feedback@sortir.io">feedback@sortir.io</a>. 
            </p>
            <p>
                Use of this tool is ABSOLUTELY FREE, but if you really want to say thanks you can <a href="https://www.buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">buy me a coffee</a>. 
            </p>
            <p>
                The source code is available on <a href="https://github.com/deremije/attestation" target="_blank" rel="noreferrer">Github</a>.  It is based on the original attestation 
                generator, which can be found <a href="https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020" target="_blank" rel="noreferrer">here</a>.
            </p>
            <p>
                <img src="/favicon-16x16.png" /> Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">flaticon.com</a> 
            </p>
            
            <StyledButton onClick={() => setShowAbout(false)}>Back</StyledButton>
        </div> : 
        <div>
            <p>
                Sortir.io a été construit par <a href='https://jeremyrandall.dev' target="_blank" rel="noreferrer">Jeremy Randall</a>, un développeur Web vivant à Lyon. Veuillez envoyer vos commentaires par courriel à <a href="mailto:feedback@sortir.io">feedback@sortir.io</a>. 
            </p>
            <p>
                L'utilisation de cet outil est ABSOLUMENT GRATUITE, mais si vous voulez vraiment me remercier, vous pouvez <a href="https://www.buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">m'offrir un café</a>. 
            </p>
            <p>
                Le code source est disponible sur <a href="https://github.com/deremije/attestation" target="_blank" rel="noreferrer">Github</a>. Il est basé sur le générateur d'attestation original, <a href="https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020" target="_blank" rel="noreferrer">que vous pouvez trouver ici</a>.
            </p>
            <p>
                <img src="/favicon-16x16.png" /> Icône réalisée par <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> de <a href="https://www.flaticon.com/" title="Flaticon">flaticon.com</a> 
            </p>
            
            <StyledButton onClick={() => setShowAbout(false)}>Retour</StyledButton>
        </div>}

        </StyledSection>
    )
}

export default About
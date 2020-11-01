const About = ({ setShowAbout }) => {
    return (
        <div className="modal">
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
            
            <button type="button" onClick={() => setShowAbout(false)}>Back</button>
        </div>
    )
}

export default About
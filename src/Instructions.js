const Instructions = ({ setShowInstructions }) => {
    return (
        <div className="modal instructions">
            <h1>
                Sortir.io
            </h1>
            <h3>
                Quick Generator for L'Attestation de Deplacement Derogatoire
            </h3>
            <p className='important'>
                Please read these instructions once, and they will never appear again.
            </p>
            <p className='bullet-points'>
                How to use Sortir.io:
                <ol>
                    <li>
                        Save your identity details
                    </li>
                    <li>
                        Choose your reason to be out
                    </li>
                    <li>
                        Present your downloaded attestation to authorities who request it
                    </li>
                </ol>
            </p>
            <button type="button" onClick={() => {setShowInstructions(false)}}>Got It</button>
            <p>
                Sortir.io is a quick attestation generator to help you when you need to go out during lockdown in France.
                You only need to enter your personal details once. Then each time you return, just tap on the reason
                you're going out and an attestation will be generated immediately. 
            </p>
            <p>    
                Sortir.io is intended to be used on your phone. Go to https://sortir.io on your mobile 
                device, then choose "Add to Home Screen" from your browser menu to save it as an App. If you are using
                a computer and want to print an attestation, we recommend using <a href="https://media.interieur.gouv.fr/deplacement-covid-19/" target="_blank" rel="noreferrer">this</a>.
            </p>
            <p> 
                Sortir.io saves your personal data to your browser's local storage, which means that until you clear
                your cache, it can keep the form filled in for you.  It also means that none of your data is transmitted
                anywhere, so it's entirely safe to use.
            </p>
            <p>
                Get started by filling out the form on the next screen.  After you click "Save & Continue" just click any reason 
                button to generate your attestation.  It will be downloaded to your device so that you can present it if 
                stopped by authorities. On Android phones, open "Files" and it will usually be the first file listed (unless you've
                downloaded something else since creating the attestation).
            </p>
            <p>
                Please wear a mask in all public places, observe social distancing
                by staying at least 1 meter from other people, use hand sanitizer, 
                and wash your hands frequently.  Taking precautions will save lives -
                possibly even your own.
            </p>
        </div>
    )
}

export default Instructions
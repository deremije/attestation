import styled from 'styled-components'
import { useState } from 'react'

const StyledFAQ = styled.section`
    padding-top: 8px;
    padding-bottom: 40px;
    background-color: #fff;
    margin-top: 20px;
`
const StyledLangLink = styled.div`
    width: calc(100% - 20px);
    margin: 10px auto 30px;
    background-color: #C2F39C;
    color: #2A5508;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    padding: 20px 0;
    span {
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
    }
`
const StyledQA = styled.div`
    border-bottom: solid 1px #EDEDED;
    width: calc(100% - 60px);
    margin: auto;
    padding: 10px 0;
    h5 {
        text-align: left;
        width: 100%;
        margin: 10px auto;
        /* padding: 10px; */
        color: #3c70e0;
        text-decoration: underline;
        cursor: pointer;
        font-size: 18px;
    }
    div {
        width: calc(100% - 20px);
        padding: 0px 20px 10px 0px;
        font-size: 16px;
        line-height: 24px;
        text-align: left;
    }
`


const FAQ = ({english, setEnglish}) => {
    const frequentlyAskedQuestions = [
        {
            visible: false,
            en: {
                q: "What is Sortir.io?",
                a() {return <span>Sortir.io is a quick attestation generator to help you when you need to go out during lockdown in France. You only need to enter your identity details once. Then each time you return, just tap on the reason you're going out and an attestation will be generated immediately.</span>},
            },
            fr: {
                q: "Qu'est-ce que c'est, Sortir.io ?",
                a() {return <span>Sortir.io est un générateur d'attestations rapide pour vous aider lorsque vous devez sortir pendant un confinement en France. Vous n'avez à saisir vos données d'identité qu'une seule fois. Ensuite, à chaque retour, il vous suffit d'appuyer sur l'icône que vous voulez et une attestation sera générée immédiatement. </span>}
            }
        },
        {
            visible: false,
            en: {
                q: `Is this secure? Who can see my information?`,
                a() {return <span>Nobody can see your information except you, because it is only stored in your phone's web browser. No data is collected by Sortir.io.</span>}
            },
            fr: {
                q: `Est-ce securisé? Qui peut voir mes informations?`,
                a() {return <span>Personne ne peut voir vos informations sauf vous. Les données ne sont stockées que dans le navigateur Web de votre téléphone et ne sont jamais transmises à un serveur.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `Is Sortir.io free?`,
                a() {return <span>Yes, it's completely free and it always will be. However, if you really want to say thanks you can <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">buy me a coffee.</a></span>}
            },
            fr: {
                q: `Est-ce que Sortir.io est gratuit?`,
                a() {return <span>Oui, c'est totalement gratuit et ça le sera toujours. Cependant, si vous voulez vraiment me remercier, <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">vous pouvez m'offrir un café.</a></span>}
            }
        },
        {
            visible: false,
            en: {
                q: `How does it work?`,
                a() {return <span>Sortir.io saves your identity details to your browser's local storage, which means that until you clear
                your cache, it can keep the form filled in for you.</span>}
            },
            fr: {
                q: `Comment cela fonctionne-t-il ?`,
                a() {return <span>Sortir.io enregistre vos données d'identité dans la mémoire locale de votre navigateur, ce qui signifie que tant que vous n'avez pas vidé votre cache, il peut conserver le formulaire que vous avez rempli.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `How do I find my attestation?`,
                a() {return <span>When you tap a reason, your attestation will be downloaded to your device.
                    Each device shows this differently. Check your notifications first, but it may not appear there. 
                    On Android phones, open "Files" and it will usually be the first file listed (unless you've
                    downloaded something else since creating the attestation).</span>}
            },
            fr: {
                q: `Où puis-je trouver mon attestation ?`,
                a() {return <span>Lorsque vous choisissez une raison, votre attestation sera téléchargée sur votre appareil. Chaque appareil fonctionne différemment. Vérifiez d'abord vos notifications, mais il se peut qu'elles n'y apparaissent pas. Sur les téléphones Android, ouvrez "Fichiers" et ce sera généralement le premier fichier listé (à moins que vous n'ayez téléchargé autre chose depuis la création de l'attestation).</span>}
            }
        },
        {
            visible: false,
            en: {
                q: "Is this a mobile app?",
                a() {return <span>Sortir.io is a website, but it is intended to be used on your phone. Go to https://sortir.io on your mobile device, then choose "Add to Home Screen" from your browser menu to save it as an App.</span>}
            },
            fr: {
                q: "S'agit-il d'une application mobile ?",
                a() {return <span>Sortir.io est un site web, mais il est destiné à être utilisé sur votre téléphone. Rendez-vous sur https://sortir.io sur votre appareil mobile, puis choisissez "Ajouter à l'écran d'accueil" dans le menu de votre navigateur pour l'enregistrer sous forme d'application.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `I like this! How can I help?`,
                a() {return <span>This project is open source, so you can <a href="https://github.com/deremije/attestation">make a pull request from Github</a>. You can also help by emailing bugs, suggestions and other comments to <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            },
            fr: {
                q: `J'aime ça ! Comment puis-je vous aider ?`,
                a() {return <span>Ce projet est open source, vous pouvez donc <a href="https://github.com/deremije/attestation">faire une demande de retrait auprès de Github</a>. Vous pouvez également nous aider en envoyant des bogues, des suggestions et d'autres commentaires par courriel à <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `Who made Sortir.io?`,
                a() {return <span>Sortir.io was created and is maintained by <a href="https://jeremyrandall.dev">Jeremy Randall</a>, a web developer in Lyon. UX and UI design by <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
            fr: {
                q: `Qui a créé Sortir.io ?`,
                a() {return <span>Sortir.io a été créé et est maintenu par <a href="https://jeremyrandall.dev">Jeremy Randall</a>, un développeur web à Lyon. UX et UI design par <a href="https://shannou.com">Shannon Randall</a>.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `How can I find the French government's official attestation generator?`,
                a() {return <span>We actually use that as part of this site! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Here is their site</a>.</span>}
            },
            fr: {
                q: `Comment puis-je trouver le générateur d'attestations officiel du gouvernement français ?`,
                a() {return <span>Nous l'utilisons en fait dans le cadre de ce site ! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Voici leur site</a>.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `Where did you get that nifty COVID icon?`,
                a() {return <span>The icon was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href='https://flaticon.com'>flaticon.com</a>.</span>}
            },
            fr: {
                q: `Où avez-vous trouvé cette belle icône COVID ?`,
                a() {return <span>L'icône a été réalisée par <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> de <a href='https://flaticon.com'>flaticon.com</a></span>}
            }
        },
    ]
    const lang = english ? "en" : "fr"
    const [faq, setFaq] = useState([...frequentlyAskedQuestions])
    const toggleFaq = (entry) => {
        let newFaq = [...faq]
        for (let en of newFaq) {
            if (JSON.stringify(en) === entry) en.visible = !en.visible
        }
        setFaq(newFaq)
    }
    return (
        <StyledFAQ>
            {english ? 
                <StyledLangLink>Voir Sortir.io en <span onClick={() => setEnglish(false)}>français</span></StyledLangLink> :
                <StyledLangLink>Show Sortir.io in <span onClick={() => setEnglish(true)}>English</span></StyledLangLink> }
            {faq.map(entry => 
                <StyledQA key={JSON.stringify(entry)}> 
                    <h5 onClick={() => toggleFaq(JSON.stringify(entry))}>
                        {entry[lang].q}
                    </h5> 
                { entry.visible ? 
                    <div>
                        {entry[lang].a()}
                    </div> : ""}
                </StyledQA>
            )}
        </StyledFAQ>
    )
}

export default FAQ
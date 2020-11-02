import styled from 'styled-components'
import { useState } from 'react'

const StyledQuestion = styled.h5`
    background-color: #fff;
    text-align: left;
    width: calc(100% - 60px);
    margin: 25px auto 10px;
    padding: 10px;
    color: #3c70e0;
    text-decoration: underline;
    cursor: pointer;
    font-size: 18px;
`
const StyledAnswer = styled.div`
    width: calc(100% - 60px);
    padding: 0px 20px 0 40px;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
`


const FAQ = ({english}) => {
    const frequentlyAskedQuestions = [
        {
            visible: false,
            en: {
                q: "What is Sortir.io?",
                a() {return <span>Sortir.io is a quick attestation generator to help you when you need to go out during lockdown in France. You only need to enter your identity details once. Then each time you return, just tap on the reason you're going out and an attestation will be generated immediately.</span>},
            },
            fr: {
                q: "Qu'est-ce que Sortir.io ?",
                a() {return <span>Sortir.io est un générateur d'attestations rapide pour vous aider lorsque vous devez sortir pendant un lockdown en France. Vous n'avez à saisir vos données d'identité qu'une seule fois. Ensuite, à chaque retour, il vous suffit d'appuyer sur le motif vous sortez et une attestation sera générée immédiatement. </span>}
            }
        },
        {
            visible: false,
            en: {
                q: `Is this safe? Who can see my information?`,
                a() {return <span>Nobody can see your information except you. Data is only stored in your phone's web browser, and never transmitted to a server.</span>}
            },
            fr: {
                q: `Est-ce sûr? Qui peut voir mes informations?`,
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
                a() {return <span>Sortir.io enregistre vos données d'identité dans la mémoire locale de votre navigateur, ce qui signifie que tant que vous n'avez pas vidé votre cache, il peut conserver le formulaire rempli pour vous.</span>}
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
                q: `Comment puis-je trouver mon attestation ?`,
                a() {return <span>Lorsque vous choisissez une raison, votre attestation sera téléchargée sur votre appareil. Chaque appareil le montre différemment. Vérifiez d'abord vos notifications, mais il se peut qu'elles n'y apparaissent pas. Sur les téléphones Android, ouvrez "Fichiers" et ce sera généralement le premier fichier listé (à moins que vous n'ayez téléchargé autre chose depuis la création de l'attestation).</span>}
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
                a() {return <span>Sortir.io was created and is maintained by <a href="https://jeremyrandall.dev">Jeremy Randall</a>, a web developer in Lyon.</span>}
            },
            fr: {
                q: `Qui a créé Sortir.io ?`,
                a() {return <span>Sortir.io a été créé et est maintenu par <a href="https://jeremyrandall.dev">Jeremy Randall</a>, un développeur web à Lyon.</span>}
            }
        },
        {
            visible: false,
            en: {
                q: `How can I find the French government's official attestation generator?`,
                a() {return <span>We actually use that as part of this site! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Here is their site</a>.</span>}
            },
            fr: {
                q: `Comment puis-je trouver le générateur d'attestations officielles du gouvernement français ?`,
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
        <div style={{"paddingBottom": "60px"}}>
            {faq.map(entry => <div> 
                <StyledQuestion onClick={() => toggleFaq(JSON.stringify(entry))}>
                    {entry[lang].q}
                </StyledQuestion> 
                { entry.visible ? 
                    <StyledAnswer>
                        {entry[lang].a()}
                    </StyledAnswer> : ""}
                </div>
            )}
        </div>
    )
}

export default FAQ
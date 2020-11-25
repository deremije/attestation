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


const FAQ = ({language}) => {
    const frequentlyAskedQuestions = [
        {
            visible: false,
            english: {
                q: "What is Sortir.io?",
                a() {return <span>Sortir.io is a quick attestation generator to help you when you need to go out during lockdown in France. You only need to enter your identity details once. Then each time you return, just tap on the reason you're going out and an attestation will be generated immediately.</span>},
            },
            french: {
                q: "Qu'est-ce que c'est, Sortir.io ?",
                a() {return <span>Sortir.io est un générateur d'attestations rapide pour vous aider lorsque vous devez sortir pendant un confinement en France. Vous n'avez à saisir vos données d'identité qu'une seule fois. Ensuite, à chaque retour, il vous suffit d'appuyer sur l'icône que vous voulez et une attestation sera générée immédiatement. </span>}
            },
            spanish: {
                q: "¿Qué es Sortir.io?",
                a() {return <span>Sortir.io es un generador rápido de atestados para ayudarle cuando necesite salir durante el encierro en Francia. Sólo tienes que introducir tus datos de identidad una vez. Luego, cada vez que regrese, sólo tiene que tocar la razón por la que va a salir y se generará un certificado de inmediato.</span>}
            },
            italian: {
                q: "Cos'è Sortir.io?",
                a() {return <span>Sortir.io è un generatore di attestati rapido per aiutarvi quando avete bisogno di uscire durante il blocco in Francia. È sufficiente inserire i dati di identità una sola volta. Poi, ogni volta che ritornate, basta toccare il motivo per cui state uscendo e un'attestazione sarà generata immediatamente.</span>}
            },
            german: {
                q: "Was ist Sortir.io?",
                a() {return <span>Sortir.io ist ein Schnellbescheinigungsgenerator, der Ihnen hilft, wenn Sie während der Sperrzeit in Frankreich ausgehen müssen. Sie müssen Ihre Identitätsdaten nur einmal eingeben. Jedes Mal, wenn Sie zurückkehren, tippen Sie einfach auf den Grund Ihrer Abreise, und es wird sofort eine Bescheinigung erstellt.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `Is this secure? Who can see my information?`,
                a() {return <span>Nobody can see your information except you, because it is only stored in your phone's web browser. No data is collected by Sortir.io.</span>}
            },
            french: {
                q: `Est-ce securisé ? Qui peut voir mes informations ?`,
                a() {return <span>Personne ne peut voir vos informations sauf vous. Les données ne sont stockées que dans le navigateur Web de votre téléphone et ne sont jamais transmises à un serveur.</span>}
            },
            spanish: {
                q: "¿Esto es seguro? ¿Quién puede ver mi información?",
                a() {return <span>Nadie puede ver tu información excepto tú, porque sólo se almacena en el navegador web de tu teléfono. Ningún dato es recogido por Sortir.io.</span>}
            },
            italian: {
                q: "E' sicuro? Chi può vedere le mie informazioni?",
                a() {return <span>Nessuno può vedere i tuoi dati tranne te, perché sono memorizzati solo nel browser web del tuo telefono. Nessun dato viene raccolto da Sortir.io.</span>}
            },
            german: {
                q: "Ist dies sicher? Wer kann meine Informationen sehen?",
                a() {return <span>Niemand außer Ihnen kann Ihre Informationen sehen, da sie nur im Webbrowser Ihres Telefons gespeichert sind. Es werden keine Daten von Sortir.io gesammelt.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `Does this tell me if I've been around someone with COVID?`,
                a() {return <span>No, it does not.  Download TousAntiCovid from your app store right away, and use it.</span>}
            },
            french: {
                q: `Est-ce que cela me dit si j'ai côtoyé quelqu'un avec le COVID ?`,
                a() {return <span>Non, ce n'est pas le cas.  Téléchargez immédiatement TousAntiCovid sur votre app store et utilisez-le.</span>}
            },
            spanish: {
                q: `¿Esto me dice si he estado cerca de alguien con COVID?`,
                a() {return <span>No, no es así.  Descarga TousAntiCovid de tu tienda de aplicaciones inmediatamente y úsalo.</span>}
            },
            italian: {
                q: `Questo mi dice se sono stato vicino a qualcuno con COVID?`,
                a() {return <span>No, non è vero.  Scaricate subito TousAntiCovid dal vostro app store e utilizzatelo.</span>}
            },
            german: {
                q: `Sagt mir das, ob ich mit jemandem mit COVID zusammen war?`,
                a() {return <span>Nein, tut es nicht.  Laden Sie TousAntiCovid sofort aus Ihrem App Store herunter und verwenden Sie es.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `Is Sortir.io free?`,
                a() {return <span>Yes, it's completely free and it always will be. However, if you really want to say thanks you can <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">buy me a coffee.</a></span>}
            },
            french: {
                q: `Est-ce que Sortir.io est gratuit ?`,
                a() {return <span>Oui, c'est totalement gratuit et ça le sera toujours. Cependant, si vous voulez vraiment me remercier, <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">vous pouvez m'offrir un café.</a></span>}
            },
            spanish: {
                q: "¿Sortir.io está libre?",
                a() {return <span>Sí, es completamente gratis y siempre lo será. Sin embargo, si realmente quieres dar las gracias puedes <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">comprarme un café.</a></span>}
            },
            italian: {
                q: "Sortir.io è libero?",
                a() {return <span>Sì, è completamente gratuito e lo sarà sempre. Tuttavia, se vuoi davvero dire grazie puoi <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">comprarmi un caffè.</a></span>}
            },
            german: {
                q: "Ist Sortir.io frei?",
                a() {return <span>Ja, es ist völlig kostenlos und wird es immer sein. Wenn Sie sich jedoch wirklich bedanken möchten, können Sie mir <a href="https://buymeacoffee.com/jeremyrandall" target="_blank" rel="noreferrer">einen Kaffee kaufen.</a></span>}
            },
        },
        {
            visible: false,
            english: {
                q: `How does it work?`,
                a() {return <span>Sortir.io saves your identity details to your browser's local storage, which means that until you clear
                your cache, it can keep the form filled in for you.</span>}
            },
            french: {
                q: `Comment cela fonctionne-t-il ?`,
                a() {return <span>Sortir.io enregistre vos données d'identité dans la mémoire locale de votre navigateur, ce qui signifie que tant que vous n'avez pas vidé votre cache, il peut conserver le formulaire que vous avez rempli.</span>}
            },
            spanish: {
                q: "¿Cómo funciona?",
                a() {return <span>Sortir.io guarda los detalles de su identidad en el almacenamiento local de su navegador, lo que significa que hasta que despeje su caché, puede mantener el formulario rellenado para usted.</span>}
            },
            italian: {
                q: "Come funziona?",
                a() {return <span>Sortir.io salva i vostri dati identificativi nella memoria locale del vostro browser, il che significa che fino a quando non cancellate la vostra cache, può tenere il modulo compilato per voi.</span>}
            },
            german: {
                q: "Wie funktioniert das?",
                a() {return <span>Sortir.io speichert Ihre Identitätsdaten im lokalen Speicher Ihres Browsers, d.h. bis Sie Ihren Cache löschen, kann Sortir.io das ausgefüllte Formular für Sie aufbewahren.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `How do I find my attestation?`,
                a() {return <span>When you tap a reason, your attestation will be downloaded to your device.
                    Each device shows this differently. Check your notifications first, but it may not appear there. 
                    On Android phones, open "Files" and it will usually be the first file listed (unless you've
                    downloaded something else since creating the attestation).</span>}
            },
            french: {
                q: `Où puis-je trouver mon attestation ?`,
                a() {return <span>Lorsque vous choisissez une raison, votre attestation sera téléchargée sur votre appareil. Chaque appareil fonctionne différemment. Vérifiez d'abord vos notifications, mais il se peut qu'elles n'y apparaissent pas. Sur les téléphones Android, ouvrez "Fichiers" et ce sera généralement le premier fichier listé (à moins que vous n'ayez téléchargé autre chose depuis la création de l'attestation).</span>}
            },
            spanish: {
                q: "¿Cómo encuentro mi certificado?",
                a() {return <span>Cuando usted toca una razón, su certificado será descargado a su dispositivo. Cada dispositivo muestra esto de forma diferente. Revisa tus notificaciones primero, pero puede que no aparezcan allí. En los teléfonos Android, abra "Archivos" y normalmente será el primer archivo de la lista (a menos que haya descargado algo más desde que creó la certificación).</span>}
            },
            italian: {
                q: "Come trovo il mio attestato?",
                a() {return <span>Quando si tocca un motivo, l'attestato viene scaricato sul dispositivo. Ogni dispositivo lo mostra in modo diverso. Controlla prima le tue notifiche, ma potrebbe non apparire. Sui telefoni Android, aprite "File" e di solito sarà il primo file elencato (a meno che non abbiate scaricato qualcos'altro dopo la creazione dell'attestato).</span>}
            },
            german: {
                q: "Wie finde ich meine Bescheinigung?",
                a() {return <span>Wenn Sie auf einen Grund tippen, wird Ihre Bescheinigung auf Ihr Gerät heruntergeladen. Jedes Gerät zeigt dies anders an. Überprüfen Sie zuerst Ihre Bescheinigungen, aber es kann sein, dass sie dort nicht erscheinen. Auf Android-Telefonen öffnen Sie "Dateien", und es wird normalerweise die erste Datei aufgelistet (es sei denn, Sie haben seit der Erstellung der Bescheinigung etwas anderes heruntergeladen).</span>}
            },
        },
        {
            visible: false,
            english: {
                q: "Is this a mobile app?",
                a() {return <span>Sortir.io is a website, but it is intended to be used on your phone. Go to https://sortir.io on your mobile device, then choose "Add to Home Screen" from your browser menu to save it as an App.</span>}
            },
            french: {
                q: "S'agit-il d'une application mobile ?",
                a() {return <span>Sortir.io est un site web, mais il est destiné à être utilisé sur votre téléphone. Rendez-vous sur https://sortir.io sur votre appareil mobile, puis choisissez "Ajouter à l'écran d'accueil" dans le menu de votre navigateur pour l'enregistrer sous forme d'application.</span>}
            },
            spanish: {
                q: "¿Esto es una aplicación para móviles?",
                a() {return <span>Sortir.io es un sitio web, pero está destinado a ser utilizado en su teléfono. Vaya a https://sortir.io en su dispositivo móvil, y luego elija "Añadir a la pantalla de inicio" en el menú del navegador para guardarlo como una aplicación.</span>}
            },
            italian: {
                q: "È un'applicazione mobile?",
                a() {return <span>Sortir.io è un sito web, ma è destinato ad essere utilizzato sul vostro telefono. Andate su https://sortir.io sul vostro dispositivo mobile, poi scegliete "Aggiungi alla schermata iniziale" dal menu del vostro browser per salvarlo come App.</span>}
            },
            german: {
                q: "Ist dies eine mobile Anwendung?",
                a() {return <span>Sortir.io ist eine Website, aber sie ist zur Verwendung auf Ihrem Telefon gedacht. Gehen Sie auf Ihrem mobilen Gerät zu https://sortir.io und wählen Sie dann "Zum Startbildschirm hinzufügen" aus dem Menü Ihres Browsers, um sie als App zu speichern.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `I like this! How can I help?`,
                a() {return <span>This project is open source, so you can <a href="https://github.com/deremije/attestation">make a pull request from Github</a>. You can also help by emailing bugs, suggestions and other comments to <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            },
            french: {
                q: `J'aime ça ! Comment puis-je vous aider ?`,
                a() {return <span>Ce projet est open source, vous pouvez donc <a href="https://github.com/deremije/attestation">faire une demande de retrait auprès de Github</a>. Vous pouvez également nous aider en envoyant des bogues, des suggestions et d'autres commentaires par courriel à <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            },
            spanish: {
                q: "¡Me gusta esto! ¿Cómo puedo ayudar?",
                a() {return <span>Este proyecto es de código abierto, así que puedes <a href="https://github.com/deremije/attestation">hacer una solicitud de extracción de Github</a>. También puedes ayudar enviando errores, sugerencias y otros comentarios a <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            },
            italian: {
                q: "Mi piace! Come posso aiutarti?",
                a() {return <span>Questo progetto è open source, quindi è possibile <a href="https://github.com/deremije/attestation">fare una richiesta di pull da Github</a>. Puoi anche aiutare inviando bug, suggerimenti e altri commenti a <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> .</span>}
            },
            german: {
                q: "Das gefällt mir! Wie kann ich helfen?",
                a() {return <span>Dieses Projekt ist quelloffen, so dass Sie <a href="https://github.com/deremije/attestation">eine Pull-Anfrage von Github</a> stellen können. Sie können auch helfen, indem Sie Fehler, Vorschläge und andere Kommentare per E-Mail an <a href='mailto:feedback@sortir.io'>feedback@sortir.io</a> schicken.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `Who made Sortir.io?`,
                a() {return <span>Sortir.io was created and is maintained by <a href="https://jeremyrandall.dev">Jeremy Randall</a>, an American web developer in Lyon. UX and UI design by <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
            french: {
                q: `Qui a créé Sortir.io ?`,
                a() {return <span>Sortir.io a été créé et est maintenu par <a href="https://jeremyrandall.dev">Jeremy Randall</a>, un développeur web américain à Lyon. Conception de l'interface utilisateur et des interfaces utilisateur par <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
            spanish: {
                q: "¿Quién hizo Sortir.io?",
                a() {return <span>Sortir.io fue creado y es mantenido por <a href="https://jeremyrandall.dev">Jeremy Randall</a>, un desarrollador web americano en Lyon. Diseño de UX y UI por <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
            italian: {
                q: "Chi ha fatto Sortir.io?",
                a() {return <span>Sortir.io è stato creato ed è gestito da <a href="https://jeremyrandall.dev">Jeremy Randall</a>, uno sviluppatore web americano a Lione. UX e UI design di <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
            german: {
                q: "Wer hat Sortir.io gemacht?",
                a() {return <span>Sortir.io wurde erstellt und wird gepflegt von <a href="https://jeremyrandall.dev">Jeremy Randall</a>, einem amerikanischen Webentwickler in Lyon. UX- und UI-Entwurf von <a href="https://shannou.com">Shannon Randall</a>.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `How can I find the French government's official attestation generator?`,
                a() {return <span>We actually use that as part of this site! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Here is their site</a>.</span>}
            },
            french: {
                q: `Comment puis-je trouver le générateur d'attestations officiel du gouvernement français ?`,
                a() {return <span>Nous l'utilisons en fait dans le cadre de ce site ! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Voici leur site</a>.</span>}
            },
            spanish: {
                q: "¿Cómo puedo encontrar el generador de certificados oficiales del gobierno francés?",
                a() {return <span>¡En realidad usamos eso como parte de este sitio! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Aquí está su sitio</a>.</span>}
            },
            italian: {
                q: "Come posso trovare il generatore di attestati ufficiali del governo francese?",
                a() {return <span>In realtà lo usiamo come parte di questo sito! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Qui c'è il loro sito</a>.</span>}
            },
            german: {
                q: "Wie kann ich den offiziellen Bescheinigungsgenerator der französischen Regierung finden?",
                a() {return <span>Wir benutzen das tatsächlich als Teil dieser Website! <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">Hier ist ihre Website</a>.</span>}
            },
        },
        {
            visible: false,
            english: {
                q: `Where did you get that nifty COVID icon?`,
                a() {return <span>The icon was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href='https://flaticon.com'>flaticon.com</a>.</span>}
            },
            french: {
                q: `Où avez-vous trouvé cette belle icône COVID ?`,
                a() {return <span>L'icône a été réalisée par <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> de <a href='https://flaticon.com'>flaticon.com</a></span>}
            },
            spanish: {
                q: "¿De dónde sacaste ese ingenioso icono de COVID?",
                a() {return <span>El icono fue hecho por <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> de <a href='https://flaticon.com'>flaticon.com</a>.</span>}
            },
            italian: {
                q: "Dove hai preso quell'elegante icona COVID?",
                a() {return <span>L'icona è stata fatta da <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> da <a href='https://flaticon.com'>flaticon.com</a>.</span>}
            },
            german: {
                q: "Woher haben Sie dieses hübsche COVID-Symbol?",
                a() {return <span>Die Ikone wurde von <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> von <a href='https://flaticon.com'>flaticon.com</a> erstellt.</span>}
            },
        },
        // {
        //     visible: false,
        //     english: {
        //         q: ``,
        //         a() {return <span></span>}
        //     },
        //     french: {
        //         q: ``,
        //         a() {return <span></span>}
        //     },
        //     spanish: {
        //         q: ``,
        //         a() {return <span></span>}
        //     },
        //     italian: {
        //         q: ``,
        //         a() {return <span></span>}
        //     },
        //     german: {
        //         q: ``,
        //         a() {return <span></span>}
        //     },
        // },
    ]
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
            {faq.map(entry => 
                <StyledQA key={JSON.stringify(entry)}> 
                    <h5 onClick={() => toggleFaq(JSON.stringify(entry))}>
                        {entry[language].q}
                    </h5> 
                {entry.visible ? 
                    <div>
                        {entry[language].a()}
                    </div> : ""}
                </StyledQA>
            )}
        </StyledFAQ>
    )
}

export default FAQ
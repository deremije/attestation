const reasons = [
    {
        reason: "travail",
        french: "Travail",
        english: "Work",
        spanish: "Trabajo",
        italian: "Lavoro",
        german: "Arbeit",
        emoji: "🏢",
        description: {
            french: "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.",
            english: "Travel between the home and the place of exercise of the professional activity or an educational or training establishment, professional travel that cannot be postponed, travel for a competition or an exam.",
            spanish: "Viajes entre el domicilio y el lugar de ejercicio de la actividad profesional o un establecimiento educativo o de formación, viajes profesionales impostergables, viajes para una competición o un examen.",
            italian: "Viaggi tra il domicilio e il luogo di esercizio dell'attività professionale o di un istituto di istruzione o formazione, viaggi professionali non rinviabili, viaggi per un concorso o un esame.",
            german: "Reisen zwischen dem Wohnort und dem Ort der Ausübung der beruflichen Tätigkeit oder einer Bildungs- oder Ausbildungseinrichtung, unaufschiebbare berufliche Reisen, Reisen zu einem Wettbewerb oder einer Prüfung.",
        }
    },
    {
        reason: "sport",
        french: "Sport",
        english: "Exercise",
        spanish: "Deporte",
        italian: "Sport",
        german: "Sport",
        emoji: "🏃‍♀️",
        description: {
            french: "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
            english: "Short trips, within the limit of one hour daily and within a maximum radius of one kilometer around the home, related either to the individual physical activity of the persons, excluding any collective sports practice and any proximity with other persons, or to the walk with only the persons grouped together in the same home, or to the needs of pets.",
            spanish: "Viajes cortos, dentro del límite de una hora diaria y en un radio máximo de un kilómetro alrededor del hogar, relacionados ya sea con la actividad física individual de las personas, excluyendo cualquier práctica deportiva colectiva y cualquier proximidad con otras personas, o con el paseo con sólo las personas agrupadas en el mismo hogar, o con las necesidades de las mascotas.",
            italian: "Brevi spostamenti, entro il limite di un'ora al giorno e nel raggio massimo di un chilometro intorno alla casa, legati sia all'attività fisica individuale delle persone, escludendo qualsiasi pratica sportiva collettiva e la vicinanza con altre persone, sia alla passeggiata con le sole persone raggruppate nella stessa casa, sia alle esigenze degli animali domestici.",
            german: "Kurze Ausflüge innerhalb einer Stunde täglich und in einem Umkreis von höchstens einem Kilometer um die Wohnung herum, die sich entweder auf die individuelle körperliche Aktivität der Personen, unter Ausschluss jeglicher kollektiven sportlichen Betätigung und jeglicher Nähe zu anderen Personen, oder auf den Spaziergang mit nur den Personen, die sich in derselben Wohnung gruppiert haben, oder auf die Bedürfnisse von Haustieren beziehen.",
        }
    },
    {
        reason: "achats",
        french: "Achats",
        english: "Shopping",
        spanish: "Compras",
        italian: "Shopping",
        german: "Einkaufen",
        emoji: "🛒",
        description: {
            french: "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.",
            english: "Travel to make purchases of supplies necessary for the professional activity, purchases of basic necessities in establishments whose activities remain authorized, withdrawal of orders and home deliveries.",
            spanish: "Viajes para realizar compras de suministros necesarios para la actividad profesional, compras de productos de primera necesidad en establecimientos cuyas actividades siguen estando autorizadas, retirada de pedidos y entregas a domicilio.",
            italian: "Viaggi per effettuare acquisti di forniture necessarie all'attività professionale, acquisti di beni di prima necessità in stabilimenti la cui attività rimane autorizzata, ritiro di ordini e consegne a domicilio.",
            german: "Viajes para realizar compras de suministros necesarios para la actividad profesional, compras de productos de primera necesidad en establecimientos cuyas actividades siguen estando autorizadas, retirada de pedidos y entregas a domicilio.",
        }
    },
    {
        reason: "handicap",
        french: "Handicap",
        english: "Disabled",
        spanish: "Behinderte",
        italian: "Disabili",
        german: "Behinderte",
        emoji: "♿",
        description: {
            french: "Déplacement des personnes en situation de handicap et leur accompagnant",
            english: "Movement of people with disabilities and their companions",
            spanish: "El movimiento de las personas con discapacidades y sus acompañantes",
            italian: "Movimento delle persone con disabilità e dei loro accompagnatori",
            german: "Bewegung von Menschen mit Behinderungen und ihren Begleitpersonen",
        }
    },
    {
        reason: "missions",
        french: "Missions",
        english: "Missions",
        spanish: "Misiones",
        italian: "Missioni",
        german: "Missionen",
        emoji: "😇",
        description: {
            french: "Participation à des missions d'intérêt général sur demande de l'autorité administrative",
            english: "Participation in missions of general interest at the request of the administrative authority",
            spanish: "Participación en misiones de interés general a petición de la autoridad administrativa",
            italian: "Partecipazione a missioni di interesse generale su richiesta dell'autorità amministrativa",
            german: "Teilnahme an Missionen von allgemeinem Interesse auf Antrag der Verwaltungsbehörde",
        }
    },
    {
        reason: "ecole",
        french: "Ecole",
        english: "School",
        spanish: "Escuela",
        italian: "Scuola",
        german: "Schule",
        emoji: "🏫",
        description: {
            french: "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires",
            english: "Travel to pick up children at school and during their extracurricular activities",
            spanish: "Viajar para recoger a los niños en la escuela y durante sus actividades extracurriculares",
            italian: "Viaggi per andare a prendere i bambini a scuola e durante le loro attività extrascolastiche",
            german: "Reisen, um Kinder in der Schule und während ihrer außerschulischen Aktivitäten abzuholen",
        }
    },
    {
        reason: "convocation",
        french: "Convocation",
        english: "Convocation",
        spanish: "Convocatoria",
        italian: "Convocazione",
        german: "Einberufung",
        emoji: "⚖️",
        description: {
            french: "Convocation judiciaire ou administrative et pour se rendre dans un service public",
            english: "Judicial or administrative summons and to attend public services",
            spanish: "Citación judicial o administrativa y para asistir a los servicios públicos",
            italian: "Citazione giudiziaria o amministrativa e per presenziare a servizi pubblici",
            german: "Gerichtliche oder administrative Vorladungen und Teilnahme an öffentlichen Diensten",
        }
    },
    {
        reason: "famille",
        french: "Famille",
        english: "Family",
        spanish: "Familia",
        italian: "Famiglia",
        german: "Familie",
        emoji: "👨‍👩‍👧‍👧",
        description: {
            french: "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants",
            english: "Travel for compelling family reasons, for assistance to vulnerable and precarious persons or for child care",
            spanish: "Viajes por razones familiares apremiantes, para la asistencia a personas vulnerables y precarias o para el cuidado de niños",
            italian: "Viaggi per motivi familiari, per l'assistenza a persone vulnerabili e precarie o per la cura dei bambini",
            german: "Reisen aus zwingenden familiären Gründen, zur Unterstützung gefährdeter und prekärer Personen oder zur Kinderbetreuung",
        }
    },
    {
        reason: "sante",
        french: "Sante",
        english: "Health",
        spanish: "Salud",
        italian: "Salute",
        german: "Gesundheit",
        emoji: "⚕️",
        description: {
            french: "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments",
            english: "Consultations, examinations and care that cannot be provided remotely and the purchase of medication",
            spanish: "Las consultas, los exámenes y la atención que no se pueden proporcionar a distancia y la compra de medicamentos",
            italian: "Consultazioni, esami e cure che non possono essere fornite a distanza e l'acquisto di farmaci",
            german: "Konsultationen, Untersuchungen und Behandlungen, die nicht aus der Ferne durchgeführt werden können, sowie der Kauf von Medikamenten",
        }
    },
]

export default reasons
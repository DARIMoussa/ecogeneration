/* Contenu pédagogique et textes d'interface — FRANÇAIS.
   La version anglaise est dans content.en.js (même structure, mêmes clés, même ordre des réponses). */
window.CONTENT = {
  lang: "fr",
  locale: "fr-FR",
  verifyPath: "/verifier.html",
  ui: {
    sending: "Envoi…",
    sendError: "L'envoi a échoué. Réessayez, ou écrivez-nous à darimoussa5@gmail.com.",
    formOk: "Merci ! Votre demande a bien été reçue. Nous vous répondons par email.",
    points: "points",
    tryAgain: "Regarde encore… choisis ce qui protège la nature 🌱",
    rewardTitle: "Bravo, petit gardien de la Terre !",
    rewardText: (s) => `Tu as gagné <strong>${s} points</strong>. Tu sais déjà comment protéger la planète !`,
    replay: "Rejouer",
    resources: "Ressources à consulter pour répondre",
    nameIntro: "Entre ton nom complet : il figurera sur ton attestation.",
    namePh: "Prénom NOM",
    nameError: "Entre ton nom avec des lettres uniquement (espaces, apostrophes et traits d'union acceptés).",
    cont: "Continuer",
    close: "Fermer",
    lesson: "la leçon",
    takeTest: "Passer le test",
    back: "Retour",
    test: "le test",
    testIntro: (n, k) => `Réponds aux ${n} questions. Il faut au moins ${k} bonnes réponses pour réussir.`,
    seeResult: "Voir mon résultat",
    reviewLesson: "Revoir la leçon",
    unanswered: "Tu n'as pas répondu à toutes les questions. Valider quand même ?",
    grading: "Correction…",
    serviceDown: "Le service de correction est momentanément indisponible. Réessaie dans quelques minutes.",
    congrats: (n) => `Félicitations, ${n} ! 🎉`,
    scoreOfficial: (s, t) => `Score : ${s}/${t}. Voici ton attestation officielle.`,
    refLine: (id, url) => `Référence <strong>${id}</strong> — vérifiable par tous sur <a href="${url}" target="_blank" rel="noopener">la page de vérification</a>.`,
    download: "Télécharger mon attestation",
    finish: "Terminer",
    almost: "Presque !",
    scoreNeed: (s, t, k) => `Score : ${s}/${t}. Il faut au moins ${k} bonnes réponses.`,
    encourage: "Revois la leçon et réessaie — tu vas y arriver.",
    retry: "Réessayer le test",
    certFile: "Attestation-EcoGeneration-",
    cert: {
      tagline: "Éduquer aujourd'hui, protéger demain",
      title: "ATTESTATION DE RÉUSSITE",
      awarded: "Cette attestation est décernée à",
      passed: "pour avoir réussi le module de formation",
      issued: "Délivrée le ",
      ref: "Réf. ",
      verify: "Vérifier : ",
      signer: "Fondateur, ÉcoGénération",
      sealLine: "ODD · LEADERSHIP · CLIMAT",
      scan: "Scanner pour vérifier",
    },
    shareText: "ÉcoGénération — ODD, leadership et climat : l'éducation au développement durable pour l'Afrique subsaharienne.",
    copied: "Lien copié !",
    copy: "Copier le lien",
    odd: {
      discover: "★ Défi découverte",
      pickHint: "Choisis un ODD ci-dessus pour un contenu adapté à ton niveau, ou relève le défi découverte.",
      goal: "ODD",
      understand: "Comprendre",
      meaning: "Ce que ça veut dire",
      yourAction: "Ton geste",
      project: "Ton projet",
      caseStudy: "Étude de cas",
      researchQ: "Question de recherche",
      leader: "Être leader",
      learnMore: "En savoir plus (ONU, en anglais)",
      takeModule: "Suivre le module « Les 17 ODD » et obtenir l'attestation",
      levelLabel: "Niveau",
    },
  },

  // Rôle de leader, selon la tranche d'âge
  leadership: {
    kid: "Montre l'exemple à ta famille et à tes amis, et explique-leur pourquoi c'est important.",
    teen: "Propose ce projet à ta classe ou à ton club, répartissez les rôles et prends-en la tête.",
    uni: "Fédère une équipe, fixe un objectif mesurable et présente vos résultats à un décideur local.",
    research: "Partage tes résultats avec les décideurs et les communautés concernées, en langage clair.",
  },

  goals: [
    { n: 1, title: "Pas de pauvreté", brief: "Éliminer la pauvreté sous toutes ses formes et partout dans le monde.",
      kidExplain: "Certaines familles n'ont pas assez d'argent pour manger, se soigner ou aller à l'école.",
      kidAct: "Partage tes affaires en bon état (livres, habits, jouets) avec ceux qui en ont besoin.",
      teen: "Organise avec ta classe une collecte de fournitures scolaires pour des élèves de ton quartier et suis leur distribution.",
      uni: "Analyse un dispositif de protection sociale ou de microfinance de ton pays : qui en bénéficie, quels résultats, quelles limites ?",
      research: "Quels mécanismes permettent aux transferts monétaires de réduire durablement la pauvreté des ménages ruraux en Afrique de l'Ouest ?" },
    { n: 2, title: "Faim « zéro »", brief: "Éliminer la faim, assurer la sécurité alimentaire, améliorer la nutrition et promouvoir l'agriculture durable.",
      kidExplain: "Tout le monde a besoin de manger chaque jour des aliments variés pour grandir en bonne santé.",
      kidAct: "Ne gaspille pas ta nourriture : sers-toi seulement de ce que tu peux manger.",
      teen: "Crée un petit potager scolaire et mesure ce qu'il produit sur un trimestre.",
      uni: "Étudie la chaîne de valeur d'un produit local (manioc, maïs, soja) et identifie où se situent les pertes après récolte.",
      research: "Comment l'agroécologie peut-elle améliorer les rendements et la résilience des petits exploitants face aux sécheresses ?" },
    { n: 3, title: "Bonne santé et bien-être", brief: "Permettre à tous de vivre en bonne santé et promouvoir le bien-être de tous à tout âge.",
      kidExplain: "Être en bonne santé, c'est bien manger, bouger, bien dormir et se laver les mains.",
      kidAct: "Lave-toi les mains avec du savon avant de manger et après être allé aux toilettes.",
      teen: "Lance une campagne d'hygiène dans ton école (lavage des mains, eau potable) et observe son effet sur les absences.",
      uni: "Évalue l'accès aux soins dans ta commune : distance au centre de santé, coût, personnel disponible.",
      research: "Quels facteurs expliquent les écarts d'accès aux soins maternels entre zones urbaines et rurales ?" },
    { n: 4, title: "Éducation de qualité", brief: "Assurer à tous une éducation équitable, inclusive et de qualité, et des possibilités d'apprentissage tout au long de la vie.",
      kidExplain: "Aller à l'école permet d'apprendre à lire, à compter et à comprendre le monde.",
      kidAct: "Aide un camarade qui a du mal avec une leçon.",
      teen: "Monte un club de tutorat où les plus grands aident les plus jeunes une heure par semaine.",
      uni: "Identifie les causes de l'abandon scolaire dans une localité et propose trois mesures réalistes.",
      research: "Quel est l'effet de l'enseignement en langue maternelle dans les premières années sur les résultats scolaires ?" },
    { n: 5, title: "Égalité entre les sexes", brief: "Parvenir à l'égalité des sexes et autonomiser toutes les femmes et les filles.",
      kidExplain: "Les filles et les garçons ont les mêmes droits : jouer, apprendre et rêver grand.",
      kidAct: "Partage les tâches à la maison, que tu sois une fille ou un garçon.",
      teen: "Organise un débat sur les métiers dits « pour filles » ou « pour garçons » et invite des femmes ingénieures ou entrepreneures.",
      uni: "Analyse la place des femmes dans une filière (agriculture, numérique, politique) et les obstacles qu'elles rencontrent.",
      research: "Comment l'accès des femmes à la terre et au crédit influence-t-il la sécurité alimentaire des ménages ?" },
    { n: 6, title: "Eau propre et assainissement", brief: "Garantir l'accès de tous à l'eau et à l'assainissement et assurer une gestion durable des ressources en eau.",
      kidExplain: "L'eau propre est précieuse : on en a besoin pour boire, cuisiner et se laver.",
      kidAct: "Ferme bien le robinet et ne laisse pas l'eau couler pour rien.",
      teen: "Fais l'inventaire des points d'eau et des toilettes de ton école et propose un plan d'entretien.",
      uni: "Compare deux solutions de traitement de l'eau à domicile (filtration, chloration, désinfection solaire) : coût, efficacité, acceptation.",
      research: "Quels modèles de gestion communautaire assurent la durabilité des forages en milieu rural ?" },
    { n: 7, title: "Énergie propre et d'un coût abordable", brief: "Garantir l'accès de tous à des services énergétiques fiables, durables et modernes, à un coût abordable.",
      kidExplain: "L'énergie fait marcher les lampes et les machines. Le soleil et le vent en donnent sans polluer.",
      kidAct: "Éteins la lumière et les appareils quand tu quittes une pièce.",
      teen: "Calcule la consommation électrique de ta salle de classe et propose des économies chiffrées.",
      uni: "Dimensionne un kit solaire pour un centre de santé rural : besoins, panneaux, batteries, coût.",
      research: "Quels modèles économiques rendent les mini-réseaux solaires viables dans les zones rurales ?" },
    { n: 8, title: "Travail décent et croissance économique", brief: "Promouvoir une croissance économique soutenue et partagée, le plein emploi productif et un travail décent pour tous.",
      kidExplain: "Un travail décent est un travail sûr et payé correctement. Le travail, c'est pour les adultes.",
      kidAct: "Demande à un adulte de ton entourage de te raconter son métier et ce qu'il aime dans son travail.",
      teen: "Imagine une mini-entreprise d'élèves (recyclage, artisanat, services) et rédige son plan d'activité.",
      uni: "Étudie les conditions de travail dans le secteur informel d'une ville et propose des pistes de protection sociale.",
      research: "Quels dispositifs favorisent le passage des jeunes de l'emploi informel à l'emploi formel ?" },
    { n: 9, title: "Industrie, innovation et infrastructure", brief: "Bâtir une infrastructure résiliente, promouvoir une industrialisation durable qui profite à tous et encourager l'innovation.",
      kidExplain: "Les routes, les ponts et Internet relient les gens. Inventer de nouvelles idées aide tout le monde.",
      kidAct: "Fabrique un objet utile à partir de matériaux récupérés.",
      teen: "Relève un défi d'innovation : conçois un prototype simple qui résout un problème de ton école.",
      uni: "Analyse comment le numérique (paiement mobile, e-agriculture) transforme une activité locale.",
      research: "Quelles conditions favorisent l'émergence d'écosystèmes d'innovation technologique en Afrique de l'Ouest ?" },
    { n: 10, title: "Inégalités réduites", brief: "Réduire les inégalités dans les pays et d'un pays à l'autre.",
      kidExplain: "Chaque personne mérite le respect, d'où qu'elle vienne et qu'elle ait un handicap ou non.",
      kidAct: "Invite à jouer un enfant qui est souvent laissé de côté.",
      teen: "Vérifie si ton école est accessible aux personnes en situation de handicap et propose des améliorations.",
      uni: "Compare l'accès aux services de base (eau, électricité, école) entre deux communes et explique les écarts.",
      research: "Comment mesurer et réduire les inégalités d'accès au numérique entre régions ?" },
    { n: 11, title: "Villes et communautés durables", brief: "Faire en sorte que les villes et les établissements humains soient ouverts à tous, sûrs, résilients et durables.",
      kidExplain: "Une ville agréable a des arbres, des rues propres et des endroits sûrs pour jouer.",
      kidAct: "Jette tes déchets dans une poubelle, jamais dans la rue.",
      teen: "Cartographie les zones inondables ou les dépôts sauvages de ton quartier et présente-les aux autorités locales.",
      uni: "Étudie la gestion des déchets d'une ville : collecte, tri, valorisation, coûts.",
      research: "Quelles stratégies d'aménagement réduisent la vulnérabilité des villes côtières aux inondations ?" },
    { n: 12, title: "Consommation et production responsables", brief: "Établir des modes de consommation et de production durables.",
      kidExplain: "Utiliser moins, réparer et réutiliser, c'est faire moins de déchets.",
      kidAct: "Utilise une gourde et un sac réutilisable au lieu du plastique jetable.",
      teen: "Mesure pendant une semaine les déchets de ta classe, puis lance un défi « zéro plastique ».",
      uni: "Réalise l'analyse simplifiée du cycle de vie d'un produit courant (sachet d'eau, pagne, téléphone).",
      research: "Comment intégrer les filières de recyclage informelles dans une économie circulaire ?" },
    { n: 13, title: "Mesures relatives à la lutte contre les changements climatiques", brief: "Prendre d'urgence des mesures pour lutter contre les changements climatiques et leurs répercussions.",
      kidExplain: "La Terre se réchauffe à cause de certaines activités humaines. Les arbres nous aident à la protéger.",
      kidAct: "Plante un arbre avec ta classe et prends-en soin.",
      teen: "Estime l'empreinte carbone de ton école (transport, énergie, déchets) et propose trois actions pour la réduire.",
      uni: "Analyse la contribution déterminée au niveau national (CDN) de ton pays : objectifs, secteurs prioritaires, financements.",
      research: "Quelles stratégies d'adaptation sont les plus efficaces pour les agriculteurs face à la variabilité des pluies ?" },
    { n: 14, title: "Vie aquatique", brief: "Conserver et exploiter de manière durable les océans, les mers et les ressources marines.",
      kidExplain: "Les poissons, les tortues et les coraux vivent dans l'eau. Le plastique les met en danger.",
      kidAct: "Ne jette jamais rien dans les rivières, les lagunes ou la mer.",
      teen: "Organise un nettoyage de plage ou de berge et classe les déchets ramassés.",
      uni: "Étudie l'impact de la pêche artisanale sur les ressources en poissons d'une zone côtière ou lagunaire.",
      research: "Comment concilier aires marines protégées et revenus des communautés de pêcheurs ?" },
    { n: 15, title: "Vie terrestre", brief: "Préserver et restaurer les écosystèmes terrestres, gérer durablement les forêts, lutter contre la désertification et enrayer la perte de biodiversité.",
      kidExplain: "Les forêts abritent les animaux et les plantes, et elles nous donnent de l'air pur.",
      kidAct: "Observe les oiseaux et les insectes près de chez toi et dessine-les.",
      teen: "Réalise un inventaire photo de la biodiversité de ton école (arbres, oiseaux, insectes).",
      uni: "Évalue un projet de reboisement : choix des espèces, taux de survie, implication des communautés.",
      research: "Quels facteurs déterminent le succès de la régénération naturelle assistée dans les zones dégradées ?" },
    { n: 16, title: "Paix, justice et institutions efficaces", brief: "Promouvoir des sociétés pacifiques et inclusives, l'accès de tous à la justice et des institutions efficaces et responsables.",
      kidExplain: "On règle les disputes en parlant calmement, pas en se battant.",
      kidAct: "Quand deux amis se disputent, aide-les à s'écouter.",
      teen: "Mets en place un conseil d'élèves qui recueille les idées de tous et rend compte de ses décisions.",
      uni: "Étudie comment une mairie informe les citoyens sur son budget et propose un outil de transparence.",
      research: "Quel est l'effet des budgets participatifs sur la confiance des citoyens envers les institutions locales ?" },
    { n: 17, title: "Partenariats pour la réalisation des objectifs", brief: "Renforcer les moyens de mettre en œuvre le Partenariat mondial pour le développement durable et le revitaliser.",
      kidExplain: "Ensemble, on va plus loin : chacun apporte son aide pour réussir.",
      kidAct: "Réalise un projet en équipe avec tes camarades.",
      teen: "Associe ton club à une autre école ou à une association pour mener un projet ODD commun.",
      uni: "Analyse un partenariat public-privé ou une coopération internationale : rôles, financements, résultats.",
      research: "Quelles conditions rendent les partenariats multi-acteurs efficaces pour atteindre les ODD au niveau local ?" },
  ],

  // Jeu « défi découverte » pour les tout-petits
  scenarios: [
    { q: "Quelle maison protège le mieux la nature ?", opts: [{ svg: "bambou", label: "Maison en bambou", ok: true }, { svg: "tole", label: "Maison en tôle", ok: false }], good: "Bravo ! Le bambou pousse vite et respecte la nature 🌱" },
    { q: "Que choisis-tu pour les animaux ?", opts: [{ svg: "feu", label: "Brûler la forêt", ok: false }, { svg: "foret", label: "Protéger la forêt", ok: true }], good: "Super ! Tu sauves les animaux 🦋" },
    { q: "Comment avoir de la pluie et de la fraîcheur ?", opts: [{ svg: "desert", label: "Couper les arbres", ok: false }, { svg: "planter", label: "Planter des arbres", ok: true }], good: "Oui ! Les arbres ramènent la pluie 🌧️" },
    { q: "Où met-on le plastique ?", opts: [{ svg: "plastiqueEau", label: "Dans l'eau", ok: false }, { svg: "poubelle", label: "À la poubelle", ok: true }], good: "Génial ! Une eau propre, des poissons heureux 🐟" },
  ],

  // « Défi découverte » pour les niveaux supérieurs
  exos: {
    secondaire: { badge: "Collège & Lycée", titre: "Étude de cas : ma ville face au climat", prompt: "Choisis un problème environnemental visible près de chez toi (inondation, chaleur, déchets, érosion côtière). Décris ses causes et propose 3 solutions concrètes que ta communauté pourrait appliquer.", res: [["U", "UNESCO — Éducation au climat", "Cadre et notions clés", "https://www.unesco.org/en/climate-change-education"], ["N", "National Geographic Education", "Cartes et données", "https://education.nationalgeographic.org/"], ["L", "UN CC:Learn", "Cours d'introduction gratuits", "https://unccelearn.org/"]] },
    licence: { badge: "Licence (L1–L3)", titre: "Énergie & empreinte carbone", prompt: "Compare deux sources d'énergie (ex. solaire ou groupe électrogène diesel) pour un village. Évalue le coût, l'impact carbone et l'accès. Recommande la meilleure option et justifie-la.", res: [["L", "UN CC:Learn", "Modules climat & énergie", "https://unccelearn.org/"], ["G", "GIEC / IPCC", "Résumés pour décideurs", "https://www.ipcc.ch/"], ["O", "Office for Climate Education", "Ressources scientifiques", "https://www.oce.global/fr"]] },
    master: { badge: "Master (M1–M2)", titre: "Concevoir une politique publique", prompt: "Rédige une note de politique (2 pages) pour intégrer l'éducation au développement durable au programme scolaire national. Inclus les objectifs, les parties prenantes, un budget indicatif et des indicateurs de suivi.", res: [["S", "ONU — Objectifs de développement durable", "Cibles et indicateurs", "https://sdgs.un.org/goals"], ["F", "FAO eLearning Academy", "Climat & systèmes alimentaires", "https://elearning.fao.org/"], ["U", "UNESCO — EDD", "Éducation au développement durable", "https://www.unesco.org/en/sustainable-development/education"]] },
    doctorat: { badge: "Doctorat (1–3)", titre: "Formuler une question de recherche", prompt: "Identifie un manque dans la littérature sur l'éducation au développement durable en Afrique subsaharienne. Formule une question de recherche, une hypothèse et une méthodologie de collecte de données.", res: [["G", "GIEC / IPCC", "Rapports complets", "https://www.ipcc.ch/"], ["S", "Google Scholar", "Littérature en accès libre", "https://scholar.google.com/"], ["O", "Office for Climate Education", "Recherche pédagogique", "https://www.oce.global/fr"]] },
    recherche: { badge: "Recherche & Innovation", titre: "Défi innovation", prompt: "Conçois une solution (technologique, sociale ou pédagogique) qui rend l'éducation aux ODD accessible hors ligne dans les zones rurales. Décris le prototype, les utilisateurs et l'impact attendu.", res: [["F", "FAO eLearning Academy", "Innovation & durabilité", "https://elearning.fao.org/"], ["S", "ONU — Objectifs de développement durable", "Données et rapports", "https://sdgs.un.org/goals"], ["G", "Google Scholar", "État de l'art", "https://scholar.google.com/"]] },
  },

  courses: {
    odd: {
      titre: "Les 17 Objectifs de développement durable",
      html: `<p>En <strong>septembre 2015</strong>, les <strong>193 États membres de l'ONU</strong> ont adopté le <strong>Programme de développement durable à l'horizon 2030</strong> (Agenda 2030). Il fixe <strong>17 objectifs</strong>, déclinés en <strong>169 cibles</strong>, à atteindre d'ici <strong>2030</strong>. Ils succèdent aux 8 Objectifs du Millénaire pour le développement (2000–2015).</p>
        <p>Les ODD sont <strong>universels</strong> (ils concernent tous les pays, riches comme pauvres) et <strong>indivisibles</strong> : progresser sur l'un aide souvent les autres. Leur principe central : <em>« ne laisser personne de côté »</em>.</p>
        <h4>Les 17 objectifs</h4>
        <ul class="odd-grid">
          <li><b>1</b>Pas de pauvreté<small>Éliminer la pauvreté sous toutes ses formes</small></li>
          <li><b>2</b>Faim « zéro »<small>Sécurité alimentaire, agriculture durable</small></li>
          <li><b>3</b>Bonne santé et bien-être<small>Vie saine pour tous, à tout âge</small></li>
          <li><b>4</b>Éducation de qualité<small>Éducation inclusive et équitable</small></li>
          <li><b>5</b>Égalité entre les sexes<small>Autonomiser les femmes et les filles</small></li>
          <li><b>6</b>Eau propre et assainissement<small>Accès à l'eau et gestion durable</small></li>
          <li><b>7</b>Énergie propre et d'un coût abordable<small>Énergie fiable, durable et moderne</small></li>
          <li><b>8</b>Travail décent et croissance économique<small>Emploi productif pour tous</small></li>
          <li><b>9</b>Industrie, innovation et infrastructure<small>Infrastructures résilientes</small></li>
          <li><b>10</b>Inégalités réduites<small>Dans les pays et entre eux</small></li>
          <li><b>11</b>Villes et communautés durables<small>Villes sûres, résilientes, inclusives</small></li>
          <li><b>12</b>Consommation et production responsables<small>Moins de gaspillage et de déchets</small></li>
          <li><b>13</b>Mesures relatives à la lutte contre les changements climatiques<small>Agir d'urgence pour le climat</small></li>
          <li><b>14</b>Vie aquatique<small>Océans, mers et ressources marines</small></li>
          <li><b>15</b>Vie terrestre<small>Forêts, sols, biodiversité</small></li>
          <li><b>16</b>Paix, justice et institutions efficaces<small>Sociétés pacifiques et justes</small></li>
          <li><b>17</b>Partenariats pour la réalisation des objectifs<small>Coopération et financement</small></li>
        </ul>
        <h4>Les « 5 P »</h4>
        <p>On regroupe souvent les ODD en cinq dimensions : <strong>Population</strong>, <strong>Planète</strong>, <strong>Prospérité</strong>, <strong>Paix</strong> et <strong>Partenariats</strong>.</p>
        <h4>Tout est lié : un exemple</h4>
        <p>Une école qui installe des panneaux solaires (ODD 7) réduit ses émissions (ODD 13), permet d'étudier le soir (ODD 4) et économise de l'argent pour d'autres besoins (ODD 1). Une seule action peut faire avancer plusieurs objectifs.</p>
        <h4>Agir à ton échelle</h4>
        <ul>
          <li>Trier et réduire tes déchets (ODD 12), économiser l'eau (ODD 6) et l'énergie (ODD 7).</li>
          <li>Planter et protéger les arbres de ton école ou de ton quartier (ODD 13 et 15).</li>
          <li>Défendre l'accès des filles à l'école (ODD 4 et 5).</li>
          <li>Créer un club ODD et monter des projets avec d'autres écoles ou associations (ODD 17).</li>
        </ul>
        <p style="opacity:.75;font-size:.88rem">Source officielle : <a href="https://www.un.org/sustainabledevelopment/fr/objectifs-de-developpement-durable/" target="_blank" rel="noopener">un.org — Objectifs de développement durable</a></p>`,
      quiz: [
        { q: "En quelle année les ODD ont-ils été adoptés par l'ONU ?", opts: ["2000", "2015", "2020"] },
        { q: "Combien d'objectifs compte l'Agenda 2030 ?", opts: ["8", "17", "169"] },
        { q: "Combien de cibles précisent ces objectifs ?", opts: ["17", "100", "169"] },
        { q: "Quelle est l'échéance fixée pour atteindre les ODD ?", opts: ["2025", "2030", "2050"] },
        { q: "Quel ODD porte sur l'action pour le climat ?", opts: ["ODD 7", "ODD 13", "ODD 15"] },
        { q: "L'ODD 4 concerne…", opts: ["L'éducation de qualité", "L'eau propre", "La vie aquatique"] },
        { q: "Protéger les forêts et la biodiversité relève surtout de…", opts: ["L'ODD 14 — Vie aquatique", "L'ODD 15 — Vie terrestre", "L'ODD 9 — Industrie"] },
        { q: "Quel est le principe central de l'Agenda 2030 ?", opts: ["Ne laisser personne de côté", "La croissance avant tout", "Chaque pays pour soi"] },
        { q: "Les ODD s'appliquent…", opts: ["Seulement aux pays en développement", "À tous les pays", "Seulement aux pays riches"] },
        { q: "Une école installe des panneaux solaires. Quels ODD fait-elle avancer directement ?", opts: ["ODD 7 et 13", "ODD 14 et 16", "ODD 2 et 10"] },
      ],
    },
    leadership: {
      titre: "Leadership pour le développement durable",
      lecon: [
        "Un leader du développement durable sait que les grands défis (pauvreté, climat, inégalités) sont d'abord une question de comportement humain.",
        "Agir localement : commencer par sa communauté, son école, son quartier, avec des actions concrètes et mesurables.",
        "Mobiliser : informer, inspirer et fédérer les autres autour d'objectifs communs.",
        "L'éducation est le levier le plus durable : sensibiliser tôt forme des citoyens responsables pour toute la vie.",
        "Une transition juste n'oublie personne : elle inclut les femmes, les jeunes et les communautés les plus vulnérables.",
      ],
      quiz: [
        { q: "Selon ce module, les grands défis du développement durable sont avant tout une question de…", opts: ["Technologie uniquement", "Comportement humain", "Chance"] },
        { q: "Par où un leader du développement durable devrait-il commencer ?", opts: ["Par sa communauté locale", "Par un autre continent", "Par rien"] },
        { q: "Quel est le levier le plus durable pour changer les comportements ?", opts: ["Ignorer le problème", "L'éducation", "La déforestation"] },
        { q: "Une transition juste doit inclure…", opts: ["Seulement les plus riches", "Les communautés vulnérables", "Personne"] },
        { q: "Mobiliser, c'est…", opts: ["Décourager les autres", "Fédérer autour d'objectifs communs", "Agir seul"] },
      ],
    },
  },
};

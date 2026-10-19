/* 17 mentors ORIGINAUX (personnages inventés, dessinés en SVG par Root Solution).
   Chaque mentor donne un conseil et partage une citation réelle, attribuée à son auteur. */
window.MENTORS = [
  { n: 1, name: "Amina", look: [3, 2, 0, 1], role: { fr: "Économiste du développement", en: "Development economist" },
    tip: { fr: "Commence par écouter celles et ceux qui vivent la pauvreté : ils connaissent déjà une partie des solutions.", en: "Start by listening to people who live in poverty: they already know part of the solutions." },
    quote: { fr: "Vaincre la pauvreté n'est pas un geste de charité. C'est un acte de justice.", en: "Overcoming poverty is not a task of charity, it is an act of justice." },
    by: { fr: "Nelson Mandela, discours de Londres, 2005 (trad.)", en: "Nelson Mandela, speech in London, 2005" } },
  { n: 2, name: "Kossi", look: [1, 0, 1, 0], role: { fr: "Agronome", en: "Agronomist" },
    tip: { fr: "Un sol vivant nourrit une famille pendant des générations. Prends-en soin comme d'un trésor.", en: "Living soil feeds a family for generations. Look after it like a treasure." },
    quote: { fr: "Ventre affamé n'a point d'oreilles.", en: "A hungry belly has no ears." },
    by: { fr: "Proverbe, repris par Jean de La Fontaine", en: "Proverb, used by Jean de La Fontaine" } },
  { n: 3, name: "Dr Fatou", look: [4, 3, 2, 1], role: { fr: "Médecin de santé publique", en: "Public health doctor" },
    tip: { fr: "La prévention est le soin le moins cher et le plus puissant : vaccins, eau propre, moustiquaire.", en: "Prevention is the cheapest and most powerful care: vaccines, clean water, bed nets." },
    quote: { fr: "La santé est un état de complet bien-être physique, mental et social, et ne consiste pas seulement en une absence de maladie ou d'infirmité.", en: "Health is a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity." },
    by: { fr: "Constitution de l'Organisation mondiale de la Santé, 1946", en: "Constitution of the World Health Organization, 1946" } },
  { n: 4, name: "Mme Adjoa", look: [2, 1, 3, 0], role: { fr: "Institutrice", en: "Primary teacher" },
    tip: { fr: "Lis dix minutes chaque jour, puis raconte à quelqu'un ce que tu as appris : c'est ainsi qu'on retient.", en: "Read ten minutes every day, then tell someone what you learned: that is how you remember." },
    quote: { fr: "Un enfant, un enseignant, un livre et un stylo peuvent changer le monde.", en: "One child, one teacher, one book and one pen can change the world." },
    by: { fr: "Malala Yousafzai, discours aux Nations Unies, 2013 (trad.)", en: "Malala Yousafzai, speech at the United Nations, 2013" } },
  { n: 5, name: "Maître Nafi", look: [5, 2, 0, 1], role: { fr: "Avocate des droits des femmes", en: "Women's rights lawyer" },
    tip: { fr: "L'égalité se construit à la maison : partager les tâches, c'est déjà changer le monde.", en: "Equality starts at home: sharing chores is already changing the world." },
    quote: { fr: "Il n'existe pas d'outil de développement plus efficace que l'autonomisation des femmes.", en: "There is no tool for development more effective than the empowerment of women." },
    by: { fr: "Kofi Annan, Secrétaire général de l'ONU (trad.)", en: "Kofi Annan, UN Secretary-General" } },
  { n: 6, name: "Yao", look: [0, 3, 1, 0], role: { fr: "Hydrologue", en: "Hydrologist" },
    tip: { fr: "Chaque goutte compte : une fuite réparée, c'est de l'eau pour une famille de plus.", en: "Every drop counts: a fixed leak means water for one more family." },
    quote: { fr: "Quand le puits est à sec, on connaît la valeur de l'eau.", en: "When the well's dry, we know the worth of water." },
    by: { fr: "Benjamin Franklin, Poor Richard's Almanack, 1746 (trad.)", en: "Benjamin Franklin, Poor Richard's Almanack, 1746" } },
  { n: 7, name: "Ibrahim", look: [4, 1, 2, 0], role: { fr: "Ingénieur solaire", en: "Solar engineer" },
    tip: { fr: "Le soleil se lève sur tous les villages. Apprends à transformer sa lumière en électricité.", en: "The sun rises over every village. Learn to turn its light into electricity." },
    quote: { fr: "L'énergie est le fil d'or qui relie la croissance économique, l'équité sociale et un environnement qui permet au monde de prospérer.", en: "Energy is the golden thread that connects economic growth, increased social equity, and an environment that allows the world to thrive." },
    by: { fr: "Ban Ki-moon, Secrétaire général de l'ONU (trad.)", en: "Ban Ki-moon, UN Secretary-General" } },
  { n: 8, name: "Mariam", look: [2, 0, 3, 1], role: { fr: "Entrepreneure sociale", en: "Social entrepreneur" },
    tip: { fr: "Commence petit, écoute tes clients, améliore chaque semaine. La persévérance est un capital.", en: "Start small, listen to your customers, improve every week. Perseverance is capital." },
    quote: { fr: "Le travail n'est pas une marchandise.", en: "Labour is not a commodity." },
    by: { fr: "Déclaration de Philadelphie, Organisation internationale du Travail, 1944", en: "Declaration of Philadelphia, International Labour Organization, 1944" } },
  { n: 9, name: "Koffi", look: [0, 2, 1, 0], role: { fr: "Inventeur et maker", en: "Inventor and maker" },
    tip: { fr: "Une panne est un problème à résoudre. Démonte, comprends, répare : c'est ainsi que naissent les inventions.", en: "A breakdown is a problem to solve. Take it apart, understand, repair: that is how inventions are born." },
    quote: { fr: "Toute personne a le droit […] de participer au progrès scientifique et aux bienfaits qui en résultent.", en: "Everyone has the right […] to share in scientific advancement and its benefits." },
    by: { fr: "Déclaration universelle des droits de l'homme, article 27", en: "Universal Declaration of Human Rights, Article 27" } },
  { n: 10, name: "Aïcha", look: [3, 3, 0, 1], role: { fr: "Travailleuse sociale", en: "Social worker" },
    tip: { fr: "Regarde autour de toi : qui est laissé de côté ? Invite cette personne dans ton équipe.", en: "Look around: who is being left out? Invite that person into your team." },
    quote: { fr: "Tous les êtres humains naissent libres et égaux en dignité et en droits.", en: "All human beings are born free and equal in dignity and rights." },
    by: { fr: "Déclaration universelle des droits de l'homme, article 1er", en: "Universal Declaration of Human Rights, Article 1" } },
  { n: 11, name: "Sena", look: [5, 1, 3, 1], role: { fr: "Urbaniste", en: "Urban planner" },
    tip: { fr: "Une ville réussie se juge à la façon dont elle traite ses enfants, ses aînés et ses piétons.", en: "A good city is judged by how it treats its children, its elders and its pedestrians." },
    quote: { fr: "Les villes peuvent offrir quelque chose à chacun, seulement parce que, et seulement quand, elles sont créées par tous.", en: "Cities have the capability of providing something for everybody, only because, and only when, they are created by everybody." },
    by: { fr: "Jane Jacobs, Déclin et survie des grandes villes américaines, 1961 (trad.)", en: "Jane Jacobs, The Death and Life of Great American Cities, 1961" } },
  { n: 12, name: "Bio", look: [1, 2, 2, 0], role: { fr: "Designer du recyclage", en: "Upcycling designer" },
    tip: { fr: "Avant d'acheter, demande-toi : en ai-je vraiment besoin ? Puis-je réparer, emprunter, réutiliser ?", en: "Before buying, ask yourself: do I really need it? Can I repair, borrow, reuse?" },
    quote: { fr: "Le développement durable est un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures de répondre aux leurs.", en: "Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs." },
    by: { fr: "Rapport Brundtland, Notre avenir à tous, 1987", en: "Brundtland Report, Our Common Future, 1987" } },
  { n: 13, name: "Zoé", look: [3, 0, 1, 1], role: { fr: "Climatologue", en: "Climate scientist" },
    tip: { fr: "Mesure, observe, partage : la science du climat commence par un carnet de pluie dans ta cour.", en: "Measure, observe, share: climate science starts with a rain diary in your yard." },
    quote: { fr: "Il n'y a pas de plan B, parce que nous n'avons pas de planète B.", en: "There is no Plan B because we do not have a planet B." },
    by: { fr: "Ban Ki-moon, Secrétaire général de l'ONU, 2014 (trad.)", en: "Ban Ki-moon, UN Secretary-General, 2014" } },
  { n: 14, name: "Kodjo", look: [4, 3, 3, 0], role: { fr: "Biologiste marin", en: "Marine biologist" },
    tip: { fr: "Ce que tu jettes dans le caniveau finit souvent dans la mer. Protège l'océan depuis ta rue.", en: "What you throw in the gutter often ends up in the sea. Protect the ocean from your street." },
    quote: { fr: "Pas d'eau, pas de vie. Pas de bleu, pas de vert.", en: "No water, no life. No blue, no green." },
    by: { fr: "Sylvia Earle, océanographe (trad.)", en: "Sylvia Earle, oceanographer" } },
  { n: 15, name: "Nadia", look: [2, 2, 2, 1], role: { fr: "Forestière", en: "Forester" },
    tip: { fr: "Plante un arbre, donne-lui un nom, arrose-le jusqu'à ce qu'il soit grand. Tu auras un ami pour la vie.", en: "Plant a tree, give it a name, water it until it is tall. You will have a friend for life." },
    quote: { fr: "Le meilleur moment pour planter un arbre, c'était il y a vingt ans. Le deuxième meilleur moment, c'est maintenant.", en: "The best time to plant a tree was twenty years ago. The second best time is now." },
    by: { fr: "Proverbe", en: "Proverb" } },
  { n: 16, name: "Abdou", look: [0, 1, 0, 0], role: { fr: "Médiateur de paix", en: "Peace mediator" },
    tip: { fr: "Dans un conflit, écoute jusqu'au bout avant de répondre. La paix commence par l'écoute.", en: "In a conflict, listen to the end before answering. Peace begins with listening." },
    quote: { fr: "Une injustice, où qu'elle se produise, menace la justice partout ailleurs.", en: "Injustice anywhere is a threat to justice everywhere." },
    by: { fr: "Martin Luther King Jr., Lettre de la prison de Birmingham, 1963 (trad.)", en: "Martin Luther King Jr., Letter from Birmingham Jail, 1963" } },
  { n: 17, name: "Ayo", look: [5, 0, 1, 1], role: { fr: "Coordinatrice de réseaux de jeunes", en: "Youth network coordinator" },
    tip: { fr: "Aucun grand projet ne se fait seul. Trouve tes alliés : école, mairie, associations, entreprises.", en: "No big project is done alone. Find your allies: school, town hall, associations, businesses." },
    quote: { fr: "Seul, on va plus vite ; ensemble, on va plus loin.", en: "If you want to go fast, go alone; if you want to go far, go together." },
    by: { fr: "Proverbe africain", en: "African proverb" } },
];

/* Avatar « manga » original : look = [coiffure, teint, accessoire, genre] */
window.mentorSVG = function (mt, color, size) {
  const [hair, skinI, acc, fem] = mt.look;
  const skin = ["#8d5524", "#a86b3c", "#c68642", "#6b3f1d", "#e0ac69"][skinI % 5];
  const shade = "rgba(0,0,0,.12)", hc = ["#1b1410", "#2b1b12", "#3a2418", "#15110e"][mt.n % 4];
  const accent = ["#ffffff", "#ffd36b", "#8cc63f", "#ffffff"][mt.n % 4];
  let back = "", front = "";
  switch (hair) {
    case 0: front = Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (1.02 + i * 0.096); return `<circle cx="${100 + 44 * Math.cos(a)}" cy="${86 + 44 * Math.sin(a)}" r="13" fill="${hc}"/>`; }).join("") + `<ellipse cx="100" cy="58" rx="40" ry="20" fill="${hc}"/>`; break;
    case 1: back = `<circle cx="100" cy="72" r="62" fill="${hc}"/>`; front = `<path d="M56 82 Q62 40 100 38 Q138 40 144 82 Q128 62 100 62 Q72 62 56 82Z" fill="${hc}"/>`; break;
    case 2: front = `<path d="M50 84 Q48 34 100 28 Q152 34 150 84 Q140 58 100 56 Q60 58 50 84Z" fill="${color}"/><path d="M60 52 Q100 30 140 52" stroke="${accent}" stroke-width="5" fill="none" opacity=".8"/><path d="M128 40 Q160 22 156 52 Q150 40 138 46Z" fill="${color}"/>`; break;
    case 3: back = `<path d="M50 90 Q44 160 64 180 L136 180 Q156 160 150 90 Q140 40 100 40 Q60 40 50 90Z" fill="${hc}"/>`; front = `<path d="M54 86 Q58 42 100 40 Q142 42 146 86 Q120 56 92 64 Q72 70 54 86Z" fill="${hc}"/>`; break;
    case 4: front = `<path d="M56 78 Q60 44 100 42 Q140 44 144 78 Q130 58 100 58 Q70 58 56 78Z" fill="${hc}"/>`; break;
    default: back = `<circle cx="100" cy="34" r="20" fill="${hc}"/>`; front = `<path d="M54 82 Q58 44 100 42 Q142 44 146 82 Q126 58 100 60 Q74 58 54 82Z" fill="${hc}"/>`;
  }
  const glasses = acc === 1 ? `<g fill="none" stroke="#1b2620" stroke-width="3"><circle cx="82" cy="96" r="14"/><circle cx="118" cy="96" r="14"/><path d="M96 96h8"/></g>` : "";
  const earring = fem && acc !== 1 ? `<circle cx="55" cy="112" r="4" fill="#ffd36b"/><circle cx="145" cy="112" r="4" fill="#ffd36b"/>` : "";
  const lash = fem ? `<path d="M70 86 l-5 -4 M130 86 l5 -4" stroke="#1b1410" stroke-width="2.5" stroke-linecap="round"/>` : "";
  const prop = acc === 2 ? `<g transform="translate(150 168)"><path d="M0 0 Q14 -26 30 -30 Q26 -10 0 0Z" fill="#4C9F38"/><path d="M0 0 L22 -22" stroke="#2f6b2a" stroke-width="2"/></g>`
    : acc === 3 ? `<g transform="translate(140 160)"><rect width="34" height="26" rx="3" fill="#fff" stroke="${color}" stroke-width="3"/><path d="M17 0v26" stroke="${color}" stroke-width="2"/></g>` : "";
  return `<svg viewBox="0 0 200 220" width="${size || 160}" height="${(size || 160) * 1.1}" role="img" aria-label="${mt.name}" class="mentor-svg">
    <circle cx="100" cy="112" r="96" fill="${color}" opacity=".16"/>
    ${back}
    <path d="M36 220 Q40 160 100 156 Q160 160 164 220Z" fill="${color}"/>
    <path d="M80 158 L100 182 L120 158Z" fill="#fff" opacity=".9"/>
    <rect x="88" y="132" width="24" height="30" rx="10" fill="${skin}"/>
    <ellipse cx="100" cy="96" rx="46" ry="50" fill="${skin}"/>
    <ellipse cx="54" cy="100" rx="7" ry="11" fill="${skin}"/><ellipse cx="146" cy="100" rx="7" ry="11" fill="${skin}"/>
    ${front}
    <g class="blink">
      <ellipse cx="82" cy="98" rx="10" ry="12" fill="#fff"/><ellipse cx="118" cy="98" rx="10" ry="12" fill="#fff"/>
      <ellipse cx="83" cy="100" rx="7" ry="9" fill="#2b1b12"/><ellipse cx="119" cy="100" rx="7" ry="9" fill="#2b1b12"/>
      <circle cx="86" cy="96" r="3" fill="#fff"/><circle cx="122" cy="96" r="3" fill="#fff"/>
    </g>
    ${lash}
    <path d="M70 80 Q82 74 92 80 M108 80 Q118 74 130 80" stroke="#1b1410" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M98 108 Q100 114 103 110" stroke="${shade}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M86 122 Q100 134 114 122" stroke="#5a1f1a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="70" cy="114" r="7" fill="#ff7a7a" opacity=".28"/><circle cx="130" cy="114" r="7" fill="#ff7a7a" opacity=".28"/>
    ${glasses}${earring}
    <circle cx="70" cy="190" r="14" fill="#fff"/><text x="70" y="195" text-anchor="middle" font-family="Arial" font-weight="700" font-size="14" fill="${color}">${mt.n}</text>
    ${prop}
  </svg>`;
};

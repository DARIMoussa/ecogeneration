/* Learning content and interface text — ENGLISH.
   Mirrors content.fr.js: same keys, same structure, SAME ANSWER ORDER in quizzes. */
window.CONTENT = {
  lang: "en",
  locale: "en-GB",
  verifyPath: "/en/verifier.html",
  ui: {
    sending: "Sending…",
    sendError: "Sending failed. Please try again, or email us at darimoussa5@gmail.com.",
    formOk: "Thank you! Your request has been received. We will reply by email.",
    points: "points",
    tryAgain: "Look again… pick what protects nature 🌱",
    rewardTitle: "Well done, little guardian of the Earth!",
    rewardText: (s) => `You won <strong>${s} points</strong>. You already know how to protect the planet!`,
    replay: "Play again",
    resources: "Resources to help you answer",
    nameIntro: "Enter your full name: it will appear on your certificate.",
    namePh: "First name LAST NAME",
    nameError: "Please enter your name using letters only (spaces, apostrophes and hyphens are allowed).",
    cont: "Continue",
    close: "Close",
    lesson: "the lesson",
    takeTest: "Take the test",
    back: "Back",
    test: "the test",
    testIntro: (n, k) => `Answer the ${n} questions. You need at least ${k} correct answers to pass.`,
    seeResult: "See my result",
    reviewLesson: "Review the lesson",
    unanswered: "You have not answered every question. Submit anyway?",
    grading: "Grading…",
    serviceDown: "The grading service is temporarily unavailable. Please try again in a few minutes.",
    congrats: (n) => `Congratulations, ${n}! 🎉`,
    scoreOfficial: (s, t) => `Score: ${s}/${t}. Here is your official certificate.`,
    refLine: (id, url) => `Reference <strong>${id}</strong> — anyone can check it on <a href="${url}" target="_blank" rel="noopener">the verification page</a>.`,
    download: "Download my certificate",
    finish: "Finish",
    almost: "Almost there!",
    scoreNeed: (s, t, k) => `Score: ${s}/${t}. You need at least ${k} correct answers.`,
    encourage: "Review the lesson and try again — you can do it.",
    retry: "Retake the test",
    certFile: "Certificate-EcoGeneration-",
    cert: {
      
      title: "CERTIFICATE OF ACHIEVEMENT",
      awarded: "This certificate is awarded to",
      passed: "for successfully completing the training module",
      issued: "Issued on ",
      ref: "Ref. ",
      verify: "Verify: ",
      signer: "Founder, ÉcoGénération",
      sealLine: "SDGs · LEADERSHIP · CLIMATE",
      scan: "Scan to verify",
    },
    shareText: "Root Solution for Sustainable Future through Human Education on 17 SDGs — 17 free certified modules on the SDGs, leadership and climate.",
    startModule: "Start the module",
    copied: "Link copied!",
    copy: "Copy link",
    odd: {
      discover: "★ Discovery challenge",
      pickHint: "Pick a goal above to get content suited to your level, or take on the discovery challenge.",
      goal: "SDG",
      understand: "Understand",
      meaning: "What it means",
      yourAction: "Your action",
      project: "Your project",
      caseStudy: "Case study",
      researchQ: "Research question",
      leader: "Be a leader",
      learnMore: "Learn more (UN)",
      takeModule: (n) => `Take the SDG ${n} certified module`,
      videoBy: "Video:",
      watch: "Watch",
      certified: "Certified",
      moduleDesc: (n) => `Lesson, video suited to your level, 10-question test and SDG ${n} certificate in English and French.`,
      levelLabel: "Level",
    },
  },

  leadership: {
    kid: "Set an example for your family and friends, and tell them why it matters.",
    teen: "Pitch this project to your class or club, share out the roles and take the lead.",
    uni: "Build a team, set a measurable goal and present your results to a local decision-maker.",
    research: "Share your findings with decision-makers and the communities concerned, in plain language.",
  },

  goals: [
    { n: 1, title: "No Poverty", brief: "End poverty in all its forms everywhere.",
      kidExplain: "Some families do not have enough money to eat, see a doctor or go to school.",
      kidAct: "Share your things in good condition (books, clothes, toys) with people who need them.",
      teen: "Organise a school-supplies collection with your class for pupils in your neighbourhood and follow up on how it is distributed.",
      uni: "Analyse a social protection or microfinance scheme in your country: who benefits, what results, what limits?",
      research: "Which mechanisms allow cash transfers to reduce poverty sustainably among rural households in West Africa?" },
    { n: 2, title: "Zero Hunger", brief: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.",
      kidExplain: "Everyone needs to eat a variety of foods every day to grow up healthy.",
      kidAct: "Do not waste food: only take what you can eat.",
      teen: "Start a small school garden and measure what it produces over a term.",
      uni: "Study the value chain of a local product (cassava, maize, soy) and identify where post-harvest losses occur.",
      research: "How can agroecology improve smallholder yields and resilience to drought?" },
    { n: 3, title: "Good Health and Well-being", brief: "Ensure healthy lives and promote well-being for all at all ages.",
      kidExplain: "Being healthy means eating well, moving, sleeping well and washing your hands.",
      kidAct: "Wash your hands with soap before eating and after using the toilet.",
      teen: "Run a hygiene campaign at your school (handwashing, safe drinking water) and watch its effect on absences.",
      uni: "Assess access to healthcare in your municipality: distance to the health centre, cost, available staff.",
      research: "What explains the gaps in access to maternal care between urban and rural areas?" },
    { n: 4, title: "Quality Education", brief: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
      kidExplain: "Going to school helps you learn to read, count and understand the world.",
      kidAct: "Help a classmate who is struggling with a lesson.",
      teen: "Set up a tutoring club where older pupils help younger ones for one hour a week.",
      uni: "Identify why pupils drop out of school in one area and propose three realistic measures.",
      research: "What is the effect of mother-tongue instruction in the early years on learning outcomes?" },
    { n: 5, title: "Gender Equality", brief: "Achieve gender equality and empower all women and girls.",
      kidExplain: "Girls and boys have the same rights: to play, to learn and to dream big.",
      kidAct: "Share the chores at home, whether you are a girl or a boy.",
      teen: "Organise a debate on so-called “girls' jobs” and “boys' jobs” and invite women engineers or entrepreneurs.",
      uni: "Analyse the place of women in one sector (agriculture, digital, politics) and the barriers they face.",
      research: "How does women's access to land and credit affect household food security?" },
    { n: 6, title: "Clean Water and Sanitation", brief: "Ensure availability and sustainable management of water and sanitation for all.",
      kidExplain: "Clean water is precious: we need it to drink, cook and wash.",
      kidAct: "Turn the tap off properly and never let water run for nothing.",
      teen: "List your school's water points and toilets and propose a maintenance plan.",
      uni: "Compare two household water treatment options (filtration, chlorination, solar disinfection): cost, effectiveness, acceptance.",
      research: "Which community management models keep rural boreholes working over time?" },
    { n: 7, title: "Affordable and Clean Energy", brief: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
      kidExplain: "Energy makes lamps and machines work. The sun and the wind give us energy without pollution.",
      kidAct: "Switch off the lights and devices when you leave a room.",
      teen: "Calculate your classroom's electricity use and propose savings with figures.",
      uni: "Size a solar kit for a rural health centre: needs, panels, batteries, cost.",
      research: "Which business models make solar mini-grids viable in rural areas?" },
    { n: 8, title: "Decent Work and Economic Growth", brief: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
      kidExplain: "Decent work is safe and fairly paid. Work is for adults.",
      kidAct: "Ask an adult you know to tell you about their job and what they enjoy about it.",
      teen: "Design a student mini-business (recycling, crafts, services) and write its business plan.",
      uni: "Study working conditions in the informal sector of a city and suggest ways to extend social protection.",
      research: "Which schemes help young people move from informal to formal employment?" },
    { n: 9, title: "Industry, Innovation and Infrastructure", brief: "Build resilient infrastructure, promote inclusive and sustainable industrialisation and foster innovation.",
      kidExplain: "Roads, bridges and the Internet connect people. New ideas help everyone.",
      kidAct: "Make something useful out of recycled materials.",
      teen: "Take on an innovation challenge: design a simple prototype that solves a problem at your school.",
      uni: "Analyse how digital tools (mobile money, e-agriculture) are changing a local activity.",
      research: "What conditions help technology innovation ecosystems emerge in West Africa?" },
    { n: 10, title: "Reduced Inequalities", brief: "Reduce inequality within and among countries.",
      kidExplain: "Every person deserves respect, wherever they come from and whether or not they have a disability.",
      kidAct: "Invite a child who is often left out to play with you.",
      teen: "Check whether your school is accessible to people with disabilities and propose improvements.",
      uni: "Compare access to basic services (water, electricity, school) in two municipalities and explain the gaps.",
      research: "How can digital access inequalities between regions be measured and reduced?" },
    { n: 11, title: "Sustainable Cities and Communities", brief: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
      kidExplain: "A pleasant town has trees, clean streets and safe places to play.",
      kidAct: "Put your rubbish in a bin, never in the street.",
      teen: "Map flood-prone areas or illegal dumps in your neighbourhood and present them to the local authorities.",
      uni: "Study how a city manages its waste: collection, sorting, recovery, costs.",
      research: "Which planning strategies reduce the vulnerability of coastal cities to flooding?" },
    { n: 12, title: "Responsible Consumption and Production", brief: "Ensure sustainable consumption and production patterns.",
      kidExplain: "Using less, repairing and reusing means less waste.",
      kidAct: "Use a reusable bottle and bag instead of single-use plastic.",
      teen: "Measure your class's waste for a week, then launch a “zero plastic” challenge.",
      uni: "Carry out a simplified life-cycle assessment of an everyday product (water sachet, wax-print cloth, phone).",
      research: "How can informal recycling chains be integrated into a circular economy?" },
    { n: 13, title: "Climate Action", brief: "Take urgent action to combat climate change and its impacts.",
      kidExplain: "The Earth is getting warmer because of some human activities. Trees help us protect it.",
      kidAct: "Plant a tree with your class and look after it.",
      teen: "Estimate your school's carbon footprint (transport, energy, waste) and propose three actions to reduce it.",
      uni: "Analyse your country's nationally determined contribution (NDC): targets, priority sectors, funding.",
      research: "Which adaptation strategies work best for farmers facing rainfall variability?" },
    { n: 14, title: "Life Below Water", brief: "Conserve and sustainably use the oceans, seas and marine resources.",
      kidExplain: "Fish, turtles and corals live in the water. Plastic puts them in danger.",
      kidAct: "Never throw anything into rivers, lagoons or the sea.",
      teen: "Organise a beach or riverbank clean-up and sort the waste you collect.",
      uni: "Study the impact of small-scale fishing on fish stocks in a coastal or lagoon area.",
      research: "How can marine protected areas be reconciled with fishing communities' incomes?" },
    { n: 15, title: "Life on Land", brief: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification and halt biodiversity loss.",
      kidExplain: "Forests are home to animals and plants, and they give us clean air.",
      kidAct: "Watch the birds and insects near your home and draw them.",
      teen: "Make a photo inventory of your school's biodiversity (trees, birds, insects).",
      uni: "Evaluate a reforestation project: choice of species, survival rate, community involvement.",
      research: "What determines the success of farmer-managed natural regeneration on degraded land?" },
    { n: 16, title: "Peace, Justice and Strong Institutions", brief: "Promote peaceful and inclusive societies, provide access to justice for all and build effective, accountable institutions.",
      kidExplain: "We settle arguments by talking calmly, not by fighting.",
      kidAct: "When two friends argue, help them listen to each other.",
      teen: "Set up a student council that collects everyone's ideas and reports back on its decisions.",
      uni: "Study how a town hall informs citizens about its budget and propose a transparency tool.",
      research: "What is the effect of participatory budgeting on citizens' trust in local institutions?" },
    { n: 17, title: "Partnerships for the Goals", brief: "Strengthen the means of implementation and revitalise the Global Partnership for Sustainable Development.",
      kidExplain: "Together we go further: everyone helps so we can succeed.",
      kidAct: "Do a team project with your classmates.",
      teen: "Partner your club with another school or an association to run a joint SDG project.",
      uni: "Analyse a public-private partnership or an international cooperation: roles, funding, results.",
      research: "What makes multi-stakeholder partnerships effective for achieving the SDGs locally?" },
  ],

  scenarios: [
    { q: "Which house protects nature best?", opts: [{ svg: "bambou", label: "Bamboo house", ok: true }, { svg: "tole", label: "Sheet-metal house", ok: false }], good: "Well done! Bamboo grows fast and respects nature 🌱" },
    { q: "What do you choose for the animals?", opts: [{ svg: "feu", label: "Burn the forest", ok: false }, { svg: "foret", label: "Protect the forest", ok: true }], good: "Great! You are saving the animals 🦋" },
    { q: "How do we get rain and cool air?", opts: [{ svg: "desert", label: "Cut down the trees", ok: false }, { svg: "planter", label: "Plant trees", ok: true }], good: "Yes! Trees bring the rain back 🌧️" },
    { q: "Where does plastic go?", opts: [{ svg: "plastiqueEau", label: "In the water", ok: false }, { svg: "poubelle", label: "In the bin", ok: true }], good: "Brilliant! Clean water, happy fish 🐟" },
  ],

  exos: {
    secondaire: { badge: "Secondary school", titre: "Case study: my town and the environment", prompt: "Choose an environmental problem you can see near you (flooding, heat, waste, coastal erosion). Describe its causes and propose 3 practical solutions your community could apply.", res: [["U", "UNESCO — Climate change education", "Framework and key concepts", "https://www.unesco.org/en/climate-change-education"], ["N", "National Geographic Education", "Maps and data", "https://education.nationalgeographic.org/"], ["L", "UN CC:Learn", "Free introductory courses", "https://unccelearn.org/"]] },
    licence: { badge: "Bachelor's (years 1–3)", titre: "Energy & carbon footprint", prompt: "Compare two energy sources (e.g. solar or a diesel generator) for a village. Assess cost, carbon impact and access. Recommend the best option and justify it.", res: [["L", "UN CC:Learn", "Climate & energy modules", "https://unccelearn.org/"], ["G", "IPCC", "Summaries for policymakers", "https://www.ipcc.ch/"], ["O", "Office for Climate Education", "Scientific resources", "https://www.oce.global/en"]] },
    master: { badge: "Master's (M1–M2)", titre: "Designing a public policy", prompt: "Write a 2-page policy brief to integrate education for sustainable development into the national curriculum. Include objectives, stakeholders, an indicative budget and monitoring indicators.", res: [["S", "UN — Sustainable Development Goals", "Targets and indicators", "https://sdgs.un.org/goals"], ["F", "FAO eLearning Academy", "Climate & food systems", "https://elearning.fao.org/"], ["U", "UNESCO — ESD", "Education for sustainable development", "https://www.unesco.org/en/sustainable-development/education"]] },
    doctorat: { badge: "PhD (years 1–3)", titre: "Framing a research question", prompt: "Identify a gap in the literature on education for sustainable development in sub-Saharan Africa. Formulate a research question, a hypothesis and a data-collection methodology.", res: [["G", "IPCC", "Full reports", "https://www.ipcc.ch/"], ["S", "Google Scholar", "Open-access literature", "https://scholar.google.com/"], ["O", "Office for Climate Education", "Education research", "https://www.oce.global/en"]] },
    recherche: { badge: "Research & Innovation", titre: "Innovation challenge", prompt: "Design a solution (technological, social or educational) that makes SDG education available offline in rural areas. Describe the prototype, the users and the expected impact.", res: [["F", "FAO eLearning Academy", "Innovation & sustainability", "https://elearning.fao.org/"], ["S", "UN — Sustainable Development Goals", "Data and reports", "https://sdgs.un.org/goals"], ["G", "Google Scholar", "State of the art", "https://scholar.google.com/"]] },
  },

  courses: {
    odd: {
      titre: "Introduction to the 17 SDGs",
      html: `<p>In <strong>September 2015</strong>, the <strong>193 UN Member States</strong> adopted the <strong>2030 Agenda for Sustainable Development</strong>. It sets <strong>17 goals</strong>, broken down into <strong>169 targets</strong>, to be achieved by <strong>2030</strong>. They follow on from the 8 Millennium Development Goals (2000–2015).</p>
        <p>The SDGs are <strong>universal</strong> (they apply to every country, rich or poor) and <strong>indivisible</strong>: progress on one often helps the others. Their central principle: <em>“leave no one behind”</em>.</p>
        <h4>The 17 goals</h4>
        <ul class="odd-grid">
          <li><b>1</b>No Poverty<small>End poverty in all its forms</small></li>
          <li><b>2</b>Zero Hunger<small>Food security, sustainable agriculture</small></li>
          <li><b>3</b>Good Health and Well-being<small>Healthy lives for all, at all ages</small></li>
          <li><b>4</b>Quality Education<small>Inclusive and equitable education</small></li>
          <li><b>5</b>Gender Equality<small>Empower women and girls</small></li>
          <li><b>6</b>Clean Water and Sanitation<small>Access to water, sustainable management</small></li>
          <li><b>7</b>Affordable and Clean Energy<small>Reliable, sustainable, modern energy</small></li>
          <li><b>8</b>Decent Work and Economic Growth<small>Productive employment for all</small></li>
          <li><b>9</b>Industry, Innovation and Infrastructure<small>Resilient infrastructure</small></li>
          <li><b>10</b>Reduced Inequalities<small>Within and among countries</small></li>
          <li><b>11</b>Sustainable Cities and Communities<small>Safe, resilient, inclusive cities</small></li>
          <li><b>12</b>Responsible Consumption and Production<small>Less waste</small></li>
          <li><b>13</b>Climate Action<small>Urgent action on climate</small></li>
          <li><b>14</b>Life Below Water<small>Oceans, seas and marine resources</small></li>
          <li><b>15</b>Life on Land<small>Forests, soils, biodiversity</small></li>
          <li><b>16</b>Peace, Justice and Strong Institutions<small>Peaceful and just societies</small></li>
          <li><b>17</b>Partnerships for the Goals<small>Cooperation and finance</small></li>
        </ul>
        <h4>The “5 Ps”</h4>
        <p>The SDGs are often grouped into five dimensions: <strong>People</strong>, <strong>Planet</strong>, <strong>Prosperity</strong>, <strong>Peace</strong> and <strong>Partnership</strong>.</p>
        <h4>Everything is connected: an example</h4>
        <p>A school that installs solar panels (SDG 7) cuts its emissions (SDG 13), lets pupils study in the evening (SDG 4) and saves money for other needs (SDG 1). A single action can advance several goals.</p>
        <h4>Act at your level</h4>
        <ul>
          <li>Sort and reduce your waste (SDG 12), save water (SDG 6) and energy (SDG 7).</li>
          <li>Plant and protect trees at your school or in your neighbourhood (SDGs 13 and 15).</li>
          <li>Stand up for girls' access to school (SDGs 4 and 5).</li>
          <li>Start an SDG club and run projects with other schools or associations (SDG 17).</li>
        </ul>
        <p style="opacity:.75;font-size:.88rem">Official source: <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener">sdgs.un.org — The 17 Goals</a></p>`,
      quiz: [
        { q: "In which year did the UN adopt the SDGs?", opts: ["2000", "2015", "2020"] },
        { q: "How many goals does the 2030 Agenda contain?", opts: ["8", "17", "169"] },
        { q: "How many targets specify these goals?", opts: ["17", "100", "169"] },
        { q: "What is the deadline for achieving the SDGs?", opts: ["2025", "2030", "2050"] },
        { q: "Which SDG is about climate action?", opts: ["SDG 7", "SDG 13", "SDG 15"] },
        { q: "SDG 4 is about…", opts: ["Quality education", "Clean water", "Life below water"] },
        { q: "Protecting forests and biodiversity mainly falls under…", opts: ["SDG 14 — Life Below Water", "SDG 15 — Life on Land", "SDG 9 — Industry"] },
        { q: "What is the central principle of the 2030 Agenda?", opts: ["Leave no one behind", "Growth above all", "Every country for itself"] },
        { q: "The SDGs apply…", opts: ["Only to developing countries", "To all countries", "Only to rich countries"] },
        { q: "A school installs solar panels. Which SDGs does it directly advance?", opts: ["SDGs 7 and 13", "SDGs 14 and 16", "SDGs 2 and 10"] },
      ],
    },
    leadership: {
      titre: "Leadership for Sustainable Development",
      lecon: [
        "A sustainable development leader knows that the big challenges (poverty, climate, inequality) are first of all a question of human behaviour.",
        "Act locally: start with your community, your school, your neighbourhood, with concrete and measurable actions.",
        "Mobilise: inform, inspire and unite others around shared goals.",
        "Education is the most lasting lever: raising awareness early shapes responsible citizens for life.",
        "A just transition leaves no one behind: it includes women, young people and the most vulnerable communities.",
      ],
      quiz: [
        { q: "According to this module, the big sustainable development challenges are first of all a question of…", opts: ["Technology only", "Human behaviour", "Luck"] },
        { q: "Where should a sustainable development leader start?", opts: ["With their local community", "On another continent", "Nowhere"] },
        { q: "What is the most lasting lever for changing behaviour?", opts: ["Ignoring the problem", "Education", "Deforestation"] },
        { q: "A just transition must include…", opts: ["Only the richest", "Vulnerable communities", "No one"] },
        { q: "To mobilise means…", opts: ["Discouraging others", "Uniting people around shared goals", "Acting alone"] },
      ],
    },
  },
};

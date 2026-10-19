/* Parcours 17 ODD × 17 modules × 3 cours — interface. Correction et attestations : /api/cours (serveur). */
(function () {
  const L = document.documentElement.lang === "en" ? "en" : "fr", P = PI18N[L], PROG = window.PROGRAMME;
  const COLORS = ["#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21", "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367", "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B", "#00689D", "#19486A"];
  const fgOn = (n) => ([2, 7, 11].includes(n) ? "#1b2620" : "#fff");
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");
  const NAME_RE = /^[\p{L}][\p{L}\p{M} '’.\-]{1,59}$/u;
  const SIG = new Image(); SIG.src = "/assets/signature.png?v=1";
  const sigReady = new Promise((r) => { if (SIG.complete && SIG.naturalWidth) r(); else { SIG.onload = r; SIG.onerror = r; } });

  // ---- Apprenant (stockage local, avec repli si indisponible) ----
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
  function newToken() { const b = new Uint8Array(18); crypto.getRandomValues(b); return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  const me = Object.assign({ k: newToken(), name: "", level: "secondaire" }, store.get("rs-learner") || {});
  const saveMe = () => store.set("rs-learner", me);
  saveMe();
  let prog = store.get("rs-progress-" + me.k.slice(0, 8)) || { courses: {}, modules: {}, sdgs: {} };
  const saveProg = () => store.set("rs-progress-" + me.k.slice(0, 8), prog);

  async function api(path, body) {
    const r = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    let d = {}; try { d = await r.json(); } catch {}
    if (!r.ok && !("passed" in d)) throw new Error(d.error || P.serviceDown);
    return d;
  }
  async function refresh() {
    try { const d = await api("/api/progress", { k: me.k }); prog = { courses: d.courses || {}, modules: d.modules || {}, sdgs: d.sdgs || {} }; saveProg(); } catch {}
  }

  // ---- Contenu des cours (chargé à la demande) ----
  const cache = {};
  async function content(n) {
    if (!cache[n]) cache[n] = fetch(`/assets/odd/o${n}.${L}.json?v=1`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    return cache[n];
  }

  // ---- Espace apprenant ----
  function renderMe() {
    const done = Object.keys(prog.courses).length, mods = Object.keys(prog.modules).length, sdgs = Object.keys(prog.sdgs).length;
    $("#me").innerHTML = `<h2>${P.you}</h2>
      <div class="me-grid">
        <label>${P.namePh}<input id="me-name" maxlength="60" autocomplete="name" value="${esc(me.name)}"></label>
        <label>${P.level}<select id="me-level">${P.levels.map(([v, t]) => `<option value="${v}"${v === me.level ? " selected" : ""}>${t}</option>`).join("")}</select></label>
      </div>
      <p class="me-stats">${P.stats(done, mods, sdgs)} · <a href="#/attestations">${P.myCerts}</a></p>
      <details class="me-code"><summary>${P.code}</summary>
        <p>${P.codeHelp}</p>
        <div class="row"><code id="me-k">${esc(me.k)}</code><button type="button" class="btn-ghost" id="me-copy">${P.copy}</button></div>
        <div class="row"><input id="me-new" placeholder="${P.codePh}" autocomplete="off"><button type="button" class="btn-ghost" id="me-load">${P.load}</button></div>
      </details>`;
    $("#me-name").addEventListener("change", (e) => { me.name = e.target.value.replace(/\s+/g, " ").trim(); saveMe(); });
    $("#me-level").addEventListener("change", (e) => { me.level = e.target.value; saveMe(); route(); });
    $("#me-copy").addEventListener("click", (e) => { navigator.clipboard?.writeText(me.k).then(() => { e.target.textContent = P.copied; setTimeout(() => (e.target.textContent = P.copy), 1500); }); });
    $("#me-load").addEventListener("click", async () => {
      const v = $("#me-new").value.trim();
      if (!/^[A-Za-z0-9_-]{22,43}$/.test(v)) return alert(P.badCode);
      me.k = v; saveMe(); prog = { courses: {}, modules: {}, sdgs: {} }; await refresh(); renderMe(); route();
    });
  }

  const doneIn = (n) => Object.keys(prog.courses).filter((k) => k.startsWith(`o${n}m`)).length;
  const lvlName = () => (P.levels.find(([v]) => v === me.level) || P.levels[2])[1];

  // ---- Vues ----
  function viewHome() {
    app.innerHTML = `<div class="sdg-grid">${PROG.map((s) => {
      const ready = s.ready.filter(Boolean).length, d = doneIn(s.n), M = MENTORS[s.n - 1];
      return `<a class="sdg-tile" href="#/odd/${s.n}" style="--c:${COLORS[s.n - 1]};--fg:${fgOn(s.n)}">
        <span class="t-head"><b>${s.n}</b><span>${esc(s[L])}</span></span>
        <span class="t-mentor">${mentorSVG(M, COLORS[s.n - 1], 64)}<span>${esc(M.name)}<small>${esc(M.role[L])}</small></span></span>
        <span class="t-meta">17 ${P.modules} · ${ready ? `${ready} ${P.ready}` : P.soon}</span>
        ${ready ? `<span class="bar"><i style="width:${(d / (ready * 3)) * 100}%"></i></span><small>${P.progress(d, ready * 3)}</small>` : ""}
        ${prog.sdgs[`o${s.n}`] ? `<span class="badge">🏆 ${P.sdgCert}</span>` : ""}
      </a>`;
    }).join("")}</div>`;
  }

  function videoBlock(s) {
    const kid = me.level === "maternelle" || me.level === "primaire", v = s.v || {}, C = window.VIDEO_CREDITS, out = [];
    const fr = (id, cap) => `<figure><div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0${L === "fr" ? "&cc_load_policy=1&cc_lang_pref=fr&hl=fr" : "&hl=en"}" title="${esc(cap)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><figcaption>${esc(cap)}</figcaption></figure>`;
    if (L === "fr" && v.kidFR) out.push(fr(v.kidFR, C.kidFR));
    if (kid && v.kidEN) out.push(fr(v.kidEN, C.kidEN + P.kidNote));
    if (!kid && v.std) out.push(fr(v.std, C.std + P.stdNote));
    return out.length ? `<section class="card"><h3>${P.watch}</h3><p class="muted">${P.videoNote(esc(lvlName()))}</p><div class="vids">${out.join("")}</div></section>` : "";
  }

  function mentorCard(n) {
    const M = MENTORS[n - 1];
    return `<section class="card mentor" style="--c:${COLORS[n - 1]}">
      <div class="m-art">${mentorSVG(M, COLORS[n - 1], 150)}</div>
      <div><p class="eyebrow">${P.mentor}</p><h3>${esc(M.name)} <small>· ${esc(M.role[L])}</small></h3>
      <p class="bubble"><strong>${P.mentorSays}${L === "fr" ? " :" : ":"}</strong> ${esc(M.tip[L])}</p>
      <blockquote>« ${esc(M.quote[L])} »<cite>— ${esc(M.by[L])}</cite></blockquote></div></section>`.replace(/« (.*?) »/s, L === "fr" ? "« $1 »" : "“$1”");
  }

  async function viewSdg(n, openM) {
    const s = PROG[n - 1], data = s.ready.some(Boolean) ? await content(n) : null;
    const sdgRec = prog.sdgs[`o${n}`];
    app.innerHTML = `<p><a href="#/">${P.back}</a></p>
      <header class="sdg-head" style="--c:${COLORS[n - 1]};--fg:${fgOn(n)}"><b>${n}</b><div><small>${P.goal} ${n}</small><h2>${esc(s[L])}</h2>
      <p>${P.progress(doneIn(n), s.ready.filter(Boolean).length * 3)}</p></div></header>
      ${sdgRec ? `<p class="win">🏆 ${P.sdgCert} — <a href="#/cert/${sdgRec.id}">${P.seeCert}</a></p>` : ""}
      ${mentorCard(n)}
      ${videoBlock(s)}
      <ol class="mods">${s.modules.map((t, i) => {
        const m = i + 1, ready = s.ready[i] && data, mk = `o${n}m${m}`, mRec = prog.modules[mk];
        const cs = ready ? data.modules[i].courses : [];
        const nd = cs.filter((c) => prog.courses[`${mk}c${c.c}`]).length;
        return `<li class="mod${ready ? "" : " off"}" id="m${m}"><details${openM === m ? " open" : ""}><summary>
            <span class="mn" style="--c:${COLORS[n - 1]};--fg:${fgOn(n)}">${m}</span><span class="mt">${esc(t[L === "fr" ? 0 : 1])}</span>
            <span class="ms">${ready ? (mRec ? "✓ " + P.done : `${nd}/3`) : P.prep}</span></summary>
          ${ready ? `<ul class="courses">${cs.map((c) => { const rec = prog.courses[`${mk}c${c.c}`]; return `<li>
              <span>${P.course} ${c.c} — ${esc(c.title)}</span>
              ${rec ? `<a class="chip ok" href="#/cert/${rec.id}">✓ ${P.done}</a>` : ""}
              <a class="btn-primary sm" href="#/odd/${n}/m/${m}/c/${c.c}">${rec ? P.review : P.start}</a></li>`; }).join("")}</ul>
            ${mRec ? `<p class="win">🎖️ ${P.moduleCert} — <a href="#/cert/${mRec.id}">${P.seeCert}</a></p>` : ""}` : `<p class="muted">${P.soon}</p>`}
          </details></li>`;
      }).join("")}</ol>`;
    if (openM) document.getElementById("m" + openM)?.scrollIntoView({ block: "center" });
  }

  async function viewCourse(n, m, c) {
    const data = await content(n), mod = data?.modules[m - 1], co = mod?.courses[c - 1];
    if (!co) { app.innerHTML = `<p><a href="#/odd/${n}">${P.backOdd(n)}</a></p><p>${P.notYet}</p>`; return; }
    const s = PROG[n - 1];
    app.innerHTML = `<p><a href="#/odd/${n}/m/${m}">${P.backOdd(n)} · ${P.module} ${m}</a></p>
      <header class="sdg-head slim" style="--c:${COLORS[n - 1]};--fg:${fgOn(n)}"><b>${n}</b><div><small>${P.goal} ${n} · ${esc(s[L])} · ${P.module} ${m} : ${esc(mod.title)}</small>
      <h2>${P.course} ${c} — ${esc(co.title)}</h2></div></header>
      <section class="card lesson"><h3>${P.lesson}</h3>${co.html}</section>
      <section class="card"><h3>${P.quiz}</h3><p class="muted">${P.quizIntro}</p>
        <label class="name-l">${P.namePh}<input id="q-name" maxlength="60" autocomplete="name" value="${esc(me.name)}"></label>
        <form id="quiz">${co.quiz.map((q, i) => `<fieldset><legend>${i + 1}. ${q.q}</legend>${q.opts.map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</fieldset>`).join("")}
        <button class="btn-primary" type="submit">${P.submit}</button></form>
        <div id="result" aria-live="polite"></div></section>`;
    $("#quiz").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#q-name").value.replace(/\s+/g, " ").trim();
      if (!NAME_RE.test(name)) { alert(P.needName); $("#q-name").focus(); return; }
      me.name = name; saveMe();
      const answers = co.quiz.map((_, i) => { const x = e.target.querySelector(`input[name="q${i}"]:checked`); return x ? +x.value : -1; });
      if (answers.includes(-1) && !confirm(P.unanswered)) return;
      const btn = e.target.querySelector("button"); btn.disabled = true; btn.textContent = P.grading;
      let d;
      try { d = await api("/api/cours", { course: `o${n}m${m}c${c}`, k: me.k, name, answers }); }
      catch (err) { alert(err.message || P.serviceDown); btn.disabled = false; btn.textContent = P.submit; return; }
      btn.disabled = false; btn.textContent = P.submit;
      const res = $("#result");
      if (!d.passed) { res.innerHTML = `<p class="fail">${P.failed(d.score, d.total, d.need)}</p>`; res.scrollIntoView({ block: "center" }); return; }
      prog = { courses: d.progress.courses, modules: d.progress.modules, sdgs: d.progress.sdgs }; saveProg(); renderMe();
      const nextC = c < 3 ? `#/odd/${n}/m/${m}/c/${c + 1}` : m < 17 && s.ready[m] ? `#/odd/${n}/m/${m + 1}/c/1` : `#/odd/${n}`;
      const extra = d.issued.filter((r) => r.kind !== "course");
      res.innerHTML = `<p class="win">${P.passed(d.score, d.total)}</p>
        ${extra.map((r) => `<p class="win big">${r.kind === "module" ? P.newModule : P.newSdg}</p>`).join("")}
        <div id="certs"></div>
        <p class="actions"><a class="btn-primary" href="${nextC}">${P.next}</a> <a class="btn-ghost" href="#/odd/${n}/m/${m}">${P.toModule}</a></p>`;
      const box = $("#certs");
      for (const r of [d.course, ...extra]) box.insertAdjacentHTML("beforeend", certBlock(r));
      await drawAll(box);
      res.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  // ---- Attestations ----
  const allRecs = () => [...Object.values(prog.sdgs), ...Object.values(prog.modules), ...Object.values(prog.courses)];
  function infoFor(rec, lg) {
    const s = PROG[rec.n - 1];
    const strip = (t) => (t || "").split(" — ").slice(1).join(" — ");
    return { kind: rec.kind, n: rec.n, m: rec.m, c: rec.c, color: COLORS[rec.n - 1], sdgTitle: s[lg],
      moduleTitle: rec.m ? s.modules[rec.m - 1][lg === "fr" ? 0 : 1] : "", courseTitle: strip(lg === "fr" ? rec.title : rec.titleEn) };
  }
  function certBlock(rec) {
    const langs = L === "fr" ? ["fr", "en"] : ["en", "fr"];
    return `<div class="cert" data-id="${esc(rec.id)}"><h4>${esc(P.kinds[rec.kind])} · ${esc(L === "fr" ? rec.title : rec.titleEn)}</h4>
      <p class="muted">${P.refLine} ${esc(rec.id)} · <a href="${P.verify}?id=${encodeURIComponent(rec.id)}" target="_blank" rel="noopener">${P.verifyLink} ↗</a></p>
      <div class="pair">${langs.map((lg) => `<figure><figcaption>${lg === "fr" ? "🇫🇷 " + P.copyFr : "🇬🇧 " + P.copyEn}</figcaption>
        <canvas width="1200" height="850" data-lg="${lg}"></canvas><button type="button" class="btn-ghost sm" data-dl="${lg}">${P.dl}</button></figure>`).join("")}</div></div>`;
  }
  async function drawAll(root) {
    await sigReady; try { await document.fonts.load("700 40px Frak"); } catch {}
    const byId = Object.fromEntries(allRecs().map((r) => [r.id, r]));
    root.querySelectorAll(".cert").forEach((el) => {
      const rec = byId[el.dataset.id]; if (!rec) return;
      el.querySelectorAll("canvas").forEach((cv) => drawArtCert(cv, rec, cv.dataset.lg, infoFor(rec, cv.dataset.lg), SIG));
      el.querySelectorAll("[data-dl]").forEach((b) => b.addEventListener("click", () => {
        const cv = el.querySelector(`canvas[data-lg="${b.dataset.dl}"]`), a = document.createElement("a");
        a.download = `${P.file}${b.dataset.dl.toUpperCase()}-${rec.module}-${rec.name.replace(/\s+/g, "-")}.png`; a.href = cv.toDataURL("image/png"); a.click();
      }));
    });
  }
  async function viewCerts(only) {
    const recs = only ? allRecs().filter((r) => r.id === only) : allRecs();
    app.innerHTML = `<p><a href="#/">${P.back}</a></p><h2>${P.myCerts}</h2>${recs.length ? recs.map(certBlock).join("") : `<p>${P.noCerts}</p>`}`;
    await drawAll(app);
  }

  // ---- Routage ----
  async function route() {
    const h = location.hash.replace(/^#\/?/, "").split("/");
    try {
      if (h[0] === "odd" && +h[1] >= 1 && +h[1] <= 17) {
        const n = +h[1];
        if (h[2] === "m" && h[4] === "c") await viewCourse(n, +h[3], +h[5]);
        else await viewSdg(n, h[2] === "m" ? +h[3] : 0);
      } else if (h[0] === "attestations") await viewCerts();
      else if (h[0] === "cert") await viewCerts(h[1]);
      else viewHome();
    } catch (e) { app.innerHTML = `<p>${P.serviceDown}</p>`; }
    if (location.hash && !(h[0] === "odd" && h[2] === "m" && !h[4])) window.scrollTo({ top: $("#app").offsetTop - 70 });
  }
  window.addEventListener("hashchange", route);
  renderMe(); route();
  refresh().then(() => { renderMe(); if (!location.hash.includes("/c/")) route(); });
})();

/* Attestations du parcours : un design DIFFÉRENT pour chaque cours (bordure, coins, fond, couleurs),
   plus riche pour un module, et prestige (or) pour un ODD complet. Même signataire : Moussa DARI. */
(function () {
  const ART_I18N = {
    fr: {
      course: "ATTESTATION DE COURS", module: "ATTESTATION DE MODULE", sdg: "CERTIFICAT DE PARCOURS COMPLET",
      pCourse: "pour avoir réussi le cours", pModule: "pour avoir réussi les 3 cours du module", pSdg: "pour avoir réussi les 17 modules (51 cours) de",
      goal: "ODD", mod: "Module", cours: "Cours", score: "Score", awarded: "Décernée à",
    },
    en: {
      course: "COURSE CERTIFICATE", module: "MODULE CERTIFICATE", sdg: "FULL PATHWAY CERTIFICATE",
      pCourse: "for successfully completing the course", pModule: "for successfully completing the 3 courses of the module", pSdg: "for successfully completing the 17 modules (51 courses) of",
      goal: "SDG", mod: "Module", cours: "Course", score: "Score", awarded: "Awarded to",
    },
  };
  window.ART_I18N = ART_I18N;

  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const hex = (a) => "#" + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  const mix = (a, b, t) => { const A = rgb(a), B = rgb(b); return hex(A.map((v, i) => v + (B[i] - v) * t)); };
  function rotHue(h, deg) {
    let [r, g, b] = rgb(h).map((v) => v / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    let H = 0, S = 0;
    if (d) { S = d / (1 - Math.abs(2 * l - 1)); H = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; H *= 60; }
    H = (H + deg + 360) % 360;
    const C = (1 - Math.abs(2 * l - 1)) * S, X = C * (1 - Math.abs(((H / 60) % 2) - 1)), m = l - C / 2;
    const [R, G, B] = H < 60 ? [C, X, 0] : H < 120 ? [X, C, 0] : H < 180 ? [0, C, X] : H < 240 ? [0, X, C] : H < 300 ? [X, 0, C] : [C, 0, X];
    return hex([R, G, B].map((v) => (v + m) * 255));
  }
  function rng(str) { let h = 2166136261; for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // Parcourt le périmètre d'un rectangle et dessine un motif tous les `step` pixels
  function alongRect(x, X0, Y0, W, H, step, motif) {
    const sides = [[X0, Y0, W, 0], [X0 + W, Y0, H, Math.PI / 2], [X0 + W, Y0 + H, W, Math.PI], [X0, Y0 + H, H, -Math.PI / 2]];
    let k = 0;
    for (const [sx, sy, len, a] of sides) {
      const n = Math.floor(len / step), st = len / n;
      for (let i = 0; i < n; i++) { x.save(); x.translate(sx + Math.cos(a) * (i + 0.5) * st, sy + Math.sin(a) * (i + 0.5) * st); x.rotate(a); motif(k++); x.restore(); }
    }
  }
  const BORDERS = [
    (x, c) => { x.fillStyle = c; x.beginPath(); x.arc(0, 0, 4, 0, 7); x.fill(); },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 2.5; x.beginPath(); x.moveTo(-8, 5); x.lineTo(0, -5); x.lineTo(8, 5); x.stroke(); },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 2.5; x.beginPath(); x.moveTo(-10, 6); x.lineTo(-10, -6); x.lineTo(6, -6); x.lineTo(6, 2); x.lineTo(-2, 2); x.lineTo(-2, -2); x.stroke(); x.beginPath(); x.moveTo(-10, 6); x.lineTo(10, 6); x.stroke(); },
    (x, c) => { x.fillStyle = c; x.save(); x.rotate(Math.PI / 4); x.fillRect(-4, -4, 8, 8); x.restore(); x.fillRect(-11, -0.8, 22, 1.6); },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 2.2; x.beginPath(); x.arc(0, 2, 8, Math.PI, 0); x.stroke(); },
    (x, c, k) => { x.strokeStyle = c; x.lineWidth = 2.2; x.beginPath(); x.ellipse(0, 0, 8, 3.5, k % 2 ? 0.7 : -0.7, 0, 7); x.stroke(); },
  ];
  const CORNERS = [
    (x, c, a) => { for (let i = 0; i < 8; i++) { x.save(); x.rotate((i * Math.PI) / 4); x.fillStyle = i % 2 ? a : c; x.beginPath(); x.ellipse(0, -14, 6, 13, 0, 0, 7); x.fill(); x.restore(); } x.fillStyle = "#fff"; x.beginPath(); x.arc(0, 0, 5, 0, 7); x.fill(); },
    (x, c, a) => { for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? a : c; x.beginPath(); x.moveTo(-6, -6); const t0 = (i / 5) * (Math.PI / 2), t1 = ((i + 1) / 5) * (Math.PI / 2); x.lineTo(-6 + 46 * Math.cos(t0), -6 + 46 * Math.sin(t0)); x.lineTo(-6 + 46 * Math.cos(t1), -6 + 46 * Math.sin(t1)); x.fill(); } },
    (x, c, a) => { x.strokeStyle = c; x.lineWidth = 2; x.beginPath(); x.moveTo(-8, -8); x.quadraticCurveTo(30, -4, 44, 30); x.stroke(); for (let i = 1; i < 6; i++) { const t = i / 6, px = -8 + 52 * t, py = -8 + 38 * t * t; x.fillStyle = i % 2 ? a : c; x.save(); x.translate(px, py); x.rotate(0.6 + t); x.beginPath(); x.ellipse(0, -7, 4, 8, 0, 0, 7); x.fill(); x.restore(); } },
    (x, c, a) => { for (let i = 0; i < 3; i++) { x.save(); x.rotate((i * Math.PI) / 12); x.strokeStyle = i % 2 ? a : c; x.lineWidth = 2.5; const s = 34 - i * 9; x.strokeRect(-s / 2 + 10, -s / 2 + 10, s, s); x.restore(); } },
    (x, c, a) => { x.fillStyle = c; x.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 9 : 24, t = (i * Math.PI) / 8; x.lineTo(14 + r * Math.cos(t), 14 + r * Math.sin(t)); } x.fill(); x.fillStyle = a; x.beginPath(); x.arc(14, 14, 6, 0, 7); x.fill(); },
  ];
  const TEXTURES = [
    (x, c) => { x.strokeStyle = c; x.lineWidth = 0.8; for (let k = 0; k < 14; k++) { x.beginPath(); for (let px = 70; px <= 1130; px += 6) x.lineTo(px, 425 + Math.sin(px / 60 + k * 0.45) * (60 + k * 16)); x.stroke(); } },
    (x, c) => { x.fillStyle = c; for (let py = 90; py < 790; py += 22) for (let px = 90; px < 1120; px += 22) { x.beginPath(); x.arc(px, py, 1.6, 0, 7); x.fill(); } },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 0.9; for (let k = -800; k < 1200; k += 18) { x.beginPath(); x.moveTo(70 + k, 80); x.lineTo(70 + k + 700, 780); x.stroke(); } },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 0.9; for (let r = 30; r < 640; r += 16) { x.beginPath(); x.arc(600, 425, r, 0, 7); x.stroke(); } },
    (x, c) => { x.strokeStyle = c; x.lineWidth = 0.9; for (let py = 90; py < 790; py += 20) { x.beginPath(); for (let px = 70; px <= 1130; px += 8) x.lineTo(px, py + Math.sin(px / 24) * 5); x.stroke(); } },
  ];

  function laurel(x, cx, cy, R, c) {
    for (const s of [-1, 1]) for (let i = 0; i < 8; i++) {
      const t = Math.PI / 2 + s * (0.8 + i * 0.27), px = cx + R * Math.cos(t), py = cy + R * Math.sin(t) * 0.9;
      x.save(); x.translate(px, py); x.rotate(t + (s > 0 ? Math.PI : 0) + s * 0.5); x.fillStyle = i % 2 ? c : mix(c, "#ffffff", 0.25);
      x.beginPath(); x.ellipse(0, 0, 6, 15, 0, 0, 7); x.fill(); x.restore();
    }
  }

  function seal(x, cx, cy, R, year, K, ink) {
    x.save(); x.translate(cx, cy); x.rotate(-0.15);
    x.strokeStyle = ink; x.fillStyle = ink; x.textAlign = "center"; x.textBaseline = "middle";
    x.lineWidth = 3.5; x.beginPath(); x.arc(0, 0, R, 0, 7); x.stroke();
    x.lineWidth = 1.4; x.beginPath(); x.arc(0, 0, R - 7, 0, 7); x.stroke(); x.beginPath(); x.arc(0, 0, R - 29, 0, 7); x.stroke();
    const ring = "ROOT SOLUTION • SUSTAINABLE FUTURE • HUMAN EDUCATION • 17 SDGs • ", rr = R - 18;
    x.font = "700 9.5px Arial";
    const w = [...ring].map((ch) => x.measureText(ch).width), tot = w.reduce((u, v) => u + v, 0), sc = (Math.PI * 2 * rr) / tot;
    let ang = -Math.PI / 2;
    [...ring].forEach((ch, i) => { const a = ang + (w[i] * sc) / 2 / rr; x.save(); x.rotate(a + Math.PI / 2); x.translate(0, -rr); x.fillText(ch, 0, 0); x.restore(); ang += (w[i] * sc) / rr; });
    x.font = "700 40px Frak, Georgia, serif"; x.fillText("R", 0, -9);
    x.font = "700 11px Arial"; x.fillText("★ " + year + " ★", 0, 17);
    x.font = "700 6.5px Arial"; x.fillText(K.sealCenter, 0, 30);
    x.restore(); x.textBaseline = "alphabetic";
  }

  function gothText(x, text, cx, y, size, color, accent) {
    const parts = [];
    for (const w of text.split(/(\s+)/)) { if (/^[A-Z]/.test(w)) { let i = 0; while (i < w.length && /[A-Z]/.test(w[i])) i++; parts.push([w.slice(0, i), 1], [w.slice(i), 0]); } else parts.push([w, 0]); }
    const font = (g) => (g ? `700 ${Math.round(size * 1.22)}px Frak, Georgia, serif` : `600 ${size}px Georgia, serif`);
    let W = 0; parts.forEach(([t, g]) => { x.font = font(g); W += x.measureText(t).width; });
    let px = cx - W / 2; x.textAlign = "left";
    parts.forEach(([t, g]) => { x.font = font(g); x.fillStyle = g ? accent : color; x.fillText(t, px, y); px += x.measureText(t).width; });
    x.textAlign = "center";
  }
  const fit = (x, t, max, start, min, weight, fam) => { let s = start; do { x.font = `${weight} ${s}px ${fam}`; s -= 2; } while (x.measureText(t).width > max && s > min); };

  /* info = { kind, n, m, c, sdgTitle, moduleTitle, courseTitle, color } (titres dans la langue lg) */
  window.drawArtCert = function (canvas, rec, lg, info, signature) {
    const K = window.CERT_I18N[lg], A = ART_I18N[lg], x = canvas.getContext("2d");
    const kind = info.kind, n = info.n;
    const d = kind === "course" ? (info.m - 1) * 3 + (info.c - 1) : kind === "module" ? 60 + info.m : 90 + n;
    const R = rng(rec.module + "|" + kind);
    const base = info.color, gold = "#b8932f";
    const dark = mix(base, "#0f1d17", 0.55), second = rotHue(base, 40 + Math.floor(R() * 260)), paper = mix(base, "#fffaf0", 0.93);
    const frame = kind === "sdg" ? gold : dark, acc = kind === "sdg" ? base : second;
    const flip = d % 2 === 1; // disposition : cachet et QR inversés

    x.fillStyle = paper; x.fillRect(0, 0, 1200, 850);
    x.save(); x.globalAlpha = kind === "sdg" ? 0.16 : 0.1; TEXTURES[Math.floor(d / 30 + n) % 5](x, base); x.restore();
    if (kind === "sdg") { x.save(); x.globalAlpha = 0.1; TEXTURES[(Math.floor(d / 30 + n) + 2) % 5](x, gold); x.restore(); }
    x.save(); x.beginPath(); x.rect(0, 0, 1200, 850); x.rect(56, 56, 1088, 738); x.fillStyle = mix(base, "#ffffff", 0.82); x.fill("evenodd"); x.restore();
    x.strokeStyle = frame; x.lineWidth = kind === "course" ? 10 : 14; x.strokeRect(24, 24, 1152, 802);
    if (kind !== "course") { x.strokeStyle = kind === "sdg" ? base : acc; x.lineWidth = 3; x.strokeRect(40, 40, 1120, 770); }
    alongRect(x, 48, 48, 1104, 754, 22, (k) => BORDERS[d % 6](x, kind === "sdg" ? gold : (k % 2 ? acc : base), k));
    x.strokeStyle = mix(frame, "#ffffff", 0.3); x.lineWidth = 1.5; x.strokeRect(62, 62, 1076, 726);
    [[48, 48, 0], [1152, 48, Math.PI / 2], [1152, 802, Math.PI], [48, 802, -Math.PI / 2]].forEach(([cx, cy, a]) => {
      x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = paper; x.fillRect(-14, -14, 60, 60); CORNERS[Math.floor(d / 6) % 5](x, kind === "sdg" ? gold : base, acc); x.restore();
    });

    // Médaillon ODD
    const mx = flip ? 1050 : 150;
    x.fillStyle = base; x.beginPath(); x.arc(mx, 140, 46, 0, 7); x.fill();
    x.strokeStyle = kind === "sdg" ? gold : "#fff"; x.lineWidth = 4; x.beginPath(); x.arc(mx, 140, 40, 0, 7); x.stroke();
    x.fillStyle = [2, 7, 11].includes(n) ? "#1b2620" : "#fff"; x.textAlign = "center"; x.font = "700 13px Arial"; x.fillText(A.goal, mx, 124); x.font = "700 38px Arial"; x.fillText(String(n), mx, 162);

    gothText(x, window.BRAND.line1, 600, 124, 28, dark, base);
    gothText(x, window.BRAND.line2, 600, 162, 21, dark, base);

    // Titre (bandeau pour module / ODD)
    const title = A[kind];
    if (kind === "course") { x.fillStyle = dark; fit(x, title, 700, 28, 18, 700, "Arial"); x.fillText(title, 600, 238); x.fillStyle = acc; x.fillRect(520, 252, 160, 4); }
    else {
      const w = 640, y = 206; x.fillStyle = kind === "sdg" ? gold : base;
      x.beginPath(); x.moveTo(600 - w / 2 - 30, y); x.lineTo(600 + w / 2 + 30, y); x.lineTo(600 + w / 2 + 6, y + 26); x.lineTo(600 + w / 2 + 30, y + 52); x.lineTo(600 - w / 2 - 30, y + 52); x.lineTo(600 - w / 2 - 6, y + 26); x.closePath(); x.fill();
      x.fillStyle = [2, 7, 11].includes(n) && kind !== "sdg" ? "#1b2620" : "#fff"; fit(x, title, w - 20, 27, 16, 700, "Arial"); x.fillText(title, 600, y + 36);
    }

    x.fillStyle = "#555"; x.font = "19px Arial"; x.fillText(A.awarded, 600, 300);
    x.fillStyle = dark; fit(x, rec.name, 880, 56, 30, 700, "Georgia"); x.fillText(rec.name, 600, 362);
    x.strokeStyle = acc; x.lineWidth = 2; x.beginPath(); x.moveTo(380, 382); x.lineTo(820, 382); x.stroke();
    x.fillStyle = "#555"; x.font = "19px Arial"; x.fillText(kind === "course" ? A.pCourse : kind === "module" ? A.pModule : A.pSdg, 600, 422);
    const main = kind === "course" ? info.courseTitle : kind === "module" ? info.moduleTitle : `${A.goal} ${n} — ${info.sdgTitle}`;
    const t = K.q1 + main + K.q2;
    x.fillStyle = kind === "sdg" ? dark : mix(base, "#000000", 0.25); fit(x, t, 980, 34, 18, 700, "Arial"); x.fillText(t, 600, 468);
    const ctx = kind === "course" ? `${A.goal} ${n} — ${info.sdgTitle} · ${A.mod} ${info.m} : ${info.moduleTitle} · ${A.cours} ${info.c}`
      : kind === "module" ? `${A.goal} ${n} — ${info.sdgTitle} · ${A.mod} ${info.m}/17` : "17 × 3 = 51";
    x.fillStyle = "#444"; fit(x, ctx, 1000, 17, 11, 400, "Arial"); x.fillText(ctx, 600, 502);
    x.fillStyle = dark; x.font = "600 16px Arial"; x.fillText(`${A.score} : ${rec.score}/${rec.total}`.replace(" :", lg === "fr" ? " :" : ":"), 600, 532);
    if (kind !== "course") laurel(x, 600, 640, 98, kind === "sdg" ? gold : base);

    // Bas : date / réf, QR, cachet, signature
    const L = flip ? 760 : 110, Sx = flip ? 300 : 900;
    const date = new Date(rec.issuedAt).toLocaleDateString(K.locale, { day: "numeric", month: "long", year: "numeric" });
    x.textAlign = "left"; x.fillStyle = "#1b2620"; x.font = "17px Arial"; x.fillText(K.issued + date, L, 712);
    x.font = "15px Arial"; x.fillStyle = "#555"; x.fillText(K.ref + rec.id, L, 738);
    x.font = "12.5px Arial"; x.fillStyle = "#777"; x.fillText(K.verify + location.host + K.verifyPath, L, 760);
    const verifyUrl = location.origin + K.verifyPath + "?id=" + rec.id;
    if (window.qrcode) {
      const q = qrcode(0, "M"); q.addData(verifyUrl); q.make();
      const N = q.getModuleCount(), size = 112, cell = size / N, ox = 600 - size / 2, oy = 584;
      x.fillStyle = "#fff"; x.fillRect(ox - 7, oy - 7, size + 14, size + 14); x.fillStyle = dark;
      for (let r = 0; r < N; r++) for (let cc = 0; cc < N; cc++) if (q.isDark(r, cc)) x.fillRect(ox + cc * cell, oy + r * cell, Math.ceil(cell), Math.ceil(cell));
      x.fillStyle = "#777"; x.font = "12px Arial"; x.textAlign = "center"; x.fillText(K.scan, 600, oy + size + 22);
    }
    seal(x, flip ? 160 : 1040, 640, 70, String(new Date(rec.issuedAt).getFullYear()), K, kind === "sdg" ? "rgba(150,112,20,.9)" : mix(dark, "#1f6b40", 0.4));
    if (signature && signature.naturalWidth) { const w = 260, h = (w * signature.naturalHeight) / signature.naturalWidth; x.drawImage(signature, Sx - w / 2, 722 - h, w, h); }
    x.strokeStyle = "#1b2620"; x.lineWidth = 1; x.beginPath(); x.moveTo(Sx - 130, 728); x.lineTo(Sx + 130, 728); x.stroke();
    x.fillStyle = "#1b2620"; x.textAlign = "center"; x.font = "600 16px Arial"; x.fillText("Moussa DARI", Sx, 750);
    x.font = "13px Arial"; x.fillStyle = "#555"; x.fillText(K.signer + ", " + window.BRAND.short, Sx, 768);
  };
})();

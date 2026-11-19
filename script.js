const NAMA = "Lyla";

const PESAN = [
  "Kamu selalu berusaha untuk overcome ur feera, and thats the thing I admire most about you.",
  "Thank u for always being there dor me, walaupun aku sangat amat sibuk terkdang.",
  "Kakak, sellau suka sam semua hadiah dari kamu, si bebek dan si orang kunning itu, lucu sekali..",
  "I always  find you in evrything I see, and I always think about you when I see flowers",
  "Lyla, sayaang. Apapun yang kamu hadapi nanti, kak selalu doakann yang terbaik untuk mu dari sini.",
  "And I hope that you always know that I love you so much."
];

const SURAT = "Halo, " + NAMA + ", kaka hanya mau bilang terimakasih sudah mau menghabiskan waktu kamu bareng kaka, kak sangat amat seneng bisa ketemu kamu, dan  kaka harap kamu juga merasakna hal yang sama, I love you so much sayaang and you'r my [0] in array  fuction HEHE";

(function () {

  const TIPE = ["rose", "hydrangea", "sunflower", "clover", "iris", "lily"];
  const total = Math.min(PESAN.length, TIPE.length);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const f = (n) => n.toFixed(1);

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function petalPath(r, len, wid) {
    const j = (k) => (r() - 0.5) * len * k;
    const w1 = wid * (0.9 + r() * 0.2), w2 = wid * (0.8 + r() * 0.3);
    return "M0 0C" + f(-w1) + " " + f(-len * 0.28 + j(0.12)) + " " + f(-w2) + " " + f(-len * 0.88 + j(0.12)) + " " + f(j(0.06)) + " " + f(-len) +
      "C" + f(w2) + " " + f(-len * 0.88 + j(0.12)) + " " + f(w1) + " " + f(-len * 0.28 + j(0.12)) + " 0 0Z";
  }

  function petal(r, len, wid, cls, angle, ol) {
    const d = petalPath(r, len, wid);
    return '<path class="pf ' + cls + '" d="' + d + '" transform="translate(2.5 2) rotate(' + f(angle) + ')"/>' +
           '<path class="' + (ol || "po") + '" d="' + d + '" transform="rotate(' + f(angle) + ')"/>';
  }

  function petalRing(r, n, len, wid, cls, start, ol) {
    let s = "";
    for (let i = 0; i < n; i++) s += petal(r, len * (0.92 + r() * 0.16), wid, cls, start + (360 / n) * i + (r() - 0.5) * 8, ol);
    return s;
  }

  function disc(rad, cls) {
    return '<circle class="pf ' + cls + '" cx="2" cy="1.5" r="' + rad + '"/><circle class="po" r="' + rad + '"/>';
  }

  function dots(r) {
    let s = "";
    for (let i = 0; i < 9; i++) {
      const a = r() * 6.283, d = r() * 9;
      s += '<circle class="dot" cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d) + '" r="1.2"/>';
    }
    return s;
  }

  function cloverLeaf(r, angle, cls) {
    const j = () => (r() - 0.5) * 2.4;
    const d = "M0 0C" + f(-14 + j()) + " -6 " + f(-19 + j()) + " -22 " + f(-10 + j()) + " -28C-5 -32 -1 -28 0 -24C1 -28 5 -32 " +
      f(10 + j()) + " -28C" + f(19 + j()) + " -22 " + f(14 + j()) + " -6 0 0Z";
    return '<path class="pf ' + cls + '" d="' + d + '" transform="translate(2.5 2) rotate(' + f(angle) + ')"/>' +
           '<path class="po" d="' + d + '" transform="rotate(' + f(angle) + ')"/>' +
           '<path class="vein" d="M0 -3L0 -21" transform="rotate(' + f(angle) + ')"/>';
  }

  const HEADS = {
    rose: (r) =>
      petalRing(r, 5, 31, 19, "c-rose", 0) +
      petalRing(r, 5, 23, 14, "c-rose2", 36) +
      petalRing(r, 4, 15, 10, "c-rose", 10) +
      '<path class="po" d="M0 0C3 -1 4 2 1 3C-3 4 -5 -1 -2 -4C2 -7 8 -4 7 1C6 7 -1 9 -6 6"/>',

    hydrangea: (r) => {
      const cols = ["c-hyd1", "c-hyd2", "c-hyd3"], fl = [];
      for (let i = 0; i < 36; i++) {
        const a = r() * 6.283, d = Math.sqrt(r()) * 26;
        fl.push({ x: Math.cos(a) * d, y: Math.sin(a) * d * 0.9, c: cols[Math.floor(r() * 3)], t: r() * 90 });
      }
      fl.sort((a, b) => a.y - b.y);
      let s = "";
      fl.forEach((p) => {
        s += '<g transform="translate(' + f(p.x) + " " + f(p.y) + ')">' + petalRing(r, 4, 9.5, 5.6, p.c, p.t, "po fine") +
             '<circle class="pf c-yellow" r="1.3"/></g>';
      });
      return s;
    },

    sunflower: (r) => petalRing(r, 18, 32, 7.5, "c-yellow", 0) + disc(13, "c-brown") + dots(r),

    clover: (r) => {
      const rot = (r() - 0.5) * 24;
      let s = "";
      for (let k = 0; k < 4; k++) s += cloverLeaf(r, rot + 45 + 90 * k, k % 2 ? "c-clover2" : "c-clover");
      return s;
    },

    iris: (r) =>
      petal(r, 38, 11, "c-iris", -20) + petal(r, 38, 11, "c-iris", 20) + petal(r, 42, 12, "c-iris2", 0) +
      petal(r, 32, 15, "c-iris", 128) + petal(r, 32, 15, "c-iris", 232) + petal(r, 26, 13, "c-iris2", 180) +
      petal(r, 14, 2.6, "c-yellow", 128, "po fine") + petal(r, 14, 2.6, "c-yellow", 232, "po fine") + petal(r, 12, 2.6, "c-yellow", 180, "po fine"),

    lily: (r) => {
      let s = "";
      [60, 180, 300].forEach((a) => { s += petal(r, 36, 11, "c-lily", a + (r() - 0.5) * 6); });
      [0, 120, 240].forEach((a) => { s += petal(r, 38, 12, "c-lily", a + (r() - 0.5) * 6) + petal(r, 28, 3.2, "c-lily2", a, "po fine"); });
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * 6.283 + r() * 0.5, l = 11 + r() * 5;
        const x = Math.sin(a) * l, y = -Math.cos(a) * l;
        s += '<path class="stamen" d="M0 0L' + f(x) + " " + f(y) + '"/><circle class="pf c-brown" cx="' + f(x) + '" cy="' + f(y) + '" r="2.2"/>';
      }
      return s;
    }
  };

  const HEAD_Y = { rose: 58, hydrangea: 56, sunflower: 55, clover: 62, iris: 66, lily: 58 };
  const NO_LEAVES = { clover: true };

  function flowerSVG(type, seed) {
    const r = rng(seed), hy = HEAD_Y[type], h = 170 - hy, bend = (r() - 0.5) * 14;
    let s = '<svg viewBox="0 0 100 170" aria-hidden="true" focusable="false">';
    s += '<path class="stem" d="M50 170C' + f(50 + bend) + " " + f(170 - h * 0.4) + " " + f(50 - bend) + " " + f(hy + h * 0.4) + " 50 " + hy + '"/>';
    if (!NO_LEAVES[type]) {
      s += '<g transform="translate(50 135)">' + petal(r, 24, 8, "c-leaf", -(50 + r() * 15)) + "</g>";
      s += '<g transform="translate(50 112)">' + petal(r, 24, 8, "c-leaf", 50 + r() * 15) + "</g>";
    }
    s += '<g transform="translate(50 ' + hy + ')">' + HEADS[type](r) + "</g></svg>";
    return s;
  }

  const seedOf = (i) => 40 + i * 13;

  function shape(d, cls) {
    return '<path class="pf ' + cls + '" d="' + d + '" transform="translate(2 1.5)"/><path class="po" d="' + d + '"/>';
  }

  function duckSVG() {
    return '<svg viewBox="0 0 92 84" aria-hidden="true" focusable="false">' +
      shape("M14 48C10 44 6 40 4 32C12 33 19 38 24 43Z", "c-duck") +
      shape("M10 58C10 44 24 38 42 38C60 38 76 46 76 60C76 72 60 80 42 80C24 80 10 72 10 58Z", "c-duck") +
      shape("M28 60C32 50 46 50 54 58C48 68 34 69 28 60Z", "c-duck2") +
      shape("M39 28a19 19 0 1 0 38 0a19 19 0 1 0 -38 0Z", "c-duck") +
      shape("M74 24C84 22 92 26 90 31C88 36 80 37 74 35Z", "c-beak") +
      '<path class="po fine" d="M76 30.5C80 31.5 85 31.5 89 30.5"/>' +
      '<circle class="blush" cx="69" cy="32" r="3.4"/><circle class="eye" cx="64" cy="22" r="2.6"/></svg>';
  }

  const duck = $("duck");
  duck.insertAdjacentHTML("afterbegin", duckSVG());
  let sayTimer;
  
  const audioKwek = new Audio('kwek.mp3'); 

  function squeak() {
    audioKwek.currentTime = 0;
    audioKwek.play().catch(function(e) {
        console.log("Suara gagal dimuat atau diblokir browser.");
    });
  }

  function quack() {
    duck.classList.add("say");
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () { duck.classList.remove("say"); }, 900);
    squeak();
  }

  function hop() {
    duck.classList.remove("hop");
    void duck.offsetWidth;
    duck.classList.add("hop");
    setTimeout(function () { duck.classList.remove("hop"); }, 700);
  }
  
  duck.addEventListener("click", function () { hop(); quack(); });

  const garden = $("garden"), bouquet = $("bouquet"), countEl = $("count");
  $("nama").textContent = NAMA;
  document.title = "Buket untuk " + NAMA;

  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerHTML = '<button class="plant" type="button" data-i="' + i + '" aria-label="Petik bunga ke-' + (i + 1) + '" style="--d:-' + (i * 0.9) + 's">' +
      flowerSVG(TIPE[i], seedOf(i)) + "</button>";
    garden.appendChild(cell);
  }

  const dlg = $("dlg");
  
  function show(label, text, art, done) {
    $("dlgLabel").textContent = label;
    $("dlgText").textContent = text;
    $("dlgArt").innerHTML = art;
    if (done) dlg.addEventListener("close", done, { once: true });
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }

  let plucked = 0, placed = 0;
  const ORDER = [2, 3, 1, 4, 0, 5];
  const ANGLES = [-40, -24, -8, 8, 24, 40];
  const SCALES = [0.95, 1.12, 1.25, 1.25, 1.12, 0.95];

  function addToBouquet(i) {
    const slot = ORDER[placed];
    const d = document.createElement("div");
    d.className = "bq-flower";
    d.style.cssText = "--a:" + ANGLES[slot] + "deg;--s:" + SCALES[slot] + ";z-index:" + (placed + 1);
    d.innerHTML = flowerSVG(TIPE[i], seedOf(i));
    bouquet.insertBefore(d, bouquet.querySelector(".cone"));
    placed++;
    countEl.textContent = placed === total ? "Everythig alr filled" : placed + " from " + total + " flowers are in the bucket now, cantikku";
    hop();
    if (placed === total) setTimeout(quack, 500);
  }

  garden.addEventListener("click", function (e) {
    const btn = e.target.closest(".plant");
    if (!btn || btn.disabled) return;
    const i = Number(btn.dataset.i);
    btn.disabled = true;
    btn.classList.add("gone");
    plucked++;
    show("Whoops u picked " + plucked, PESAN[i], flowerSVG(TIPE[i], seedOf(i)), function () {
      addToBouquet(i);
      if (placed === total) revealEnvelope();
    });
  });

  const envBox = $("envBox"), envelope = $("envelope"), again = $("again");

  function revealEnvelope() {
    envBox.hidden = false;
    setTimeout(function () {
      envBox.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }, 150);
  }
  
  envelope.addEventListener("click", function () {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    envelope.setAttribute("aria-label", "Amplop sudah dibuka");
    setTimeout(function () {
      show("Some words for u", SURAT, duckSVG(), function () { again.hidden = false; });
    }, reduce ? 100 : 1300);
  });
  
  again.addEventListener("click", function () { location.reload(); });
})();
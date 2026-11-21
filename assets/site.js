/* adamnormand.com — slideshow, captions and controls (no dependencies) */
(function () {
  // Order, titles, places and dates as published on the WordPress site (2026-11).
  var SLIDES = [
    ['firstdive2.jpeg', 'Première plongée, Niveau 1', 'Gaspé, Québec', '2026-09-23'],
    ['208701_10200441889683543_1792478733_n1.jpg', 'Sprott Roundtable 2013 Gala', 'Ottawa, Ontario', 'January 2013',
      'Stage time with Aneesh Lal, my presidential predecessor at CABS during the closing ceremonies and gala for Sprott Roundtable 2013 in Ottawa. Aneesh had been presented with a Lifetime Achievement Award for his outstanding contribution to the undergraduate business education and student leadership networks.'],
    ['bluejayscabs.jpg', 'CABS Executive Reunion', 'Toronto, Ontario', '2024-07-04'],
    ['bighill.jpeg', 'Au sommet de Big Hill', 'Les Îles de la Madeleine, Québec', '2022-07-02'],
    ['iles2.jpg', 'On n’a pas l’heure, on a le temps !', 'Les Îles de la Madeleine, Québec', '2023-02-01'],
    ['gcacq.jpg', 'Protection de la Baie-de-Gaspé', 'Gaspé, Québec', '2026-09-23'],
    ['windsorcastle.jpg', 'Windsor Castle', 'Windsor, England', '2023-06-17'],
    ['rcmsar.jpg', 'Visit to RCM-SAR Vancouver', 'Vancouver, British Columbia', '2026-09-23'],
    ['hovercraft.jpg', 'Pratique d’aéroglisseur avec SSI Gaspé', 'Gaspé, Québec', '2008-04-19'],
    ['crf.jpg', 'Connection avec la Croix-Rouge française', 'Strasbourg, France', '2023-06-24'],
    ['annamaria.jpg', 'Bidding Farewell to a Legend', 'Toronto, Ontario', '2019-06-20'],
    ['ssignautique.jpg', 'Formation nautique du SSI Gaspé', 'Gaspé, Québec', '2026-09-23'],
    ['IQ.jpg', 'Réception de la PDG Investissement Québec', 'Gaspé, Québec', '2026-09-23'],
    ['sarex2026.jpg', 'SAREX 2026', 'Rimouski, Québec', '2026-09-19'],
    ['clq1.jpg', 'Show festif au CLQ de l’ACÉE', 'Drummondville, Québec', '2024-11-02'],
    ['sue.jpg', 'uWindsor MBA Grad with Ivona and Sue', 'Windsor, Ontario', '2018-05-30'],
    ['golf.jpg', 'First Golf Tournament – First Place !', 'Etobicoke, Ontario', '2026-07-09'],
    ['pinrouge.jpg', 'Reconnaissance du leadership jeunesse par CJE', 'Pin Rouge, Québec', '2024-05-11'],
    ['mba1.jpeg', 'Small MBA 2018 Reunion', 'Windsor, Ontario', '2024-07-11'],
    ['moncton.jpg', 'YQM avec la famille', 'Moncton, New Brunswick', '2024-08-22'],
    ['cegep1.jpg', 'Graduation au Cégep 2025', 'Gaspé, Québec', '2025-05-03'],
    ['djcegep.jpg', 'DJ Nitro à l’entrée du Cégep', 'Gaspé, Québec', '2024-08-26'],
    ['viarail.jpg', 'Table de concertation du Rail avec l’Exécutif de VIA Rail', 'Gaspé, Québec', '2026-09-23'],
    ['odwyer.jpg', 'Journée de la Gaspésie avec O’Dwyer', 'Gaspé, Québec', '2025-06-05'],
    ['sumi.jpg', 'Pratique SUMI avec SSI Gaspé', 'Gaspé, Québec', '2026-02-21'],
    ['bishops170728b.jpg', 'Delivering workshops for CABS at Bishop’s', 'Sherbrooke, Québec', '2017-07-28']
  ];
  var INTERVAL = 6000;
  var root = document.documentElement.getAttribute('data-root') || '';
  var imgPath = root + 'assets/img/';

  var stage = document.querySelector('.slides');
  var cap = document.querySelector('.caption');
  var bar = document.querySelector('.progress i');
  if (!stage) return;

  // Inner pages start on a random slide so the background varies, like the original.
  var start = cap ? 0 : Math.floor(Math.random() * SLIDES.length);
  var els = SLIDES.map(function () {
    var d = document.createElement('div');
    d.className = 'slide';
    stage.appendChild(d);
    return d;
  });
  function load(i) {
    if (!els[i].style.backgroundImage) els[i].style.backgroundImage = "url('" + imgPath + SLIDES[i][0] + "')";
  }

  var cur = -1, timer = null, playing = true, t0 = 0, raf = null;

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function show(i) {
    i = (i + SLIDES.length) % SLIDES.length;
    load(i); load((i + 1) % SLIDES.length);
    if (cur >= 0) els[cur].classList.remove('on');
    els[i].classList.add('on');
    cur = i;
    if (cap) {
      var s = SLIDES[i];
      cap.classList.add('fade');
      setTimeout(function () {
        cap.innerHTML = '<h2>' + esc(s[1]) + '</h2><div class="meta">' + esc(s[2]) + '<br>' + esc(s[3]) + '</div>' +
          (s[4] ? '<p>' + esc(s[4]) + '</p>' : '');
        cap.classList.remove('fade');
      }, cur === start && !timer ? 0 : 350);
    }
    restart();
  }

  function tick() {
    if (!bar) return;
    var p = Math.min(1, (Date.now() - t0) / INTERVAL);
    bar.style.width = (playing ? p * 100 : 0) + '%';
    raf = requestAnimationFrame(tick);
  }
  function restart() {
    clearTimeout(timer);
    t0 = Date.now();
    if (playing) timer = setTimeout(function () { show(cur + 1); }, INTERVAL);
    else timer = 0;
  }

  function on(sel, fn) { var e = document.querySelector(sel); if (e) e.addEventListener('click', fn); }
  on('[data-act=prev]', function () { show(cur - 1); });
  on('[data-act=next]', function () { show(cur + 1); });
  on('[data-act=pause]', function (e) {
    playing = !playing;
    var icon = e.currentTarget.querySelector('i');
    icon.className = playing ? 'fa fa-pause' : 'fa fa-play';
    e.currentTarget.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    restart();
  });
  on('[data-act=eye]', function () { document.body.classList.toggle('ui-hidden'); });
  on('.menu-toggle', function () { document.querySelector('.menu-wrap').classList.toggle('closed'); });
  document.addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
  });

  show(start);
  tick();
})();

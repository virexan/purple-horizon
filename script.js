/* ── STARFIELD ──────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  const N = 200;
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < N; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.008,
      color: Math.random() > 0.7 ? '#C084FC' : Math.random() > 0.5 ? '#FCD34D' : '#ffffff',
      speed: Math.random() * 0.15 + 0.03
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      s.y -= s.speed;
      if (s.y < 0) {
        s.y = canvas.height;
        s.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.a;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ── SPARKLE ON CLICK ───────────────────────────────────── */
document.addEventListener('click', function (e) {
  const colors = ['#9333EA', '#EC4899', '#F59E0B', '#C084FC', '#FCD34D', '#ffffff'];
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const angle = (Math.PI * 2 * i) / 8;
    const dist = 30 + Math.random() * 30;
    s.style.cssText = `
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      transform: translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px);
      box-shadow: 0 0 6px #9333EA;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }
});


/* ── REMOVE INTRO AFTER ANIMATION ──────────────────────── */
document.getElementById('intro').addEventListener('animationend', function () {
  this.style.display = 'none';
});
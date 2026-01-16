const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* BUTTONS */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {
  noScale -= 0.12;
  yesScale += 0.12;

  noBtn.style.transform = `scale(${Math.max(noScale, 0.25)})`;
  yesBtn.style.transform = `scale(${yesScale})`;
});

/* FULLSCREEN LOVE EXPLOSION */
yesBtn.addEventListener("click", () => {
  explode(true);
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 1300);
});

/* PARTICLES */
let particles = [];

function explode(full = false) {
  const count = full ? 600 : 150;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * (full ? 20 : 8),
      vy: (Math.random() - 0.5) * (full ? 20 : 8),
      size: Math.random() * 3 + 1,
      life: 1
    });
  }
}

/* HEART BEAT */
let time = 0;

function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  time += 0.08;

  /* DOUBLE BEAT */
  const beat =
    Math.sin(time) * 0.04 +
    Math.sin(time * 0.5) * 0.02;

  const scale = 1 + beat;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, scale);

  ctx.beginPath();
  for (let a = 0; a < Math.PI * 2; a += 0.02) {
    const x = 16 * Math.pow(Math.sin(a), 3);
    const y =
      13 * Math.cos(a) -
      5 * Math.cos(2 * a) -
      2 * Math.cos(3 * a) -
      Math.cos(4 * a);

    ctx.lineTo(x * 18, -y * 18);
  }

  /* INSANE GLOW */
  ctx.shadowBlur = 50;
  ctx.shadowColor = "#ff4d6d";

  ctx.fillStyle = "rgba(255, 80, 120, 0.2)";
  ctx.fill();

  ctx.strokeStyle = "#ff8fa3";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();

  /* PARTICLES */
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.015;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,120,160,${p.life})`;
    ctx.fill();
  });
}

function animate() {
  drawHeart();
  requestAnimationFrame(animate);
}

animate();

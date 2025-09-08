function updateCountdown() {
  const now = new Date();
  const thisYear = now.getFullYear();
  let birthday = new Date(`July 24, ${thisYear} 00:00:00`);

  if (now > birthday) {
    birthday = new Date(`July 24, ${thisYear + 1} 00:00:00`);
  }

  const diff = birthday - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
setInterval(updateCountdown, 1000);

// Confetti
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 2,
  d: Math.random() * 100,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  tilt: Math.random() * 10 - 5,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.y += Math.cos(p.d) + 1;
    p.x += Math.sin(p.d);

    if (p.y > canvas.height) {
      pieces[i] = {
        x: Math.random() * canvas.width,
        y: -10,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: p.tilt,
      };
    }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

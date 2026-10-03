/* ===== CẤU HÌNH - THAY TÊN NGƯỜI NHẬN Ở ĐÂY ===== */
const NAME = "Bạn";            // THAY TÊN Ở ĐÂY
const MUSIC_URL = "";          // THAY LINK NHẠC (file .mp3). Để trống = dùng giai điệu Happy Birthday tự tạo sẵn

const $ = (s) => document.querySelector(s);
document.querySelectorAll(".name").forEach((el) => (el.textContent = NAME));

/* ===== NỀN SAO LẤP LÁNH ===== */
const cv = $("#stars"), ctx = cv.getContext("2d");
let stars = [];
function resize() {
  cv.width = innerWidth; cv.height = innerHeight;
  stars = Array.from({ length: Math.min(160, innerWidth / 5) }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.6 + .3, p: Math.random() * 6.28, c: ["#fff", "#ffd86b", "#ffb3d9", "#d4b8ff"][(Math.random() * 4) | 0],
  }));
}
addEventListener("resize", resize); resize();
(function draw(t = 0) {
  ctx.clearRect(0, 0, cv.width, cv.height);
  stars.forEach((s) => {
    ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t / 900 + s.p));
    ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
  });
  requestAnimationFrame(draw);
})();

/* ===== BONG BÓNG / TRÁI TIM TRÔI LÊN ===== */
const EMO = ["💖", "🎈", "✨", "💜", "🫧", "⭐"]; // THAY BIỂU TƯỢNG TRÔI NỔI
setInterval(() => {
  const e = document.createElement("span");
  e.className = "fl"; e.textContent = EMO[(Math.random() * EMO.length) | 0];
  e.style.cssText = `left:${Math.random() * 100}%;font-size:${14 + Math.random() * 22}px;animation-duration:${8 + Math.random() * 7}s`;
  $("#floaters").appendChild(e); setTimeout(() => e.remove(), 16000);
}, 900);

/* ===== PHÁO HOA ===== */
function fireworks(n = 6) {
  const colors = ["#ff9ecb", "#c8a6ff", "#ffd86b", "#ffffff"];
  for (let i = 0; i < n; i++)
    setTimeout(() => confetti({ particleCount: 70, spread: 80, startVelocity: 38, colors,
      origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4 + 0.1 } }), i * 260);
}

/* ===== CHUYỂN TRANG ===== */
function go(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  $(id).classList.add("active");
  if (id === "#p2") typeTitle();
  if (id === "#p4") setTimeout(() => $("#envelope").classList.add("open"), 500);
  if (id === "#p5") { startRain(); fireworks(5); }
}

/* ===== TRANG 1: MỞ HỘP QUÀ ===== */
function openGift() {
  const g = $("#gift"); if (g.classList.contains("open")) return;
  g.classList.add("open"); startMusic(); fireworks(8);
  setTimeout(() => go("#p2"), 1700);
}
$("#gift").addEventListener("click", openGift);
$("#gift").addEventListener("keydown", (e) => e.key === "Enter" && openGift());

/* ===== TRANG 2: GÕ CHỮ + THỔI NẾN ===== */
function typeTitle() {
  const text = `HAPPY BIRTHDAY, ${NAME.toUpperCase()}! 🎉`, el = $("#typing"); let i = 0; el.textContent = "";
  const t = setInterval(() => { el.textContent += [...text][i++] ?? ""; if (i > [...text].length) clearInterval(t); }, 90);
}
function blow() {
  const c = $("#candle"); if (c.classList.contains("out")) return;
  c.classList.add("out"); fireworks(7);
  $("#cakeHint").textContent = "Điều ước của bạn sẽ thành hiện thực! 🌠";
  $("#to3").classList.remove("hidden");
}
$("#candle").addEventListener("click", blow);
$("#candle").addEventListener("keydown", (e) => e.key === "Enter" && blow());
$("#to3").onclick = () => go("#p3");

/* ===== TRANG 3: POLAROID TILT + TRÁI TIM TỎA RA ===== */
document.querySelectorAll(".polaroid").forEach((p) => {
  p.addEventListener("mousemove", (e) => {
    const b = p.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    p.style.transform = `rotate(0deg) scale(1.18) rotateY(${x * 24}deg) rotateX(${-y * 24}deg)`;
  });
  p.addEventListener("mouseleave", () => (p.style.transform = ""));
  const burst = (e) => {
    const t = e.touches ? e.touches[0] : e;
    confetti({ particleCount: 14, spread: 70, scalar: 1.4,
      shapes: confetti.shapeFromText ? [confetti.shapeFromText({ text: "💖" }), confetti.shapeFromText({ text: "⭐" })] : ["circle"],
      origin: { x: t.clientX / innerWidth, y: t.clientY / innerHeight } });
  };
  p.addEventListener("mouseenter", burst);
  p.addEventListener("touchstart", (e) => { p.style.transform = "scale(1.12) rotate(0deg)"; burst(e); }, { passive: true });
  p.addEventListener("touchend", () => setTimeout(() => (p.style.transform = ""), 600));
});
$("#to4").onclick = () => go("#p4");
$("#to5").onclick = () => go("#p5");

/* ===== TRANG 5: MƯA LỜI CHÚC ===== */
let rainT;
function startRain() {
  clearInterval(rainT);
  const items = ["🫧", "💖", "☄️", "⭐", "💜", "🎈"]; // THAY BIỂU TƯỢNG MƯA
  rainT = setInterval(() => {
    const d = document.createElement("span"); d.className = "drop"; d.textContent = items[(Math.random() * items.length) | 0];
    d.style.cssText = `left:${Math.random() * 100}%;font-size:${16 + Math.random() * 26}px;animation-duration:${3 + Math.random() * 4}s`;
    $("#rain").appendChild(d); setTimeout(() => d.remove(), 7500);
  }, 120);
}
$("#restart").onclick = () => {
  clearInterval(rainT); $("#rain").innerHTML = "";
  $("#gift").classList.remove("open"); $("#candle").classList.remove("out");
  $("#to3").classList.add("hidden"); $("#cakeHint").textContent = "Chạm vào ngọn nến để thổi nến 🕯️";
  $("#envelope").classList.remove("open"); go("#p1");
};

/* ===== NHẠC NỀN ===== */
let playing = false, audio = null, actx = null, loop = null;
// Giai điệu Happy Birthday không lời (tần số Hz, độ dài phách)
const MELODY = [[262,.75],[262,.25],[294,1],[262,1],[349,1],[330,2],[262,.75],[262,.25],[294,1],[262,1],[392,1],[349,2],
  [262,.75],[262,.25],[523,1],[440,1],[349,1],[330,1],[294,2],[466,.75],[466,.25],[440,1],[349,1],[392,1],[349,2]];
function playSynth() {
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  let t = actx.currentTime + 0.1; const beat = 0.5;
  MELODY.forEach(([f, d]) => {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = "sine"; o.frequency.value = f; o.connect(g); g.connect(actx.destination);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.13, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + d * beat);
    o.start(t); o.stop(t + d * beat); t += d * beat;
  });
  return (t - actx.currentTime + 1.2) * 1000;
}
function startMusic() {
  if (playing) return; playing = true; $("#musicBtn").textContent = "🔊";
  if (MUSIC_URL) { audio = audio || Object.assign(new Audio(MUSIC_URL), { loop: true }); audio.play().catch(() => {}); return; }
  const again = () => { if (playing) loop = setTimeout(again, playSynth()); }; again();
}
function stopMusic() {
  playing = false; $("#musicBtn").textContent = "🔇";
  if (audio) audio.pause(); clearTimeout(loop); if (actx) actx.close().then(() => (actx = null));
}
$("#musicBtn").onclick = () => (playing ? stopMusic() : startMusic());
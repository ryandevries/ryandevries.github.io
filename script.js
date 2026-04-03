// ── Theme toggle ──────────────────────────────────────────────────
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply saved preference, or fall back to system
if (stored) {
  root.setAttribute('data-theme', stored);
} else if (prefersDark) {
  root.setAttribute('data-theme', 'dark');
} else {
  root.setAttribute('data-theme', 'light');
}

toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Active nav link on scroll ─────────────────────────────────────
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 80;
  let current = '';
  sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ============================================================
   BINSO DIGITAL MARKETING — main.js
   Full interactivity: nav, accordion, counters, form,
   lightbox, scroll reveal, parallax, toast
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollBar();
  initBackToTop();
  initScrollReveal();
  initActiveNav();
  initAccordion();
  initCounters();
  initContactForm();
  initSmoothScroll();
  initParallax();
  initTypingEffect();
});

/* ── PRELOADER ── */
function initPreloader() {
  const pl = document.getElementById('preloader');
  if (!pl) return;
  window.addEventListener('load', () => {
    setTimeout(() => pl.classList.add('hide'), 700);
    setTimeout(() => { if (pl.parentNode) pl.remove(); }, 1400);
  });
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const ham     = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mob-nav');
  const close   = document.querySelector('.mob-nav-close');
  if (!ham || !overlay) return;

  const open  = () => { ham.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const shut  = () => { ham.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

  ham.addEventListener('click', () => overlay.classList.contains('open') ? shut() : open());
  if (close) close.addEventListener('click', shut);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

/* ── SCROLL PROGRESS ── */
function initScrollBar() {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((window.scrollY / total) * 100) + '%';
  }, { passive: true });
}

/* ── BACK TO TOP ── */
function initBackToTop() {
  const btn = document.getElementById('btt');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── ACTIVE NAV LINKS ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nb-menu a[href^="#"]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => io.observe(s));
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ── ACCORDION ── */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item    = header.closest('.accordion-item');
      const body    = item.querySelector('.accordion-body');
      const isOpen  = header.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-header.open').forEach(h => {
        h.classList.remove('open');
        h.querySelector('.acc-icon')?.classList.remove('fa-chevron-up');
        h.querySelector('.acc-icon')?.classList.add('fa-chevron-down');
        const b = h.closest('.accordion-item').querySelector('.accordion-body');
        if (b) b.classList.remove('open');
      });

      if (!isOpen) {
        header.classList.add('open');
        body?.classList.add('open');
        const icon = header.querySelector('.acc-icon');
        if (icon) { icon.classList.remove('fa-chevron-down'); icon.classList.add('fa-chevron-up'); }
      }
    });
  });

  // Open first by default
  const first = document.querySelector('.accordion-header');
  if (first) first.click();
}

/* ── ANIMATED COUNTERS ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const run = el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur    = 1800;
    const step   = 16;
    const inc    = target / (dur / step);
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { clearInterval(t); el.textContent = target.toLocaleString() + suffix; }
      else el.textContent = Math.floor(cur).toLocaleString() + suffix;
    }, step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn  = form.querySelector('.btn-send');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';
    btn.disabled  = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#27ae60';
      showToast('✅ Your message has been sent! We\'ll get back to you soon.');
      form.reset();
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 4000);
    }, 2000);
  });

  // Live validation
  form.querySelectorAll('input, textarea').forEach(f => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => {
      f.style.borderColor = f.value.trim() ? 'rgba(255,255,255,.9)' : '';
    });
  });
}

function validateForm(form) {
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    if (!validateField(f)) ok = false;
  });
  return ok;
}

function validateField(f) {
  const val = f.value.trim();
  if (f.required && !val) {
    f.style.borderColor = '#ff6b6b';
    f.style.background  = 'rgba(255,107,107,.1)';
    return false;
  }
  if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    f.style.borderColor = '#ff6b6b';
    return false;
  }
  f.style.borderColor = 'rgba(255,255,255,.9)';
  f.style.background  = '';
  return true;
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
      }
    });
  });
}

/* ── PARALLAX (hero only) ── */
function initParallax() {
  const hero = document.querySelector('.hero-bg');
  if (!hero || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  window.addEventListener('scroll', () => {
    hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

/* ── TYPING EFFECT (hero subtitle) ── */
function initTypingEffect() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const texts = ['Digital Marketing', 'Brand Strategy', 'SEO & Growth', 'Social Media', 'Content Creation'];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 1600); return; }
    } else {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 65 : 110);
  }
  setTimeout(type, 1200);
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  const icon = type === 'error' ? 'fa-times-circle' : 'fa-check-circle';
  t.className = type === 'error' ? 'error' : '';
  t.innerHTML = `<i class="fas ${icon} toast-icon"></i> ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}

/* ── FEATURE CARD HOVER TILT ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feat-card, .news-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * -8;
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
});

/* ── READ MORE BUTTON ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showToast('📄 Full article coming soon!');
    });
  });
});

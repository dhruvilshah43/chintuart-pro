/**
 * Chintuart — Static Site JavaScript
 * All interactive functionality
 */

/* ─── Config ─────────────────────────────────────────────────────────────── */
const CONFIG = {
  whatsapp: '919924823684',
  siteName: 'Chintuart',
};

/* ─── Navigation Data ────────────────────────────────────────────────────── */
const SERVICE_LINKS = [
  { label: 'ACP Elevation',                      href: '{root}services/acp-elevation.html' },
  { label: 'Flex Backlite Signages',              href: '{root}services/flex-backlite.html' },
  { label: 'Aluminum Channel Bending Letters',    href: '{root}services/aluminum-channel.html' },
  { label: 'Acrylic Letters',                     href: '{root}services/acrylic-letters.html' },
  { label: 'SS / Rose Gold / Golden Letters',     href: '{root}services/ss-letters.html' },
  { label: 'Pylon Signages',                      href: '{root}services/pylon.html' },
  { label: 'Hoardings',                           href: '{root}services/hoardings.html' },
  { label: 'Flex Banner / Fabrication',           href: '{root}services/flex-banner.html' },
  { label: 'Neon Signages',                       href: '{root}services/neon-signages.html' },
  { label: 'Name Plates',                         href: '{root}services/name-plates.html' },
  { label: 'CNC / Laser Cutting',                 href: '{root}services/cnc-cutting.html' },
  { label: 'Branding & Outlet Branding',          href: '{root}services/branding.html' },
  { label: 'LED Sign Boards',                     href: '{root}services/led-sign.html' },
  { label: 'Terrace Signages',                    href: '{root}services/terrace-signages.html' },
  { label: 'Lollipop Signage',                    href: '{root}services/lollipop-signage.html' },
];

const NAV = [
  { label: 'Home',        href: '{root}index.html' },
  { label: 'About Us',    href: '{root}about-us.html' },
  { label: 'Our Services',href: '{root}services/index.html' },
  { label: 'Our Gallery', href: '{root}whats-new.html' },
  { label: 'Contact Us',  href: '{root}contact-us.html', cta: true },
];

/* ─── Component Builder ──────────────────────────────────────────────────── */
function getRoot() {
  const path = window.location.pathname;
  const inServices = path.includes('/services/');
  return inServices ? '../' : './';
}

function getLogo() {
  const root = getRoot();
  return root + 'assets/images/Chintu-Art_PDF_New-Logo-1-removebg-preview.png';
}

function resolveHref(href) {
  return href.replace('{root}', getRoot());
}

function buildHeader() {
  const root = getRoot();
  const current = window.location.pathname;

  const navHTML = NAV.map(item => {
    const href = resolveHref(item.href);
    const isActive = current.includes(item.href.replace('{root}','').replace('index.html',''));

    if (item.children) {
      const dropHTML = item.children.map(c =>
        `<a class="nav-dropdown-item" href="${resolveHref(c.href)}">${c.label}</a>`
      ).join('');
      return `
        <li class="nav-item">
          <a href="${href}" class="nav-link${isActive?' active':''}">
            ${item.label} <span class="dropdown-chevron">▾</span>
          </a>
          <div class="nav-dropdown">${dropHTML}</div>
        </li>`;
    }
    return `<li class="nav-item">
      <a href="${href}" class="nav-link${item.cta?' btn btn-primary btn-sm nav-cta':''}${isActive?' active':''}">
        ${item.label}
      </a>
    </li>`;
  }).join('');

  const mobileNavHTML = NAV.map(item => {
    if (item.children) {
      const sub = item.children.map(c =>
        `<a class="mobile-nav-link" href="${resolveHref(c.href)}">${c.label}</a>`
      ).join('');
      return `
        <a class="mobile-nav-link mobile-nav-parent" href="${resolveHref(item.href)}">${item.label}</a>
        <div class="mobile-nav-sub">${sub}</div>`;
    }
    return `<a class="mobile-nav-link" href="${resolveHref(item.href)}">${item.label}</a>`;
  }).join('');

  return `
    <div class="page-loader" id="pageLoader">
      <div class="loader-topbar"><div class="loader-topbar-fill"></div></div>
      <div class="loader-ring-wrap">
        <svg class="loader-ring-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e63829" stop-opacity="0"/>
              <stop offset="60%" stop-color="#e63829"/>
              <stop offset="100%" stop-color="#f5b301"/>
            </linearGradient>
          </defs>
          <circle class="loader-ring-track" cx="50" cy="50" r="42"/>
          <circle class="loader-ring-arc" cx="50" cy="50" r="42"/>
        </svg>
        <div class="loader-logo-center">
          <img src="${getLogo()}" alt="${CONFIG.siteName}">
        </div>
      </div>
      <div class="loader-text-wrap">
        <span class="loader-brand-name">CHINTUART</span>
        <span class="loader-brand-tagline">Signage World &middot; Ahmedabad</span>
      </div>
    </div>

    <header id="site-header" class="transparent">
      <div class="container">
        <div class="header-inner">
          <a href="${root}index.html" class="site-logo">
            <img src="${getLogo()}" alt="${CONFIG.siteName}">
          </a>
          <nav class="main-nav" aria-label="Main Navigation">
            <ul class="flex gap-1">${navHTML}</ul>
          </nav>
          <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav">${mobileNavHTML}</nav>
  `;
}

function buildFooter() {
  const root = getRoot();
  const services = SERVICE_LINKS;
  const col1 = services.slice(0, 8);
  const col2 = services.slice(8);

  return `
    <footer id="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="${root}index.html" class="footer-logo-link"><img src="${getLogo()}" alt="${CONFIG.siteName}"></a>
            <p class="footer-desc">Chintuart — Ahmedabad's premier signage and outdoor advertising specialists. We bring your brand to life with high-quality, durable signages for every need.</p>
            <div class="footer-socials">
              <a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" class="footer-social" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="tel:+919924823684" class="footer-social" aria-label="Call us">📞</a>
              <a href="mailto:chintuart@gmail.com" class="footer-social" aria-label="Email">✉️</a>
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Services</h4>
            <div class="footer-links">
              ${col1.map(s => `<a href="${resolveHref(s.href)}" class="footer-link">${s.label}</a>`).join('')}
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">More Services</h4>
            <div class="footer-links">
              ${col2.map(s => `<a href="${resolveHref(s.href)}" class="footer-link">${s.label}</a>`).join('')}
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Contact Us</h4>
            <div class="footer-contact-item">
              <span>📍</span>
              <span>First Floor: 101, Shree Vijay Apartments, near Vijay Cross Road, Ahmedabad</span>
            </div>
            <div class="footer-contact-item">
              <span>📞</span>
              <div>
                <a href="tel:+919924823684">+91 9924823684</a><br>
                <a href="tel:+918530477584">+91 8530477584</a><br>
                <a href="tel:+919924238484">+91 9924238484</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <span>✉️</span>
              <a href="mailto:chintuart@gmail.com">chintuart@gmail.com</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© ${new Date().getFullYear()} <a href="${root}index.html">Chintuart</a>. All rights reserved. Ahmedabad, Gujarat.</p>
          <div class="visitor-counter" id="visitorCounterWidget" title="Total site visitors">
            <span class="visitor-counter-pulse"></span>
            <svg class="visitor-counter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <div class="visitor-counter-body">
              <span class="visitor-counter-num" id="visitorCount">—</span>
              <span class="visitor-counter-label">Visitors</span>
            </div>
          </div>
          <div class="footer-dev-credit">
            <span class="footer-dev-text">Developed &amp; Designed by <strong>Dhruvil Shah</strong> &nbsp;·&nbsp; <a href="https://wa.me/919998242316" target="_blank" rel="noopener">+91 9998242316</a></span>
          </div>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Float -->
    <a href="https://wa.me/${CONFIG.whatsapp}?text=Hello%20Chintuart%2C%20I%20am%20interested%20in%20your%20signage%20services."
       class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span class="whatsapp-tooltip">Chat with us!</span>
    </a>

    <!-- Back to Top -->
    <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
  `;
}

/* ─── Inject Components ──────────────────────────────────────────────────── */
function injectComponents() {
  const hp = document.getElementById('header-placeholder');
  const fp = document.getElementById('footer-placeholder');
  if (hp) hp.innerHTML = buildHeader();
  if (fp) fp.innerHTML = buildFooter();
}

/* ─── Loader ─────────────────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  const hide = () => loader.classList.add('hidden');
  // If window already loaded (common on file:// navigation), hide promptly
  if (document.readyState === 'complete') {
    setTimeout(hide, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }
  // Absolute fallback — loader never stays stuck longer than 2.5s
  setTimeout(hide, 2500);
}

/* ─── Sticky Header ──────────────────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Mobile Menu ────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  // Mobile dropdown parents
  nav.querySelectorAll('.mobile-nav-parent').forEach(el => {
    el.addEventListener('click', (e) => {
      const sub = el.nextElementSibling;
      if (sub && sub.classList.contains('mobile-nav-sub')) {
        e.preventDefault();
        sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
}

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-pop'
  );
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Auto-stagger siblings in the same parent that share a reveal class
        const revealClasses = ['reveal','reveal-left','reveal-right','reveal-scale','reveal-blur','reveal-pop'];
        const siblings = Array.from(el.parentElement.children).filter(c =>
          revealClasses.some(cls => c.classList.contains(cls))
        );
        const idx = siblings.indexOf(el);
        const hasExplicitDelay = [...el.classList].some(c => c.startsWith('delay-') || c.startsWith('seq-'));
        if (idx > 0 && !hasExplicitDelay && !el.style.transitionDelay) {
          el.style.transitionDelay = (idx * 0.08) + 's';
        }
        el.classList.add('visible');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ─── Counter Animation ──────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), 1800);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => obs.observe(c));
}

/* ─── Gallery Lightbox ───────────────────────────────────────────────────── */
let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const items = document.querySelectorAll('.gallery-item[data-src]');
  lightboxImages = Array.from(items).map(i => ({
    src: i.dataset.src,
    caption: i.dataset.caption || ''
  }));

  items.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', (e) => e.key === 'Enter' && openLightbox(idx));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
  });

  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lbNext')?.addEventListener('click', () => moveLightbox(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') moveLightbox(-1);
    if (e.key === 'ArrowRight') moveLightbox(1);
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function moveLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}
function updateLightboxImage() {
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  const cur = lightboxImages[lightboxIndex];
  if (!img || !cur) return;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = cur.src;
    img.onload = () => { img.style.opacity = '1'; };
    if (cap) cap.textContent = cur.caption;
  }, 150);
}

/* ─── Ticker Duplication ─────────────────────────────────────────────────── */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

/* ─── Hero Slideshow ───────────────────────────────────────────────────── */
function initHeroSlider() {
  const slider   = document.getElementById('heroSlider');
  const dotsWrap = document.getElementById('heroSliderDots');
  if (!slider || !dotsWrap) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  });

  // Build progress bar
  const progress = document.createElement('div');
  progress.className = 'hero-progress-bar';
  slider.appendChild(progress);

  function getDots() { return dotsWrap.querySelectorAll('.hero-slide-dot'); }

  function restartProgress() {
    progress.classList.remove('running');
    // force reflow so animation restarts cleanly
    void progress.offsetWidth;
    progress.classList.add('running');
  }

  function goTo(n) {
    slides[current].classList.remove('active');
    getDots()[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    getDots()[current].classList.add('active');
    slider.setAttribute('data-slide', (current + 1) + ' / ' + slides.length);
    restartProgress();
  }

  // Set initial state
  slider.setAttribute('data-slide', '1 / ' + slides.length);
  restartProgress();

  // Prev / Next arrows
  const prevBtn = document.getElementById('heroSliderPrev');
  const nextBtn = document.getElementById('heroSliderNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // Auto-advance every 3.5 s; pause on hover
  let timer = setInterval(() => goTo(current + 1), 3500);
  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 3500); }

  slider.addEventListener('mouseenter', () => {
    clearInterval(timer);
    progress.style.animationPlayState = 'paused';
  });
  slider.addEventListener('mouseleave', () => {
    progress.style.animationPlayState = 'running';
    resetTimer();
  });

  // Touch swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  }, { passive: true });
}

/* ─── Back to Top ────────────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── Contact Form ───────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        const success = document.getElementById('formSuccess');
        if (success) { success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 5000); }
      }
    } catch(err) {}
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

/* ─── Hero Typewriter ────────────────────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = el.dataset.words?.split('|') || [];
  let wi = 0, ci = 0, typing = true;
  const speed = { type: 90, delete: 55, pause: 2000 };
  const tick = () => {
    const word = words[wi];
    if (typing) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { typing = false; setTimeout(tick, speed.pause); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { typing = true; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, typing ? speed.type : speed.delete);
  };
  tick();
}

/* ─── Smooth Anchor Scroll ───────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── Gallery Filter ─────────────────────────────────────────────────────── */
function initGalleryFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
        item.style.animation = show ? 'fadeIn 0.4s ease' : '';
      });
    });
  });
}

/* ─── Hero Parallax ─────────────────────────────────────────────────────── */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const hero   = document.querySelector('.hero');
  if (!heroBg || !hero) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY <= hero.offsetHeight * 1.4) {
          heroBg.style.transform = `translateY(${scrollY * 0.28}px) scale(1.10)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  // Apply initial scale to avoid edge-gap at scrollY=0
  heroBg.style.transform = 'translateY(0px) scale(1.10)';
}

/* ─── 3D Card Tilt ───────────────────────────────────────────────────────── */
function initCardTilt() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.service-card, .why-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5);
      const y = ((e.clientY - r.top)  / r.height - 0.5);
      card.style.transition = 'transform 0.1s ease';
      card.style.transform  = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 560);
    });
  });
}

/* ─── Magnetic Buttons ───────────────────────────────────────────────────── */
function initMagneticButtons() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.btn-primary:not(.nav-cta), .btn-gold').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width  / 2);
      const y = e.clientY - (r.top  + r.height / 2);
      btn.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease, background 0.28s ease';
      btn.style.transform  = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.10}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, background 0.28s ease';
      btn.style.transform  = '';
      setTimeout(() => { btn.style.transition = ''; }, 420);
    });
  });
}

/* ─── Scroll Indicator (Hero) ────────────────────────────────────────────── */
function injectScrollIndicator() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const el = document.createElement('div');
  el.className = 'scroll-indicator';
  el.setAttribute('aria-label', 'Scroll down');
  el.innerHTML = `
    <div class="scroll-mouse"></div>
    <div class="scroll-chevrons"><span></span><span></span><span></span></div>
  `;
  el.addEventListener('click', () => {
    const next = hero.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  });
  hero.appendChild(el);
}

/* ─── Feature Lists Stagger ──────────────────────────────────────────────── */
function initFeatureLists() {
  const lists = document.querySelectorAll('.features-list');
  if (!lists.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fl-animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  lists.forEach(l => obs.observe(l));
}

/* ─── Stagger Grid Observer ──────────────────────────────────────────────── */
function initStaggerGrids() {
  // Apply only to grids whose direct children do NOT already carry .reveal classes
  const grids = document.querySelectorAll('.team-grid, .process-grid, .footer-links, .testimonial-grid');
  if (!grids.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('sg-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  grids.forEach(g => {
    g.classList.add('stagger-grid');
    obs.observe(g);
  });
}

/* ─── Mouse-Follow Glow on Dark Sections ────────────────────────────────── */
function initMouseGlow() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.stats-section, .cta-section').forEach(section => {
    const glow = document.createElement('div');
    Object.assign(glow.style, {
      position: 'absolute', width: '360px', height: '360px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(230,56,41,0.09) 0%, transparent 70%)',
      pointerEvents: 'none', zIndex: '0',
      transform: 'translate(-50%,-50%)',
      transition: 'left 0.3s ease, top 0.3s ease',
      left: '50%', top: '50%',
    });
    if (getComputedStyle(section).position === 'static') {
      section.style.position = 'relative';
    }
    section.appendChild(glow);
    section.addEventListener('mousemove', (e) => {
      const r = section.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top  = (e.clientY - r.top)  + 'px';
    }, { passive: true });
  });
}

/* ─── Marquee Duplication (services marquee) ─────────────────────────────── */
function initMarqueeDuplicate() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

/* ─── Brand Tooltip (hover on logos) ────────────────────────────────────── */
function initBrandTooltips() {
  const wrapper = document.querySelector('.ticker-wrapper');
  if (!wrapper) return;

  // Tooltip element appended to body to avoid overflow:hidden clipping
  const tip = document.createElement('div');
  tip.id = 'brandTip';
  document.body.appendChild(tip);

  function showTip(img) {
    const name = img.getAttribute('alt') || '';
    if (!name) return;
    tip.textContent = name;
    const r = img.getBoundingClientRect();
    tip.style.left = (r.left + r.width / 2) + 'px';
    tip.style.top  = (r.top - 50)            + 'px';
    tip.classList.add('visible');
  }

  // Event delegation — works for original + duplicated images
  wrapper.addEventListener('mouseover', (e) => {
    if (e.target.tagName !== 'IMG') return;
    showTip(e.target);
  });

  // Update position as cursor moves over the logo
  wrapper.addEventListener('mousemove', (e) => {
    if (e.target.tagName !== 'IMG' || !tip.classList.contains('visible')) return;
    const r = e.target.getBoundingClientRect();
    tip.style.left = (r.left + r.width / 2) + 'px';
    tip.style.top  = (r.top - 50)            + 'px';
  });

  // Hide only when leaving the entire ticker-wrapper
  wrapper.addEventListener('mouseout', (e) => {
    if (e.target.tagName !== 'IMG') return;
    const goingTo = e.relatedTarget;
    if (goingTo && goingTo.closest && goingTo.closest('.ticker-wrapper')) return;
    tip.classList.remove('visible');
  });
}

/* ─── Init ────────────────────────────────────────────────────────────────── */
/* ─── Copy Protection ───────────────────────────────────────────────────── */
(function () {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable copy, cut, and drag
  document.addEventListener('copy', function (e) { e.preventDefault(); });
  document.addEventListener('cut',  function (e) { e.preventDefault(); });
  document.addEventListener('drag', function (e) { e.preventDefault(); });

  // Block Ctrl+C, Ctrl+A, Ctrl+U, Ctrl+S, F12, and Ctrl+Shift+I/J
  document.addEventListener('keydown', function (e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (
      (ctrl && ['c', 'a', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
      (ctrl && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
    }
  });
})();

/* ─── Visitor Counter ────────────────────────────────────────────────────── */
function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  if (!el) return;

  const SEED      = 3200;   // realistic base so it never shows a tiny number
  const NS        = 'chintuart-ahmedabad';
  const KEY       = 'pageviews';
  const LS_KEY    = 'ca_pv_count';
  const LS_TS_KEY = 'ca_pv_ts';

  function animateCount(target) {
    const from = Math.max(0, target - 60);
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * ease).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function localFallback() {
    let stored = parseInt(localStorage.getItem(LS_KEY) || '0');
    const lastTs = parseInt(localStorage.getItem(LS_TS_KEY) || '0');
    const now = Date.now();
    if (!lastTs || (now - lastTs) > 30 * 60 * 1000) {
      stored += 1;
      localStorage.setItem(LS_KEY, stored);
      localStorage.setItem(LS_TS_KEY, now);
    }
    animateCount(SEED + stored);
  }

  // Try the free CounterAPI — increments on every call
  fetch(`https://api.counterapi.dev/v1/${NS}/${KEY}/up`, { cache: 'no-store' })
    .then(r => r.json())
    .then(d => {
      const count = (d && d.count ? d.count : 0) + SEED;
      animateCount(count);
    })
    .catch(() => localFallback());
}

document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  setTimeout(() => {
    initLoader();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initLightbox();
    initTicker();
    initHeroSlider();
    initBackToTop();
    initContactForm();
    initTypewriter();
    initSmoothScroll();
    initGalleryFilter();
    initVisitorCounter();
    // ── New animation enhancements ──
    initHeroParallax();
    initCardTilt();
    initMagneticButtons();
    injectScrollIndicator();
    initFeatureLists();
    initStaggerGrids();
    initMouseGlow();
    initMarqueeDuplicate();
    initBrandTooltips();
  }, 10);
});

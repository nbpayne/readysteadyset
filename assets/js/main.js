// =============================================================================
// READY STEADY SET - Main JavaScript
// =============================================================================

(function () {
  'use strict';

  // -- Navigation --------------------------------------------------------------
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky nav scroll behaviour
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    }
  });

  // -- Scroll Reveal ------------------------------------------------------------
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // -- Lazy Load Images ---------------------------------------------------------
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length && 'IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
            img.addEventListener('load', () => img.classList.add('loaded'));
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }

  // Eager-loaded images (no data-src)
  document.querySelectorAll('img:not([data-src])').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  // -- Gallery Lightbox (simple) ------------------------------------------------
  const galleryItems = document.querySelectorAll('[data-lightbox]');

  if (galleryItems.length) {
    // Create lightbox DOM
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = `
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__inner">
        <button class="lightbox__close" aria-label="Close">&times;</button>
        <button class="lightbox__prev" aria-label="Previous">&#8592;</button>
        <button class="lightbox__next" aria-label="Next">&#8594;</button>
        <div class="lightbox__img-wrap">
          <img class="lightbox__img" src="" alt="" />
        </div>
        <p class="lightbox__caption"></p>
      </div>
    `;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lightbox__img');
    const lbCaption = lb.querySelector('.lightbox__caption');
    let currentIdx = 0;
    const items = Array.from(galleryItems);

    const openLb = (idx) => {
      currentIdx = idx;
      const item = items[idx];
      lbImg.src = item.dataset.lightbox;
      lbCaption.textContent = item.dataset.caption || '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.focus();
    };

    const closeLb = () => {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    items.forEach((item, i) => {
      item.style.cursor = 'zoom-in';
      item.addEventListener('click', () => openLb(i));
    });

    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__backdrop').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__prev').addEventListener('click', () => {
      openLb((currentIdx - 1 + items.length) % items.length);
    });
    lb.querySelector('.lightbox__next').addEventListener('click', () => {
      openLb((currentIdx + 1) % items.length);
    });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openLb((currentIdx - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') openLb((currentIdx + 1) % items.length);
    });
  }

  // -- Contact Form -------------------------------------------------------------
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Formspree or Netlify Forms compatible
      const data = new FormData(form);

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.innerHTML = `
            <div class="form-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
            </div>
          `;
        } else {
          throw new Error('Submission failed');
        }
      } catch {
        btn.textContent = originalText;
        btn.disabled = false;
        const err = document.createElement('p');
        err.className = 'form-error';
        err.textContent = 'Something went wrong. Please try emailing us directly.';
        form.appendChild(err);
      }
    });
  }

  // -- Counter Animation --------------------------------------------------------
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1500;
          const start = performance.now();

          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => countObserver.observe(el));
  }

  // -- Lightbox Styles (injected) -----------------------------------------------
  const lbStyles = document.createElement('style');
  lbStyles.textContent = `
    .lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }
    .lightbox.is-open { display: flex; }
    .lightbox__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(26,16,9,0.92);
    }
    .lightbox__inner {
      position: relative;
      z-index: 1;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .lightbox__img-wrap {
      max-height: 80vh;
      overflow: hidden;
    }
    .lightbox__img {
      max-width: 85vw;
      max-height: 80vh;
      object-fit: contain;
      opacity: 1 !important;
    }
    .lightbox__caption {
      color: rgba(245,237,216,0.6);
      font-size: 0.875rem;
      font-style: italic;
      text-align: center;
    }
    .lightbox__close,
    .lightbox__prev,
    .lightbox__next {
      position: absolute;
      background: rgba(245,237,216,0.1);
      color: #F5EDD8;
      border: 1px solid rgba(245,237,216,0.2);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .lightbox__close:hover,
    .lightbox__prev:hover,
    .lightbox__next:hover {
      background: rgba(245,237,216,0.2);
    }
    .lightbox__close { top: -52px; right: 0; }
    .lightbox__prev { left: -60px; top: 50%; transform: translateY(-50%); }
    .lightbox__next { right: -60px; top: 50%; transform: translateY(-50%); }
    @media (max-width: 768px) {
      .lightbox__prev { left: 8px; }
      .lightbox__next { right: 8px; }
    }
    .form-success {
      text-align: center;
      padding: 3rem 2rem;
      color: #7B3F1E;
    }
    .form-success svg { margin: 0 auto 1rem; color: #7B3F1E; }
    .form-success h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 0.5rem; }
    .form-error { color: #c0392b; margin-top: 1rem; font-size: 0.875rem; }
  `;
  document.head.appendChild(lbStyles);

})();

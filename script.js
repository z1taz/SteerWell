/* ============================================================
   STEERWELL — JAVASCRIPT
   Interactions, animations, mode switching
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // NAVBAR — Scroll shadow + hamburger menu
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  // ============================================================
  // SCROLL ANIMATIONS — Intersection Observer
  // ============================================================
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // ============================================================
  // HERO MODE TABS — Switch active mode in hero mockup
  // ============================================================
  const heroTabs = document.querySelectorAll('.mockup__mode-tab');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('mockup__mode-tab--active'));
      tab.classList.add('mockup__mode-tab--active');
    });
  });

  // ============================================================
  // HERO "Just tell me" — Contextual recall interaction
  // ============================================================
  const heroTellMe = document.getElementById('hero-tell-me');
  const heroHint = document.getElementById('hero-hint-bubble');
  const heroAnswer = document.getElementById('hero-answer-bubble');

  if (heroTellMe && heroHint && heroAnswer) {
    let revealed = false;
    heroTellMe.addEventListener('click', () => {
      if (!revealed) {
        heroHint.style.display = 'none';
        heroAnswer.style.display = 'inline-block';
        heroAnswer.style.opacity = '0';
        heroAnswer.style.transform = 'translateY(4px)';
        requestAnimationFrame(() => {
          heroAnswer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          heroAnswer.style.opacity = '1';
          heroAnswer.style.transform = 'translateY(0)';
        });
        heroTellMe.textContent = 'Show hint instead ←';
        revealed = true;
      } else {
        heroAnswer.style.display = 'none';
        heroHint.style.display = 'inline-block';
        heroHint.style.opacity = '0';
        heroHint.style.transform = 'translateY(4px)';
        requestAnimationFrame(() => {
          heroHint.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          heroHint.style.opacity = '1';
          heroHint.style.transform = 'translateY(0)';
        });
        heroTellMe.textContent = 'Just tell me →';
        revealed = false;
      }
    });
  }

  // ============================================================
  // THREE MODES TABS — Switch panel + animate
  // ============================================================
  const modesTabs = document.querySelectorAll('.modes__tab');
  const modesPanels = document.querySelectorAll('.modes__panel');

  modesTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mode;

      // Update tabs
      modesTabs.forEach(t => t.classList.remove('modes__tab--active'));
      tab.classList.add('modes__tab--active');

      // Update panels with fade
      modesPanels.forEach(panel => {
        if (panel.id === `mode-${target}`) {
          panel.style.opacity = '0';
          panel.style.display = 'block';
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.3s ease';
            panel.style.opacity = '1';
          });
          panel.classList.add('modes__panel--active');
          // Trigger fade-up for children
          panel.querySelectorAll('.fade-up').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        } else {
          panel.style.display = 'none';
          panel.classList.remove('modes__panel--active');
        }
      });
    });
  });

  // Make "Just tell me" in Driver panel work
  const miniTellBtns = document.querySelectorAll('.mini-chat__tell-btn');
  miniTellBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chatArea = btn.closest('.mini-mockup__chat');
      if (!chatArea) return;
      const hintMsg = chatArea.querySelector('.mini-chat__msg--hint');
      if (hintMsg) {
        hintMsg.classList.remove('mini-chat__msg--hint');
        hintMsg.classList.add('mini-chat__msg--answer');
        hintMsg.textContent = 'The team agreed on a phased rollout: internal beta by Oct 18, public API in November. Backend owns the timeline.';
        btn.style.display = 'none';

        // Add source
        const source = document.createElement('div');
        source.className = 'mini-chat__source';
        source.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg> Engineering Sync — 18:42`;
        btn.parentNode.appendChild(source);
      }
    });
  });

  // ============================================================
  // CONTEXTUAL RECALL DEMO — Toggle hint / direct
  // ============================================================
  const recallToggle = document.getElementById('recall-toggle');
  const recallHint = document.getElementById('recall-hint');
  const recallDirect = document.getElementById('recall-direct');
  const recallModeBadge = document.getElementById('recall-mode-badge');

  if (recallToggle && recallHint && recallDirect) {
    let showingDirect = false;

    recallToggle.addEventListener('click', () => {
      if (!showingDirect) {
        // Switch to direct answer
        recallHint.style.opacity = '0';
        setTimeout(() => {
          recallHint.style.display = 'none';
          recallDirect.style.display = 'block';
          recallDirect.style.opacity = '0';
          requestAnimationFrame(() => {
            recallDirect.style.transition = 'opacity 0.3s ease';
            recallDirect.style.opacity = '1';
          });
        }, 200);
        recallToggle.textContent = '← Back to hint';
        // Update badge to Passenger
        recallModeBadge.innerHTML = `<img src="assets/passenger.png" alt="" /> Passenger Mode`;
        showingDirect = true;
      } else {
        // Switch back to hint
        recallDirect.style.opacity = '0';
        setTimeout(() => {
          recallDirect.style.display = 'none';
          recallHint.style.display = 'block';
          recallHint.style.opacity = '0';
          requestAnimationFrame(() => {
            recallHint.style.transition = 'opacity 0.3s ease';
            recallHint.style.opacity = '1';
          });
        }, 200);
        recallToggle.textContent = 'Just tell me →';
        // Update badge to Driver
        recallModeBadge.innerHTML = `<img src="assets/driver.png" alt="" /> Driver Mode`;
        showingDirect = false;
      }
    });
  }

  // ============================================================
  // CONTACT FORM — Submission
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.contact-form__submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.querySelectorAll('.contact-form__field').forEach(f => f.style.display = 'none');
        contactForm.querySelector('.contact-form__row').style.display = 'none';
        submitBtn.style.display = 'none';
        formSuccess.style.display = 'flex';
      }, 900);
    });
  }

  // ============================================================
  // SMOOTH SCROLL for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // HERO BG — subtle gradient drift
  // ============================================================
  const heroBg = document.querySelector('.hero__bg-gradient');
  if (heroBg) {
    let tick = 0;
    function drift() {
      tick += 0.003;
      const x = 60 + Math.sin(tick) * 5;
      const y = 40 + Math.cos(tick * 0.7) * 4;
      heroBg.style.background = `
        radial-gradient(ellipse 70% 50% at ${x}% ${y}%, rgba(99,102,241,0.07) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 20% 70%, rgba(148,130,255,0.05) 0%, transparent 60%)
      `;
      requestAnimationFrame(drift);
    }
    drift();
  }

  // ============================================================
  // INITIAL FADE-UPs — trigger visible elements immediately
  // ============================================================
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 100);
    }
  });

});

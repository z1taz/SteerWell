/* ============================================================
   STEERWELL: JAVASCRIPT
   Navbar, hero intro, animations, mode switching,
   team feature picker, early access form
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // HERO INTRO ANIMATION
  // ============================================================
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.body.classList.add('hero-animating');
    // Total animation completes under 2.2s; CTA is interactive by 2.2s
    setTimeout(() => {
      document.body.classList.remove('hero-animating');
      const wheel = document.getElementById('hero-intro-wheel');
      if (wheel) wheel.style.display = 'none';
    }, 2150);
  }

  // ============================================================
  // NAVBAR: Scroll shadow and hamburger menu
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));

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

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  // ============================================================
  // SCROLL ANIMATIONS: Intersection Observer
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

  fadeEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 100);
    }
  });

  // ============================================================
  // HERO MODE TABS: Switch active tab in hero mockup
  // ============================================================
  const heroTabs = document.querySelectorAll('.mockup__mode-tab');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('mockup__mode-tab--active'));
      tab.classList.add('mockup__mode-tab--active');
    });
  });

  // ============================================================
  // HERO "Just tell me": Toggle hint / direct answer
  // ============================================================
  const heroTellMe = document.getElementById('hero-tell-me');
  const heroHint   = document.getElementById('hero-hint-bubble');
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
        heroTellMe.innerHTML = '&larr; Show hint instead';
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
        heroTellMe.innerHTML = 'Just tell me &rarr;';
        revealed = false;
      }
    });
  }

  // ============================================================
  // THREE MODES TABS: Switch panel and animate
  // ============================================================
  const modesTabs   = document.querySelectorAll('.modes__tab');
  const modesPanels = document.querySelectorAll('.modes__panel');

  modesTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mode;

      modesTabs.forEach(t => t.classList.remove('modes__tab--active'));
      tab.classList.add('modes__tab--active');

      modesPanels.forEach(panel => {
        if (panel.id === `mode-${target}`) {
          panel.style.opacity = '0';
          panel.style.display = 'block';
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.3s ease';
            panel.style.opacity = '1';
          });
          panel.classList.add('modes__panel--active');
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

  // "Just tell me" inside Driver panel demo
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

        const source = document.createElement('div');
        source.className = 'mini-chat__source';
        source.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg> Engineering Sync: 18:42`;
        btn.parentNode.appendChild(source);
      }
    });
  });

  // ============================================================
  // TEAM CUSTOM PLAN FEATURE PICKER
  // ============================================================
  const teamChecks   = document.querySelectorAll('.team-picker__check');
  const teamPriceEl  = document.getElementById('team-price-display');
  const teamStatusEl = document.getElementById('team-picker-status');
  const teamBtn      = document.getElementById('team-picker-btn');

  function updateTeamPlan() {
    if (!teamChecks.length || !teamPriceEl || !teamBtn || !teamStatusEl) return;

    let total = 0;
    let count = 0;

    teamChecks.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.dataset.price, 10) || 0;
        count += 1;
      }
    });

    teamPriceEl.innerHTML = `₹${total}<span>/user/month</span>`;

    if (count < 3) {
      teamBtn.classList.add('btn--disabled');
      teamBtn.setAttribute('aria-disabled', 'true');
      teamBtn.tabIndex = -1;
      teamStatusEl.textContent = 'Pick at least 3 features';
      teamStatusEl.style.color = '#D97706';
    } else {
      teamBtn.classList.remove('btn--disabled');
      teamBtn.removeAttribute('aria-disabled');
      teamBtn.tabIndex = 0;
      teamStatusEl.textContent = `${count} features selected`;
      teamStatusEl.style.color = 'var(--clr-success)';
    }
  }

  teamChecks.forEach(cb => {
    cb.addEventListener('change', updateTeamPlan);
  });

  // Initialize team picker calculation on load
  updateTeamPlan();

  // ============================================================
  // EARLY ACCESS FORM: Submission
  // ============================================================
  const eaForm    = document.getElementById('early-access-form');
  const eaSuccess = document.getElementById('ea-success');

  if (eaForm) {
    eaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = eaForm.querySelector('#ea-email');
      if (!emailInput.value || !emailInput.validity.valid) {
        emailInput.focus();
        return;
      }

      const submitBtn = eaForm.querySelector('.early-access__submit');
      submitBtn.textContent = 'Joining...';
      submitBtn.disabled = true;

      setTimeout(() => {
        eaForm.querySelectorAll('.early-access__field').forEach(f => f.style.display = 'none');
        submitBtn.style.display = 'none';
        const noteEl = eaForm.querySelector('.early-access__note');
        if (noteEl) noteEl.style.display = 'none';
        if (eaSuccess) eaSuccess.style.display = 'flex';
      }, 800);
    });
  }

  // ============================================================
  // SMOOTH SCROLL for all internal anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 76;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // HERO BG: subtle gradient drift
  // ============================================================
  const heroBg = document.querySelector('.hero__bg-gradient');
  if (heroBg && !prefersReduced) {
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

});

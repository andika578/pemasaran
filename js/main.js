/**
 * DHOLPIN - Creative Studio Script
 * Integrates Lenis Smooth Scroll, GSAP ScrollTrigger, Word-by-Word Title Reveal,
 * Portfolio Filters, Modal Preview, and WhatsApp Dynamic Checkout.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  } catch (e) {
    console.warn('Lenis could not be initialized:', e);
  }

  // 3. Word-by-Word Reveal on Titles (GSAP + ScrollTrigger)
  initWordByWordTitles();

  // 4. Staggered Fade Up for elements
  initFadeUpAnimations();

  // 5. Portfolio Filtering
  initPortfolioFilters();

  // 6. Modal / Lightbox Functionality
  initPortfolioModal();

  // 7. Interactive Invitation Simulator Modal
  initInvitationSimulator();

  // 8. Mobile Navigation Menu
  initMobileMenu();

  // 9. Quick Booking & WhatsApp Form
  initQuickConsultation();

  // 10. ScrollSpy & Interactive Animated Active Nav Indicator
  initScrollSpy(lenis);

  // 11. Interactive Tactile Frame Box Pop Animation ("Animasi Timbul")
  initFrameBoxPopAnimation();
});

/**
 * Splits text of elements with class `.split-words` into individual word spans
 * and animates them when scrolled into view.
 */
function initWordByWordTitles() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const titleElements = document.querySelectorAll('.split-words');

  titleElements.forEach((el) => {
    // Save original text and child elements if needed
    const rawText = el.textContent.trim();
    if (!rawText) return;

    // Split words by space while preserving structure
    const words = rawText.split(/\s+/);
    el.innerHTML = '';

    words.forEach((word) => {
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';

      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.textContent = word;

      wrap.appendChild(inner);
      el.appendChild(wrap);
    });

    const innerWords = el.querySelectorAll('.word-inner');

    gsap.to(innerWords, {
      y: '0%',
      opacity: 1,
      duration: 0.85,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });
}

/**
 * General fade-in-up animations for cards and badges
 */
function initFadeUpAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  // Staggered cards
  const cardContainers = document.querySelectorAll('.fade-stagger-parent');
  cardContainers.forEach((parent) => {
    const cards = parent.querySelectorAll('.fade-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

  // Floating Hero mockups entrance
  const heroVisual = document.querySelector('.hero-visual-entrance');
  if (heroVisual) {
    gsap.from(heroVisual, {
      scale: 0.92,
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    });
  }
}

/**
 * Filter Portfolio items by Category
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button styling
      filterBtns.forEach((b) => {
        b.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
        b.classList.add('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');
      });
      btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
      btn.classList.remove('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          if (window.gsap) {
            gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
          }
        } else {
          item.style.display = 'none';
        }
      });

      // Refresh ScrollTrigger calculations
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    });
  });
}

/**
 * Lightbox modal for previewing portfolio items
 */
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  const modalActionBtn = document.getElementById('modal-action-btn');

  if (!modal) return;

  const openTriggers = document.querySelectorAll('.open-modal-trigger');
  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.portfolio-item');
      if (!parent) return;

      const title = parent.getAttribute('data-title') || 'DHOLPIN Karya';
      const tag = parent.getAttribute('data-tag') || 'Portofolio';
      const desc = parent.getAttribute('data-desc') || 'Dokumentasi karya terbaik oleh DHOLPIN Studio.';
      const imgSrc = parent.getAttribute('data-img') || trigger.querySelector('img')?.src;
      const ctaType = parent.getAttribute('data-category');

      if (modalTitle) modalTitle.textContent = title;
      if (modalTag) modalTag.textContent = tag;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalImg && imgSrc) modalImg.src = imgSrc;

      // Dynamic action button
      if (modalActionBtn) {
        let msg = `Halo DHOLPIN, saya tertarik dengan karya ${title}. Boleh tanya detail paket dan ketersediaan tanggalnya?`;
        modalActionBtn.href = `https://wa.me/6285708454528?text=${encodeURIComponent(msg)}`;
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Interactive Digital Invitation Simulator
 */
function initInvitationSimulator() {
  const simModal = document.getElementById('invitation-sim-modal');
  const openBtns = document.querySelectorAll('.open-invitation-sim');
  const closeBtn = document.getElementById('sim-modal-close');

  if (!simModal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      simModal.classList.remove('hidden');
      simModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeSim = () => {
    simModal.classList.add('hidden');
    simModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeSim);

  simModal.addEventListener('click', (e) => {
    if (e.target === simModal) closeSim();
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileNav) return;

  const openMenu = () => {
    mobileNav.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Consultation WhatsApp Form Handler
 */
function initQuickConsultation() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value || 'Teman DHOLPIN';
    const service = document.getElementById('form-service')?.value || 'Undangan Web / Fotografi';
    const date = document.getElementById('form-date')?.value || 'Belum ditentukan';
    const note = document.getElementById('form-note')?.value || '-';

    const text = `Halo DOLPHIN Studio!%0A%0ASaya ingin konsultasi / booking slot:%0A*Nama:* ${encodeURIComponent(name)}%0A*Layanan:* ${encodeURIComponent(service)}%0A*Rencana Tanggal Acara:* ${encodeURIComponent(date)}%0A*Catatan/Request Khusus:* ${encodeURIComponent(note)}%0A%0AMohon info ketersediaan slot dan langkah selanjutnya ya. Terima kasih!`;

    window.open(`https://wa.me/6285708454528?text=${text}`, '_blank');
  });
}

/**
 * ScrollSpy with Animated Sliding Pill Indicator for Active Nav
 */
function initScrollSpy(lenis) {
  const sections = ['beranda', 'tentang', 'undangan-digital', 'fotografi', 'pricelist', 'faq', 'kontak'];
  const desktopNav = document.getElementById('desktop-nav');
  const activePill = document.getElementById('nav-active-pill');
  const desktopLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  let currentActiveId = '';

  function setActive(sectionId) {
    if (!sectionId || currentActiveId === sectionId) return;
    currentActiveId = sectionId;

    // Update Desktop Nav links & sliding pill
    desktopLinks.forEach((link) => {
      const sec = link.getAttribute('data-section');
      if (sec === sectionId) {
        link.classList.add('is-active');

        // Smoothly position the sliding pill
        if (activePill && desktopNav) {
          const navRect = desktopNav.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();
          const leftOffset = linkRect.left - navRect.left;

          activePill.style.opacity = '1';
          activePill.style.width = `${linkRect.width}px`;
          activePill.style.left = `${leftOffset}px`;
        }
      } else {
        link.classList.remove('is-active');
      }
    });

    // Update Mobile Drawer Nav links
    mobileLinks.forEach((link) => {
      const sec = link.getAttribute('data-section');
      if (sec === sectionId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Smooth scroll handler on click
  function handleNavClick(e, link) {
    const targetId = link.getAttribute('data-section');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      setActive(targetId);

      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -80, duration: 1.1 });
      } else {
        const yPos = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: yPos, behavior: 'smooth' });
      }
    }
  }

  desktopLinks.forEach((link) => {
    link.addEventListener('click', (e) => handleNavClick(e, link));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', (e) => handleNavClick(e, link));
  });

  // Scroll detection handler
  function checkScroll() {
    const scrollPosition = window.scrollY + 160;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Bottom of the page: activate 'kontak'
    if (window.scrollY + windowHeight >= documentHeight - 60) {
      setActive('kontak');
      return;
    }

    let activeId = 'beranda';
    for (let i = 0; i < sections.length; i++) {
      const secId = sections[i];
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;
        if (scrollPosition >= top && scrollPosition <= bottom) {
          activeId = secId;
        }
      }
    }
    setActive(activeId);
  }

  // Register scroll & resize listeners
  window.addEventListener('scroll', checkScroll, { passive: true });
  if (lenis) {
    lenis.on('scroll', checkScroll);
  }
  window.addEventListener('resize', () => {
    currentActiveId = ''; // force recalculation of pill geometry
    checkScroll();
  });

  // Initial trigger after DOM paint
  setTimeout(checkScroll, 200);
}

/**
 * Click pop animation for frame boxes ("Animasi Timbul")
 */
function initFrameBoxPopAnimation() {
  const interactiveBoxes = document.querySelectorAll('.frame-box-interactive');
  interactiveBoxes.forEach((box) => {
    box.addEventListener('click', (e) => {
      // Don't interfere with form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(e.target.tagName)) return;

      box.classList.remove('box-popped');
      void box.offsetWidth; // force browser layout reflow
      box.classList.add('box-popped');

      setTimeout(() => {
        box.classList.remove('box-popped');
      }, 480);
    });
  });
}

============================================================
   DOLLIS CLOTHING GLOBAL LTD — JavaScript
   Features: Loader, Navbar, Scroll Reveal, Filter, Modal,
             WhatsApp, Back-to-Top, Form, Animations
   ============================================================ */

/* ===== 1. PAGE LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Start page animations after loader hides
      initReveal();
    }
  }, 2200); // matches loader animation duration
});


/* ===== 2. STICKY NAVBAR ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button visibility
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link based on scroll position
  updateActiveNavLink();
});


/* ===== 3. ACTIVE NAV LINK ON SCROLL ===== */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-nav'));
        navLink.classList.add('active-nav');
      }
    }
  });
}


/* ===== 4. SCROLL REVEAL ANIMATION ===== */
function initReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;

        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 80;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Also run reveal for elements that might be visible on load
document.addEventListener('DOMContentLoaded', () => {
  // Delay to allow loader to show first
  setTimeout(initReveal, 2300);
});


/* ===== 5. PRODUCT COLLECTION FILTER ===== */
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state on buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    productCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        // Animate in
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 60);
      } else {
        // Animate out then hide
        card.style.transition = 'opacity 0.2s ease';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});


/* ===== 6. QUICK VIEW MODAL ===== */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Product data for modal
const productData = {
  hoodie: {
    cat: 'Hoodie',
    name: 'Crimson Phantom Hoodie',
    price: '₦45,000',
    desc: 'Premium heavyweight cotton blend. Relaxed fit with inner fleece lining. Embroidered Dollis logo. Available in all sizes S–XXL.'
  },
  tshirt: {
    cat: 'T-Shirt',
    name: 'Dollis Classic Tee',
    price: '₦18,500',
    desc: 'Supima cotton premium tee with subtle embroidered logo. Tailored fit. Moisture-wicking technology. Available in 8 colorways.'
  },
  sneakers: {
    cat: 'Sneakers',
    name: 'Dollis Velocity Low',
    price: '₦65,000',
    desc: 'Hand-stitched leather upper. Memory foam insole. Exclusive Dollis embossed sole. Limited production — crafted for those who move with intent.'
  },
  jacket: {
    cat: 'Jacket',
    name: 'Crimson Edge Leather Jacket',
    price: '₦89,000',
    desc: 'Full-grain genuine leather. Satin quilted lining. YKK premium zippers. Custom Dollis hardware details. Your signature statement piece.'
  },
  native: {
    cat: 'Native Wear',
    name: 'Royal Agbada 3-Piece Set',
    price: '₦120,000',
    desc: 'Exclusive jacquard fabric with hand-embroidered details. Regal 3-piece set — Agbada, Dashiki, and trousers — tailored for royalty.'
  }
};

// Open modal when Quick View is clicked
document.querySelectorAll('.btn-quick-view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    const category = card.getAttribute('data-category');
    const data = productData[category];

    if (data) {
      document.getElementById('modalCat').textContent = data.cat;
      document.getElementById('modalName').textContent = data.name;
      document.getElementById('modalPrice').textContent = data.price;
      document.querySelector('.modal-desc').textContent = data.desc;
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Modal size selection
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


/* ===== 7. ADD TO CART ANIMATION ===== */
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const originalText = btn.innerHTML;

    // Visual feedback
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
    btn.style.background = 'var(--red)';
    btn.style.borderColor = 'var(--red)';
    btn.style.color = 'white';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 1800);
  });
});


/* ===== 8. CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Loading state
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Collect form data
  const formData = new FormData(contactForm);

  try {
    // Send to Formspree
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formSuccess.textContent = "✓ Message sent! You will receive a reply with due time.";
      formSuccess.classList.add('show');

      contactForm.reset();

      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
    } else {
      formSuccess.textContent = "❌ Failed to send message.";
      formSuccess.classList.add('show');
    }

  } catch (error) {
    formSuccess.textContent = "❌ Network error. Try again.";
    formSuccess.classList.add('show');
  }

  // Reset button after delay
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    formSuccess.classList.remove('show');
  }, 4000);
});


/* ===== 9. BACK TO TOP BUTTON ===== */
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


/* ===== 10. WHATSAPP FLOAT BUTTON ===== */
// The WhatsApp button uses a direct href link with pre-filled message
// Number: 2348106232226
// Message: pre-encoded in the href
// Additional tracking on click:
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
  whatsappFloat.addEventListener('click', () => {
    // Track WhatsApp click (analytics placeholder)
    console.log('WhatsApp button clicked — opening chat');
  });
}


/* ===== 11. SMOOTH HOVER EFFECTS ON GALLERY ===== */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function () {
    // Subtle lift on siblings
    this.closest('.gallery-grid').querySelectorAll('.gallery-item').forEach(sib => {
      if (sib !== this) sib.style.opacity = '0.75';
    });
  });

  item.addEventListener('mouseleave', function () {
    this.closest('.gallery-grid').querySelectorAll('.gallery-item').forEach(sib => {
      sib.style.opacity = '1';
    });
  });
});


/* ===== 12. HERO SECTION — HERO BG FIXED PANEL CONTROL ===== */
// When page scrolls past the hero, collapse the fixed bg
const heroSection = document.getElementById('home');

const heroBgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const heroBg = document.querySelector('.hero-bg');
    if (entry.isIntersecting) {
      document.body.classList.add('hero-visible');
    } else {
      document.body.classList.remove('hero-visible');
      // After hero, make background white for other sections
    }
  });
}, { threshold: 0.05 });

if (heroSection) heroBgObserver.observe(heroSection);


/* ===== 13. TESTIMONIAL CARDS — AUTO HIGHLIGHT CYCLE ===== */
const testiCards = document.querySelectorAll('.testi-card');
let currentTesti = 1; // start with middle (featured)

setInterval(() => {
  testiCards.forEach(card => card.classList.remove('testi-featured'));
  currentTesti = (currentTesti + 1) % testiCards.length;
  testiCards[currentTesti].classList.add('testi-featured');
}, 4000);


/* ===== 14. PRODUCT CARD TILT EFFECT (Subtle 3D) ===== */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});


/* ===== 15. PARALLAX EFFECT ON HERO (Subtle) ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');

  if (heroBg && scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});


/* ===== 16. COUNTER ANIMATION FOR HERO STATS ===== */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}

// Trigger counters when stats become visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = [5000, 200, 15];
      const suffixes = ['K+', '+', '+'];

      statNums.forEach((num, i) => {
        // Parse target from text
        animateCounter(num, targets[i], suffixes[i]);
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


/* ===== 17. DYNAMIC COPYRIGHT YEAR ===== */
const copyrightEl = document.querySelector('.footer-bottom p');
if (copyrightEl) {
  const year = new Date().getFullYear();
  copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2025', year);
}


/* ===== 18. SCROLL PROGRESS BAR ===== */
// Dynamically create and inject a progress bar at top
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #c00, #ff4444);
  z-index: 9999;
  width: 0%;
  transition: width 0.1s ease;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
});


/* ===== 19. ARRIVAL CARDS INTERACTION ===== */
document.querySelectorAll('.arrival-card').forEach(card => {
  card.addEventListener('click', () => {
    // Visual feedback on click
    card.style.transform = 'translateX(12px) scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 200);
  });
});


/* ===== 20. MOBILE TOUCH SUPPORT FOR HOVER EFFECTS ===== */
// Ensure Quick View appears on tap on mobile
if ('ontouchstart' in window) {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.toggle('touch-hover');
    });
  });

  // Add CSS for touch-hover
  const touchStyle = document.createElement('style');
  touchStyle.textContent = `
    .product-card.touch-hover .product-overlay {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(touchStyle);
}


/* ===== LOG INITIALIZATION ===== */
console.log('%cDollis Clothing Global Ltd', 'font-size:20px; color:#c00; font-weight:bold;');
console.log('%cPremium Luxury Fashion — Website Loaded ✓', 'color:#888; font-size:12px;');

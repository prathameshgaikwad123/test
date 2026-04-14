/* ============================================
   ミライ建設ナビ - JavaScript
   ============================================ */

// --- Mobile Menu Toggle ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', function () {
  const isOpen = mobileMenu.classList.toggle('active');

  if (isOpen) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

// --- FAQ Accordion ---
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all FAQ items first
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.classList.remove('active');
  });

  // Toggle the clicked one
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// --- Smooth Scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});

// --- Close mobile menu on window resize ---
window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

// --- Header shadow on scroll ---
const header = document.querySelector('.header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }
});

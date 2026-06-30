/* ===========================
   BOBBY DEV PORTFOLIO - ANIMATIONS
   =========================== */

// ===========================
// MOBILE MENU HANDLER
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });

  // Close menu on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });

  // ===========================
  // SCROLL REVEAL ANIMATIONS
  // ===========================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elementsToObserve = document.querySelectorAll(
    '.card, .testimonial-card, .project-card, .contact-card, .contact-form, .section-header'
  );

  elementsToObserve.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // ===========================
  // ACTIVE NAV LINK
  // ===========================

  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === '/' && currentPage === '')) {
      link.classList.add('active');
    }
  });

  // ===========================
  // SMOOTH SCROLL OFFSET (for sticky nav)
  // ===========================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const topPosition = target.offsetTop - offset;
        window.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================
  // CONTACT FORM HANDLER
  // ===========================

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        description: document.getElementById('description').value
      };

      // Validate form
      if (!formData.name || !formData.email || !formData.service || !formData.description) {
        alert('Please fill in all required fields.');
        return;
      }

      // Show success message
      const successMessage = document.querySelector('.form-success');
      if (successMessage) {
        successMessage.classList.add('show');
      }

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.remove('show');
        }
      }, 5000);

      // Log the form data (in production, this would be sent to a server)
      console.log('Form submitted:', formData);
    });
  }

  // ===========================
  // MARQUEE CLONE FOR INFINITE SCROLL
  // ===========================

  const marquee = document.querySelector('.marquee');
  if (marquee) {
    const marqueeContent = marquee.innerHTML;
    marquee.innerHTML = marqueeContent + marqueeContent;
  }

  // ===========================
  // PAGE TRANSITION EFFECT
  // ===========================

  // Add fade-in on page load
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });

  // ===========================
  // PARALLAX EFFECT (optional, subtle)
  // ===========================

  window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
      const scrollPosition = window.scrollY;
      const elementPosition = element.offsetTop;
      const elementHeight = element.offsetHeight;

      if (scrollPosition + window.innerHeight > elementPosition &&
          scrollPosition < elementPosition + elementHeight) {
        const yPos = (scrollPosition - elementPosition) * 0.5;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  });

  // ===========================
  // SCROLL-TO-TOP BUTTON (optional)
  // ===========================

  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
      } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===========================
  // STAGGER ANIMATION FOR LISTS
  // ===========================

  const staggerElements = document.querySelectorAll('[data-stagger]');
  const staggerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, index) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          setTimeout(() => {
            child.style.transition = 'all 0.5s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  staggerElements.forEach(el => staggerObserver.observe(el));

  // ===========================
  // LAZY IMAGE LOADING (optional)
  // ===========================

  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ===========================
  // TOOLTIP FOR SOCIAL ICONS
  // ===========================

  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    const tooltip = icon.querySelector('.tooltip');
    if (tooltip) {
      icon.addEventListener('mouseenter', function() {
        tooltip.style.opacity = '1';
      });
      icon.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
      });
    }
  });

  // ===========================
  // SMOOTH LINK INTERACTIONS
  // ===========================

  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default for external links or downloads
      if (this.getAttribute('href') && !this.getAttribute('href').startsWith('/')) {
        if (!this.hasAttribute('target')) {
          return;
        }
      }
    });
  });

  // ===========================
  // PREFETCH NEXT PAGES
  // ===========================

  const prefetchLinks = document.querySelectorAll('a[href$=".html"]');
  prefetchLinks.forEach(link => {
    const link_element = document.createElement('link');
    link_element.rel = 'prefetch';
    link_element.href = link.href;
    document.head.appendChild(link_element);
  });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Smooth scroll to element
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toggle class
function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

// Add event listener to multiple elements
function addEventListenerToAll(selector, event, callback) {
  document.querySelectorAll(selector).forEach(element => {
    element.addEventListener(event, callback);
  });
}

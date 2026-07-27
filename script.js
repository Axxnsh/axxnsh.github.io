/* ==========================================================================
   ANSH.COM - Interactive Portfolio & Web Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('ansh_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ansh_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#f9fafb';
    }
  }

  // 2. Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenuList = document.getElementById('nav-menu-list');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenuList.classList.toggle('open');
      const icon = mobileMenuToggle.querySelector('i');
      if (navMenuList.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Close mobile menu when clicking nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenuList.classList.contains('open')) {
        navMenuList.classList.remove('open');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });

  // 3. Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Resume Modal Logic
  const openResumeBtn = document.getElementById('open-resume-btn');
  const closeResumeBtn = document.getElementById('close-modal-btn');
  const resumeModal = document.getElementById('resume-modal');
  const downloadCvBtn = document.getElementById('download-cv-btn');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
    });

    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('hidden');
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.add('hidden');
      }
    });

    downloadCvBtn.addEventListener('click', () => {
      // Trigger simulation download
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'Ansh_FullStack_Resume.pdf');
      alert('Downloading Ansh_FullStack_Resume.pdf ...');
    });
  }

  // 5. Project Details Modal (Event Delegation)
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const details = {
        bms: "Ansh Business Management System (BMS): Complete Enterprise suite for inventory, sales POS, client invoices, and financial reports built for small to large businesses.",
        analytics: "Real-time AI Analytics Hub: Advanced telemetry portal with live server stream tracking, custom anomaly alerts, and exportable PDF/Excel reports.",
        design: "Ansh UI Design System: High-performance, accessible UI component kit engineered with glassmorphic tokens, CSS variables, and full React integration."
      };
      alert(details[projectKey] || "Detailed project documentation loading...");
    });
  });

  // 6. Contact Form Interactive Handler
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;

      // Disable button & show spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Your message has been sent to contact@ansh.com. Ansh will reply back shortly.`;
        formAlert.classList.remove('hidden');

        contactForm.reset();

        setTimeout(() => {
          formAlert.classList.add('hidden');
        }, 6000);
      }, 1200);
    });
  }
});

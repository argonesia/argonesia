document.addEventListener('DOMContentLoaded', () => {
  // Safety selectors
  const navbarNav = document.querySelector('.navbar-nav');
  const hamburger = document.querySelector('#hamburger-menu');
  const navbar = document.querySelector('.navbar');

  // Toggle Menu (Mobile) — cek dulu elemen ada
  if (hamburger && navbarNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarNav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navbarNav.contains(e.target) && !hamburger.contains(e.target)) {
        navbarNav.classList.remove('active');
      }
    });
  }

  // Efek Blur Navbar saat Scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // Auto aktifkan link navbar saat scroll (gunakan window.scrollY)
  const sectionsAll = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav a');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sectionsAll.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (currentSection && href.includes(`#${currentSection}`)) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll untuk .scroll-to
  document.querySelectorAll('.scroll-to').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const yOffset = -70;
        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Fade-in sections (IntersectionObserver lebih andal)
  const sections = document.querySelectorAll('.section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.2 });

  sections.forEach(s => io.observe(s));
});

// ================= FOTO JADI POPUP (FULLSCREEN LIGHTBOX) =================
document.addEventListener('DOMContentLoaded', () => {
  const fotoJadiImages = document.querySelectorAll('.foto-jadi-slider img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  fotoJadiImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  });
});

// ================= VIDEO POPUP (MODAL-VIDEO BARU) =================
document.addEventListener('DOMContentLoaded', () => {
  const modalVideo = document.querySelector('.modal-video');
  const modalVideoEl = modalVideo?.querySelector('#modalVideo');
  const closeVideo = modalVideo?.querySelector('.close-video');

  if (!modalVideo || !modalVideoEl) return;

  // Klik thumbnail → buka modal video
  document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();

      const videoSrc = item.getAttribute('data-video');
      if (!videoSrc) return;

      const wrapper = modalVideo.querySelector('.video-wrapper');

      // mode portrait untuk video Instagram
      if (item.classList.contains('instagram')) {
        wrapper.classList.add('instagram');
        modalVideoEl.classList.add('instagram');
      } else {
        wrapper.classList.remove('instagram');
        modalVideoEl.classList.remove('instagram');
      }

      modalVideoEl.querySelector('source').src = videoSrc;
      modalVideoEl.load();
      modalVideoEl.play();

      modalVideo.classList.add('active');
    });
  });

  // Klik tombol X → tutup video
  closeVideo?.addEventListener('click', () => {
    modalVideoEl.pause();
    modalVideoEl.currentTime = 0;
    modalVideoEl.querySelector('source').src = '';
    modalVideo.classList.remove('active');
  });

  // Klik di luar video → tutup modal
  modalVideo.addEventListener('click', e => {
    if (e.target === modalVideo) {
      modalVideoEl.pause();
      modalVideoEl.currentTime = 0;
      modalVideo.classList.remove('active');
    }
  });
});

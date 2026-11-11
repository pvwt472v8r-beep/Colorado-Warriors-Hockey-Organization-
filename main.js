// Shared header and footer so navigation is edited in one place.
const NAV = [
  ['index.html', 'Home'],
  ['our-story.html', 'Our Story'],
  ['play.html', 'Play'],
  ['support.html', 'Support Us'],
  ['photos.html', 'Photos'],
];

const page = location.pathname.split('/').pop() || 'index.html';
const cur = file => (file === page ? ' aria-current="page"' : '');

document.querySelector('[data-header]').outerHTML = `
<header class="site-header${document.body.dataset.solid ? ' solid' : ''}">
  <div class="container nav">
    <a href="index.html" class="logo" aria-label="Colorado Warriors Hockey, home">
      <img src="image/Warriors Logo.jpg" alt="">
      <span>Colorado Warriors<small>Hockey</small></span>
    </a>
    <button class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="primary-navigation"><span></span></button>
    <ul class="nav-links" id="primary-navigation">
      ${NAV.map(([file, label]) => `<li><a href="${file}"${cur(file)}>${label}</a></li>`).join('')}
      <li><a href="support.html#shop">Shop</a></li>
      <li><a href="get-involved.html" class="btn"${cur('get-involved.html')}>Get Involved</a></li>
    </ul>
  </div>
</header>`;

document.querySelector('[data-footer]').outerHTML = `
<footer class="site-footer">
  <section class="footer-sponsors" aria-labelledby="footer-sponsors-heading">
    <div class="container">
      <p class="footer-sponsors__eyebrow">Proud supporters</p>
      <h2 class="footer-sponsors__heading" id="footer-sponsors-heading">Our sponsors</h2>
      <div class="footer-sponsors__logos">
        <a class="footer-sponsor footer-sponsor--peak" href="https://peaklandscapesllc.com/" target="_blank" rel="noopener noreferrer">
          <img src="image/Peak-Landscapes.jpg" alt="Peak Landscapes LLC">
        </a>
        <a class="footer-sponsor footer-sponsor--dark-art" href="https://operationhattrick.org/" target="_blank" rel="noopener noreferrer">
          <img src="image/Operation-Hat-Trick.jpg" alt="Operation Hat Trick">
        </a>
        <a class="footer-sponsor footer-sponsor--dark-art" href="https://www.beatonbrotherspropertyexperts.com/" target="_blank" rel="noopener noreferrer">
          <img src="image/Beaton-Brothers-2.jpg" alt="Beaton Brothers Property Experts">
        </a>
        <a class="footer-sponsor footer-sponsor--dark-art" href="https://sickmittshockey.com/" target="_blank" rel="noopener noreferrer">
          <img src="image/sickmitts-wht-logo.jpg" alt="Sickmitts">
        </a>
        <a class="footer-sponsor footer-sponsor--dark-art" href="https://urbaninterface.it.com" target="_blank" rel="noopener noreferrer">
          <img src="image/Urban-Interface.jpg" alt="Urban Interface">
        </a>
      </div>
    </div>
  </section>
  <section class="footer-follow container" aria-labelledby="footer-follow-heading">
    <h2 id="footer-follow-heading">Follow Us</h2>
    <div class="footer-social">
      <a href="https://www.instagram.com/colorado_warriors_hockey?psln=bXllNm9lZnlzdTZu" target="_blank" rel="noopener noreferrer" aria-label="Colorado Warriors Hockey on Instagram (opens in a new tab)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>
        </svg>
      </a>
      <a href="https://www.facebook.com/people/Colorado-Warriors-Hockey/61585638647465/?mibextid=wwXIfr&amp;rdid=58AlwcTXfV3Vj7is&amp;share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Btepu5Feq%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Colorado Warriors Hockey on Facebook (opens in a new tab)">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M14 8V6.5c0-.7.2-1 1.1-1H17V2h-2.8C11.2 2 10 3.7 10 6v2H7.5v3.5H10V22h4V11.5h2.7L17 8z"></path>
        </svg>
      </a>
    </div>
  </section>
  <div class="container footer-bottom">
    <p class="copyright">&copy; 2026 Colorado Warriors Hockey · 501(c)(3) nonprofit</p>
    <img class="footer-logo" src="image/Warriors Logo.jpg" alt="Colorado Warriors Hockey logo">
  </div>
</footer>`;

const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

const setMenuOpen = open => {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

toggle.addEventListener('click', () => {
  setMenuOpen(!links.classList.contains('open'));
});

links.addEventListener('click', event => {
  if (event.target.closest('a') && links.classList.contains('open')) setMenuOpen(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && links.classList.contains('open')) {
    setMenuOpen(false);
    toggle.focus();
  }
});

window.matchMedia('(max-width: 1100px)').addEventListener('change', event => {
  if (!event.matches) setMenuOpen(false);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

// Filter gallery photos by category.
const filterButtons = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryStatus = document.querySelector('.gallery-status');

if (filterButtons.length && galleryItems.length) {
  const updateGallery = filter => {
    let visibleCount = 0;

    galleryItems.forEach(item => {
      const visible = filter === 'all' || item.dataset.category === filter;
      item.hidden = !visible;

      if (visible) {
        visibleCount += 1;
        item.classList.add('in');
      }
    });

    if (galleryStatus) {
      galleryStatus.textContent = `${visibleCount} photo${visibleCount === 1 ? '' : 's'} shown`;
    }
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });

      updateGallery(button.dataset.filter);
    });
  });

  updateGallery('all');
}

// Browse the photos in the same category as the selected image.
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('.lightbox__image');
  const caption = lightbox.querySelector('.lightbox__caption');
  const error = lightbox.querySelector('.lightbox__error');
  const previous = lightbox.querySelector('.lightbox__prev');
  const next = lightbox.querySelector('.lightbox__next');
  const close = lightbox.querySelector('.lightbox__close');
  const stage = lightbox.querySelector('.lightbox__stage');
  let photos = [];
  let index = 0;
  let opener = null;

  const showPhoto = () => {
    const photo = photos[index];
    const thumbnail = photo.querySelector('img');
    const description = photo.closest('.gallery-item').querySelector('figcaption');
    image.hidden = false;
    error.hidden = true;
    image.alt = thumbnail.alt;
    caption.textContent = `${description ? description.textContent : thumbnail.alt} (${index + 1} of ${photos.length})`;
    image.src = photo.href;
    previous.disabled = photos.length < 2;
    next.disabled = photos.length < 2;
  };

  document.querySelector('.gallery').addEventListener('click', event => {
    const photo = event.target.closest('.gallery-photo');
    if (!photo || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const item = photo.closest('.gallery-item');
    photos = Array.from(galleryItems)
      .filter(candidate => !candidate.hidden && candidate.dataset.category === item.dataset.category)
      .map(candidate => candidate.querySelector('.gallery-photo'))
      .filter(candidate => candidate && candidate.querySelector('img'));
    index = photos.indexOf(photo);
    if (index < 0) return;
    event.preventDefault();
    opener = photo;
    showPhoto();
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
    close.focus();
  });

  image.addEventListener('error', () => {
    image.hidden = true;
    error.hidden = false;
  });
  previous.addEventListener('click', () => {
    index = (index - 1 + photos.length) % photos.length;
    showPhoto();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % photos.length;
    showPhoto();
  });
  close.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target === stage) lightbox.close();
  });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && !previous.disabled) {
      event.preventDefault();
      previous.click();
    } else if (event.key === 'ArrowRight' && !next.disabled) {
      event.preventDefault();
      next.click();
    }
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    if (opener) opener.focus();
  });
}

// Pause hero videos when offscreen and provide a visitor control.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.hero').forEach(hero => {
  const video = hero.querySelector('video');
  if (!video) {
    hero.classList.add('no-video');
    return;
  }

  const button = hero.querySelector('.video-toggle');
  let userPaused = reduceMotion;

  if (reduceMotion) video.pause();

  const syncButton = () => {
    button.textContent = video.paused ? 'Play video' : 'Pause video';
  };

  button.addEventListener('click', () => {
    userPaused = !video.paused;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    syncButton();
  });

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (userPaused) return;

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }

      syncButton();
    });
  }, { threshold: 0.25 }).observe(video);

  syncButton();
});

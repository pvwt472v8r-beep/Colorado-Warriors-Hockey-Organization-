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
    <button class="menu-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
    <ul class="nav-links">
      ${NAV.map(([file, label]) => `<li><a href="${file}"${cur(file)}>${label}</a></li>`).join('')}
      <li><a href="get-involved.html" class="btn"${cur('get-involved.html')}>Get Involved</a></li>
    </ul>
  </div>
</header>`;

document.querySelector('[data-footer]').outerHTML = `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <img class="footer-logo" src="image/Warriors Logo.jpg" alt="Colorado Warriors Hockey logo">
      <p>A nonprofit that brings disabled veterans together through hockey. Every skill level welcome.</p>
    </div>
    <div>
      <h3>Explore</h3>
      <ul>${NAV.map(([file, label]) => `<li><a href="${file}">${label}</a></li>`).join('')}
        <li><a href="get-involved.html">Get Involved</a></li>
      </ul>
    </div>
    <div>
      <h3>Contact</h3>
      <p>Colorado Springs &amp; Denver, CO<br>
        <a href="mailto:info@example.org">info@example.org</a><br>
        (719) 555-0100
      </p>
    </div>
  </div>
  <p class="copyright">&copy; 2026 Colorado Warriors Hockey · 501(c)(3) nonprofit</p>
</footer>`;

const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
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

const contactForm = document.querySelector('#contact-form');
const interest = document.querySelector('#interest');
const contactCc = document.querySelector('#contact-cc');
const contactSubmit = contactForm.querySelector('button[type="submit"]');

const contactRoutes = {
  'Playing hockey': {
    to: 'Stephan@coloradowarriorshockey.org',
    cc: 'HockeyOperations@Coloradowarriorshockey.org'
  },
  'Volunteering': { to: 'DirectorofBusinessOps@coloradowarriorshockey.org' },
  'Sponsoring the team': { to: 'DirectorofFundraising@coloradowarriorshockey.org' },
  'Donating': { to: 'DirectorofFundraising@coloradowarriorshockey.org' },
  'Something else': {
    to: 'Stephan@coloradowarriorshockey.org',
    cc: 'HockeyOperations@Coloradowarriorshockey.org'
  }
};

contactForm.addEventListener('submit', event => {
  const route = Object.hasOwn(contactRoutes, interest.value) && contactRoutes[interest.value];
  if (!route) {
    event.preventDefault();
    interest.setCustomValidity('Please choose a valid interest.');
    interest.reportValidity();
    return;
  }

  contactForm.action = `https://formsubmit.co/${route.to}`;
  contactCc.disabled = !route.cc;
  contactCc.value = route.cc || '';
});

interest.addEventListener('change', () => interest.setCustomValidity(''));
contactSubmit.disabled = false;

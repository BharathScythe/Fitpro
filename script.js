// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Enquiry form -> opens WhatsApp with prefilled message to coach
const COACH_WHATSAPP = '916383621668'; // country code + number, no '+' or spaces

const form = document.getElementById('enquiryForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.hidden = true;
  status.className = 'form-status';

  const data = Object.fromEntries(new FormData(form).entries());

  // Honeypot — bots fill this; real users don't
  if (data.botcheck) return;

  if (!data.name || !data.email || !data.phone || !data.goal || !data.program) {
    status.textContent = 'Please fill in name, email, phone, goal and program.';
    status.classList.add('err');
    status.hidden = false;
    return;
  }

  // Build a clean WhatsApp message
  const lines = [
    '*New Fitness Enquiry — Shape Up*',
    '',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    data.age ? `*Age:* ${data.age}` : null,
    `*Goal:* ${data.goal}`,
    `*Program:* ${data.program}`,
  ];
  if (data.message && data.message.trim()) {
    lines.push('', '*Message:*', data.message.trim());
  }

  const text = encodeURIComponent(lines.filter(l => l !== null).join('\n'));
  const url = `https://wa.me/${COACH_WHATSAPP}?text=${text}`;

  status.innerHTML = '&#10003; Opening WhatsApp to send your enquiry...';
  status.classList.add('ok');
  status.hidden = false;

  window.open(url, '_blank', 'noopener');

  setTimeout(() => {
    form.reset();
    status.hidden = true;
  }, 4000);
});

// Smooth-scroll active highlight
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#fff';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => s && observer.observe(s));

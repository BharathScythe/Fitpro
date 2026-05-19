// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Enquiry form -> Web3Forms (https://web3forms.com)
// Replace the access_key value in index.html with your own from web3forms.com.
const form = document.getElementById('enquiryForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
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

  if (data.access_key === 'YOUR_WEB3FORMS_ACCESS_KEY' || !data.access_key) {
    status.innerHTML = 'Form not configured yet. Get a free access key at <a href="https://web3forms.com" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">web3forms.com</a> and paste it into index.html.';
    status.classList.add('err');
    status.hidden = false;
    return;
  }

  // Build a clean message body so the email reads nicely
  const lines = [
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    data.age ? `Age:     ${data.age}` : null,
    `Goal:    ${data.goal}`,
    `Program: ${data.program}`,
    '',
    'Message:',
    data.message || '(none)',
  ].filter(l => l !== null);
  data.message = lines.join('\n');
  data.subject = `New Fitness Enquiry — ${data.name} (${data.goal})`;
  data.replyto = data.email;

  submitBtn.disabled = true;
  const originalLabel = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (res.ok && json.success) {
      form.reset();
      status.innerHTML = '&#10003; Thank you! Your enquiry has been sent. Mohan will reply within a few hours.';
      status.classList.add('ok');
      status.hidden = false;
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    status.innerHTML = `Could not send right now. Please WhatsApp <a href="https://wa.me/916383621668" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">+91 63836 21668</a> directly.`;
    status.classList.add('err');
    status.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
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

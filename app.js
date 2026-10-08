const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const form = document.querySelector('#consultation-form');
const response = document.querySelector('#form-response');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const name = form.elements.name.value.trim();
  response.textContent = 'Saving your inquiry securely…';
  button.disabled = true;

  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const result = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.error || 'Unable to save inquiry');
    response.textContent = `Thanks${name ? `, ${name}` : ''}. Your inquiry is saved — we will reply with a clear next step.`;
    form.reset();
  } catch (error) {
    response.textContent = error.message || 'Something went wrong. Please try again.';
  } finally {
    button.disabled = false;
  }
});

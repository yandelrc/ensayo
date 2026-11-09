const themeToggle = document.getElementById('themeToggle');
const reflectionBtn = document.getElementById('reflectionBtn');
const reflectionForm = document.getElementById('reflectionForm');
const commitmentInput = document.getElementById('commitmentInput');
const savedCommitment = document.getElementById('savedCommitment');
const toast = document.getElementById('toast');
const isEnglish = document.documentElement.lang === 'en';

if (localStorage.getItem('essay-theme') === 'dark') {
  document.body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☾';
}
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('essay-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☾' : '☼';
});

const commitmentKey = `essay-commitment-${document.documentElement.lang}`;
const savedText = localStorage.getItem(commitmentKey);
if (savedText && savedCommitment) {
  savedCommitment.textContent = isEnglish
    ? `Your commitment: ${savedText}`
    : `Tu compromiso: ${savedText}`;
  savedCommitment.hidden = false;
  if (commitmentInput) commitmentInput.value = savedText;
}

reflectionBtn?.addEventListener('click', () => {
  const isExpanded = reflectionBtn.getAttribute('aria-expanded') === 'true';
  reflectionBtn.setAttribute('aria-expanded', String(!isExpanded));
  if (reflectionForm) reflectionForm.hidden = isExpanded;
  if (!isExpanded) commitmentInput?.focus();
});

commitmentInput?.addEventListener('input', () => commitmentInput.setCustomValidity(''));
reflectionForm?.addEventListener('submit', event => {
  event.preventDefault();
  const commitment = commitmentInput?.value.trim();
  if (!commitment || !savedCommitment) {
    commitmentInput?.setCustomValidity(isEnglish
      ? 'Please enter a habit before saving.'
      : 'Escribe un hábito antes de guardarlo.');
    commitmentInput?.reportValidity();
    return;
  }

  localStorage.setItem(commitmentKey, commitment);
  savedCommitment.textContent = isEnglish
    ? `Your commitment: ${commitment}`
    : `Tu compromiso: ${commitment}`;
  savedCommitment.hidden = false;
  if (reflectionForm) reflectionForm.hidden = true;
  reflectionBtn?.setAttribute('aria-expanded', 'false');
  if (commitmentInput) commitmentInput.value = commitment;
  toast.textContent = isEnglish ? 'Commitment saved. ✦' : 'Compromiso guardado. ✦';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3000);
});

// Highlight the section currently visible while scrolling.
const links = document.querySelectorAll('.side-link');
const sections = document.querySelectorAll('.section-heading');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-15% 0px -70% 0px' });
sections.forEach(section => observer.observe(section));

const progressBar = document.getElementById('scroll-progress');
const navLinks = document.querySelectorAll('.site-nav a');
const revealElements = document.querySelectorAll('.reveal');
const optionButtons = document.querySelectorAll('.option-card');
const resultCard = document.getElementById('copy-test-result');

function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('load', updateScrollProgress);

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver(
  (entries, observerRef) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observerRef.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((element) => observer.observe(element));

const copyInsights = {
  A: 'Option A is clear, but generic. It lacks friction-reducing details that help hesitant visitors decide quickly.',
  B: 'Great choice. Option B usually converts better because it removes risk with explicit reassurance: no card and no commitment.',
};

optionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.option;

    optionButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');

    resultCard.textContent = copyInsights[selected] || 'Thanks for your selection.';
  });
});

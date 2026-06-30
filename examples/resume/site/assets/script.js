// Sam Rivera — CV. Two tiny enhancements, no dependencies.

// 1) "Download PDF" opens the browser print dialog. The print stylesheet
//    formats the page as a clean one-page PDF (Save as PDF in the dialog).
const printBtn = document.getElementById('printBtn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// 2) Animate the proficiency meters into view the first time they're seen.
const fills = document.querySelectorAll('.meter__fill');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  fills.forEach((el) => el.classList.add('is-filled'));
} else {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-filled');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach((el) => io.observe(el));
}

// Print dialogs render meters at full width regardless of the animation state.
window.addEventListener('beforeprint', () => {
  fills.forEach((el) => el.classList.add('is-filled'));
});

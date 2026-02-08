/* ============================================================
   Summer Ave Studio — Portfolio Page Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Portfolio Filter ---
  const filters = document.querySelectorAll('.port-filter');
  const allCards = document.querySelectorAll('[data-category]');
  const countEl = document.getElementById('projectCount');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      allCards.forEach(card => {
        const cats = card.dataset.category || '';
        const match = filter === 'all' || cats.includes(filter);

        if (match) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          visible++;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.transition = 'opacity 0.3s ease';
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });

      if (countEl) {
        countEl.textContent = visible;
      }
    });
  });

  // --- Scroll Reveal ---
  const revealTargets = document.querySelectorAll(
    '.port-feature, .port-card, .port-editorial'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('[data-category]');
        let delay = 0;

        if (siblings.length > 1) {
          const idx = Array.from(siblings).indexOf(entry.target);
          delay = idx * 120;
        }

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));
});

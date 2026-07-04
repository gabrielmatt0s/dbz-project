function initFloatingNav() {
  var nav = document.querySelector('.floating-nav');
  if (!nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll('.floating-nav__link'));
  var sections = links
    .map(function (link) {
      return {
        link: link,
        section: document.getElementById(link.getAttribute('data-section'))
      };
    })
    .filter(function (entry) {
      return entry.section;
    });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var threshold = getThreshold();
  var ticking = false;
  var activeLink = null;

  function getThreshold() {
    var hero = document.getElementById('hero');
    if (hero && hero.offsetHeight > 0) {
      return hero.offsetHeight * 0.6;
    }
    if (window.innerHeight > 0) {
      return window.innerHeight * 0.6;
    }
    return 300;
  }

  function updateVisibility() {
    nav.classList.toggle('visible', window.scrollY >= threshold);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }

  function setActive(link) {
    if (activeLink === link) return;
    if (activeLink) activeLink.classList.remove('floating-nav__link--active');
    if (link) link.classList.add('floating-nav__link--active');
    activeLink = link;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    threshold = getThreshold();
    onScroll();
  });
  updateVisibility();

  if ('IntersectionObserver' in window && sections.length) {
    var visibleRatios = new Map();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visibleRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        var dominantLink = null;
        var bestRatio = 0;
        sections.forEach(function (entry) {
          var ratio = visibleRatios.get(entry.section) || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            dominantLink = entry.link;
          }
        });

        if (dominantLink) setActive(dominantLink);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(function (entry) {
      observer.observe(entry.section);
    });

    setActive(sections[0].link);
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.getElementById(link.getAttribute('data-section'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      setActive(link);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initFloatingNav();
});

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

function initHeroFigureKeying() {
  var figures = Array.prototype.slice.call(document.querySelectorAll('.hero__figure'));
  if (!figures.length) return;

  figures.forEach(function (figure) {
    var video = figure.querySelector('.hero__figure-source');
    var canvas = figure.querySelector('.hero__figure-canvas');
    if (!video || !canvas) return;

    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    var srcRect = null;

    function updateSrcRect() {
      if (!video.videoWidth || !video.videoHeight || !canvas.width || !canvas.height) return;
      var srcRatio = video.videoWidth / video.videoHeight;
      var dstRatio = canvas.width / canvas.height;
      if (srcRatio > dstRatio) {
        var sh = video.videoHeight;
        var sw = sh * dstRatio;
        srcRect = { sx: (video.videoWidth - sw) / 2, sy: 0, sw: sw, sh: sh };
      } else {
        var sw2 = video.videoWidth;
        var sh2 = sw2 / dstRatio;
        srcRect = { sx: 0, sy: (video.videoHeight - sh2) / 2, sw: sw2, sh: sh2 };
      }
    }

    function resize() {
      var rect = figure.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width));
      canvas.height = Math.max(1, Math.round(rect.height));
      updateSrcRect();
    }

    function drawFrame() {
      if (video.readyState >= 2 && srcRect) {
        ctx.drawImage(video, srcRect.sx, srcRect.sy, srcRect.sw, srcRect.sh, 0, 0, canvas.width, canvas.height);
        try {
          var frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var data = frame.data;
          for (var i = 0; i < data.length; i += 4) {
            var luma = (data[i] + data[i + 1] + data[i + 2]) / 765;
            var alpha = luma * 6 - 0.9;
            data[i + 3] = alpha <= 0 ? 0 : alpha >= 1 ? 255 : Math.round(alpha * 255);
          }
          ctx.putImageData(frame, 0, 0);
        } catch (e) {
          /* keying unsupported in this context — raw frame stays visible */
        }
      }

      if (typeof video.requestVideoFrameCallback === 'function') {
        video.requestVideoFrameCallback(drawFrame);
      } else {
        window.requestAnimationFrame(drawFrame);
      }
    }

    video.addEventListener('loadedmetadata', updateSrcRect);
    window.addEventListener('resize', resize);
    resize();

    video.play().catch(function () {});

    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(drawFrame);
    } else {
      window.requestAnimationFrame(drawFrame);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initFloatingNav();
  initHeroFigureKeying();
});

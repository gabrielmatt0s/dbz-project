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

function initHeroScrollCinematic() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var hero = document.getElementById('hero');
  if (!hero) return;

  var posterLines = hero.querySelectorAll('.hero__poster-line');
  if (!posterLines.length) return;

  gsap.registerPlugin(ScrollTrigger);

  var mm = gsap.matchMedia();

  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', function () {
    gsap.from(posterLines, {
      yPercent: 60,
      opacity: 0,
      filter: 'blur(10px)',
      stagger: 0.14,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.15
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=90%',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    tl.fromTo('.hero__figure--goku, .hero__goku-glow', { xPercent: 0 }, {
      xPercent: -120,
      ease: 'power2.in',
      duration: 1
    }, 0);

    tl.fromTo('.hero__figure--goku', { scale: 1 }, {
      scale: 0.55,
      transformOrigin: 'left bottom',
      ease: 'power2.in',
      duration: 1
    }, 0);

    tl.fromTo('.hero__figure--freeza, .hero__freeza-glow', { xPercent: 0 }, {
      xPercent: 120,
      ease: 'power2.in',
      duration: 1
    }, 0);

    tl.fromTo('.hero__figure--freeza', { scale: 1 }, {
      scale: 0.55,
      transformOrigin: 'right bottom',
      ease: 'power2.in',
      duration: 1
    }, 0);

    tl.fromTo('.hero__bg-video', { scale: 1 }, {
      scale: 1.18,
      ease: 'none',
      duration: 1
    }, 0);

    tl.fromTo('.hero__poster', { yPercent: 0, scale: 1 }, {
      yPercent: -10,
      scale: 1.18,
      ease: 'none',
      duration: 1
    }, 0);

    tl.to('.hero__poster', { opacity: 0, duration: 0.7 }, 0.1);

    tl.to('.hero__scroll', { opacity: 0, duration: 0.12 }, 0);

    return function () {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  });

  mm.add('(max-width: 767.98px) and (prefers-reduced-motion: no-preference)', function () {
    gsap.from(posterLines, {
      yPercent: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.15
    });

    var tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=80%',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    tlMobile.fromTo('.hero__figure--goku, .hero__goku-glow', { xPercent: 0 }, {
      xPercent: -120,
      ease: 'power2.in',
      duration: 1
    }, 0);

    tlMobile.fromTo('.hero__figure--goku', { scale: 1 }, {
      scale: 0.55,
      transformOrigin: 'left bottom',
      ease: 'power2.in',
      duration: 1
    }, 0);

    tlMobile.fromTo('.hero__figure--freeza, .hero__freeza-glow', { xPercent: 0 }, {
      xPercent: 120,
      ease: 'power2.in',
      duration: 1
    }, 0);

    tlMobile.fromTo('.hero__figure--freeza', { scale: 1 }, {
      scale: 0.55,
      transformOrigin: 'right bottom',
      ease: 'power2.in',
      duration: 1
    }, 0);

    tlMobile.fromTo('.hero__bg-video', { scale: 1 }, {
      scale: 1.12,
      ease: 'none',
      duration: 1
    }, 0);

    tlMobile.fromTo('.hero__poster', { yPercent: 0, scale: 1 }, {
      yPercent: -8,
      scale: 1.12,
      ease: 'none',
      duration: 1
    }, 0);

    tlMobile.to('.hero__poster', { opacity: 0, duration: 0.7 }, 0.1);

    tlMobile.to('.hero__scroll', { opacity: 0, duration: 0.12 }, 0);

    return function () {
      tlMobile.scrollTrigger && tlMobile.scrollTrigger.kill();
      tlMobile.kill();
    };
  });
}

function initHeroScrollButton() {
  var button = document.querySelector('.hero__scroll');
  if (!button) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function animatedScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var diff = targetY - startY;
    if (!diff) return;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutQuad(progress));
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  button.addEventListener('click', function (event) {
    var href = button.getAttribute('href') || '';
    var target = document.querySelector(href) || document.getElementById('personagens');
    if (!target) return;

    event.preventDefault();
    var targetY = target.getBoundingClientRect().top + window.scrollY;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
    } else {
      animatedScrollTo(targetY, 1200);
    }
  });
}

function initJornadaScroll() {
  var section = document.getElementById('saga');
  if (!section) return;

  var viewport = section.querySelector('.jornada__viewport');
  var track = section.querySelector('.jornada__track');
  var fill = section.querySelector('.jornada__timeline-fill');
  var counter = section.querySelector('[data-jornada-current]');
  var label = section.querySelector('.jornada__hud-label');
  var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.jornada__card')) : [];
  if (!viewport || !track || !cards.length) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var defaultLabel = label ? label.textContent : '';
  var introPanel = track.querySelector('.jornada__panel--intro');

  // Escolhe o elemento (painel de abertura OU capitulo) cujo CENTRO esta
  // mais proximo do centro do viewport no ponto atual do scroll — assim o
  // numero/label em cima so troca quando um card de fato assume o foco
  // visual, em vez de pular pro capitulo 1 enquanto o painel de abertura
  // ainda esta ocupando a tela. Retorna -1 enquanto o painel de abertura
  // for o mais proximo (nenhum capitulo em foco ainda).
  function currentChapterIndex(progress, distance, viewportWidth) {
    if (progress >= 1) return cards.length - 1;

    var viewportCenter = progress * distance + viewportWidth / 2;
    var winnerIndex = -1;
    var closestDelta = introPanel
      ? Math.abs((introPanel.offsetLeft + introPanel.offsetWidth / 2) - viewportCenter)
      : Infinity;

    // No inicio do scroll, wide viewports conseguem encaixar o painel de
    // abertura inteiro + o card 1 na mesma tela, o que faz o card 2 (ou
    // alem) parecer "mais centralizado" nessa conta — mas nesse instante
    // ainda nao faz sentido pular pro capitulo 2. Entao em progress 0 so
    // comparamos o painel de abertura contra o capitulo 1.
    var candidateCards = progress <= 0 ? cards.slice(0, 1) : cards;

    candidateCards.forEach(function (card, i) {
      var cardCenter = card.offsetLeft + card.offsetWidth / 2;
      var delta = Math.abs(cardCenter - viewportCenter);
      if (delta < closestDelta) {
        closestDelta = delta;
        winnerIndex = i;
      }
    });

    return winnerIndex;
  }

  function setChapterHud(chapterCard) {
    if (counter) {
      var chapter = chapterCard.getAttribute('data-chapter');
      if (chapter) counter.textContent = ('0' + chapter).slice(-2);
    }
    if (label) {
      var title = chapterCard.querySelector('.jornada__card-title');
      label.textContent = title ? title.textContent : defaultLabel;
    }
  }

  function setIntroHud() {
    if (counter) {
      var firstChapter = cards[0].getAttribute('data-chapter');
      if (firstChapter) counter.textContent = ('0' + firstChapter).slice(-2);
    }
    if (label) label.textContent = defaultLabel;
  }

  function updateHud(progress, distance, viewportWidth) {
    if (fill) fill.style.setProperty('--progress', progress);

    var index = currentChapterIndex(progress, distance, viewportWidth);
    if (index === -1) {
      setIntroHud();
    } else {
      setChapterHud(cards[index]);
    }
  }

  function resetHud() {
    if (fill) fill.style.setProperty('--progress', 0);
    setIntroHud();
  }

  var mm = gsap.matchMedia();

  mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', function () {
    function getDistance() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    section.style.setProperty('--jornada-scroll-distance', getDistance() + 'px');
    updateHud(0, getDistance(), viewport.clientWidth);

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: function () { return '+=' + getDistance(); },
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: function () {
          section.style.setProperty('--jornada-scroll-distance', getDistance() + 'px');
        },
        onUpdate: function (self) {
          updateHud(self.progress, getDistance(), viewport.clientWidth);
        }
      }
    });

    tl.to(track, {
      x: function () { return -getDistance(); },
      ease: 'none'
    });

    return function () {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      gsap.set(track, { clearProps: 'x' });
      section.style.removeProperty('--jornada-scroll-distance');
      resetHud();
    };
  });

  mm.add('(max-width: 768.98px), (prefers-reduced-motion: reduce)', function () {
    resetHud();
  });
}

function initTrailersCarousel() {
  var section = document.getElementById('trailers');
  if (!section) return;

  var slides = Array.prototype.slice.call(section.querySelectorAll('.trailers__slide'));
  var dots = Array.prototype.slice.call(section.querySelectorAll('.trailers__dot'));
  var prevBtn = section.querySelector('.trailers__arrow--prev');
  var nextBtn = section.querySelector('.trailers__arrow--next');
  var container = section.querySelector('.trailers__container');
  var liveRegion = document.getElementById('trailers-carousel-live');

  if (!slides.length) return;

  var currentIndex = slides.findIndex(function (slide) {
    return slide.classList.contains('trailers__slide--active');
  });
  if (currentIndex === -1) currentIndex = 0;

  function loadSlide(slide) {
    var iframe = slide.querySelector('.trailers__iframe');
    if (!iframe) return;
    var src = iframe.getAttribute('data-src');
    if (src) iframe.setAttribute('src', src);
  }

  function unloadSlide(slide) {
    var iframe = slide.querySelector('.trailers__iframe');
    if (!iframe) return;
    iframe.setAttribute('src', 'about:blank');
  }

  function announce(index) {
    if (!liveRegion) return;
    var title = slides[index].querySelector('.trailers__video-title');
    var label = title ? title.textContent : '';
    liveRegion.textContent = 'Slide ' + (index + 1) + ' de ' + slides.length + (label ? ': ' + label : '');
  }

  function setDotState(index, isActive) {
    var dot = dots[index];
    if (!dot) return;
    dot.classList.toggle('trailers__dot--active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    dot.setAttribute('tabindex', isActive ? '0' : '-1');
  }

  function goTo(index, focusDot) {
    var nextIndex = ((index % slides.length) + slides.length) % slides.length;
    if (nextIndex === currentIndex) return;

    var previousSlide = slides[currentIndex];
    var nextSlide = slides[nextIndex];

    previousSlide.classList.remove('trailers__slide--active');
    unloadSlide(previousSlide);

    nextSlide.classList.add('trailers__slide--active');
    loadSlide(nextSlide);

    setDotState(currentIndex, false);
    setDotState(nextIndex, true);

    currentIndex = nextIndex;
    announce(currentIndex);

    if (focusDot && dots[currentIndex]) dots[currentIndex].focus();
  }

  dots.forEach(function (dot, index) {
    dot.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
    dot.addEventListener('click', function () {
      goTo(index);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(currentIndex + 1);
    });
  }

  if (container) {
    container.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goTo(currentIndex - 1, true);
          break;
        case 'ArrowRight':
          event.preventDefault();
          goTo(currentIndex + 1, true);
          break;
        case 'Home':
          event.preventDefault();
          goTo(0, true);
          break;
        case 'End':
          event.preventDefault();
          goTo(slides.length - 1, true);
          break;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initFloatingNav();
  initHeroFigureKeying();
  initHeroScrollCinematic();
  initHeroScrollButton();
  initJornadaScroll();
  initTrailersCarousel();
});

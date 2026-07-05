# trailers-section-spec.md

## 1. Objetivo

Exibir um carrossel de 4 vídeos do YouTube (melhores momentos da Saga do Freeza) com navegação por setas, dots indicadores e suporte a teclado. Lazy loading real: apenas o slide ativo carrega o iframe; demais slides usam `about:blank`. Acessibilidade total (ARIA live region, tabs, teclado).

---

## 2. Inventário

### Textos (cópia exata)
- **Eyebrow:** "Assista agora"
- **Título:** "Melhores momentos"
- **Subtítulo:** "A batalha de Goku contra Freeza em Namekusei"
- **Texto decorativo (fundo):** "TRAILERS" (grande, semi-transparente)

### Vídeos (4 slides, ordem)
1. `c7jvWOfwc1M`
2. `CE5RQyafYaE`
3. `WXJN3ZPFW2o`
4. `anFoJ9WOkWQ`

### Elementos Visuais (do print)
- **Card do vídeo:** moldura arredondada com gradiente dourado/laranja
- **Logo Crunchyroll:** ícone circular no canto superior esquerdo
- **Título do vídeo:** "Goku Goes Super Saiyan for the First Time | Dragon Ball Z"
- **Fonte:** "Crunchyroll"
- **Play button:** ícone YouTube vermelho centralizado
- **CTA:** "Assista no YouTube"
- **Navegação:** seta esquerda + 4 dots + seta direita
- **Fundo:** degradado marrom escuro → azul escuro

---

## 3. HTML (Árvore e Classes)

```html
<section id="trailers" class="trailers">
  <!-- Cabeçalho -->
  <div class="trailers__header">
    <p class="trailers__eyebrow">ASSISTA AGORA</p>
    <h2 class="trailers__title">Melhores momentos</h2>
    <p class="trailers__subtitle">A batalha de Goku contra Freeza em Namekusei</p>
  </div>

  <!-- Fundo decorativo -->
  <div class="trailers__backdrop-text" aria-hidden="true">TRAILERS</div>

  <!-- Container do carrossel -->
  <div class="trailers__container">
    <!-- Track (lista) -->
    <ul class="trailers__track" role="region" aria-label="Carrossel de trailers">
      
      <!-- Slide 1 -->
      <li id="trailers-slide-1" class="trailers__slide trailers__slide--active" data-index="0">
        <div class="trailers__card">
          <div class="trailers__header-card">
            <img src="[logo-crunchyroll]" alt="" class="trailers__logo" />
            <div>
              <h3 class="trailers__video-title">Goku Goes Super Saiyan for the First Time | Dragon Ball Z</h3>
              <p class="trailers__video-source">Crunchyroll</p>
            </div>
          </div>
          <div class="trailers__player">
            <iframe
              class="trailers__iframe"
              title="Goku Goes Super Saiyan for the First Time | Dragon Ball Z"
              data-src="https://www.youtube-nocookie.com/embed/c7jvWOfwc1M"
              src="https://www.youtube-nocookie.com/embed/c7jvWOfwc1M"
              width="560"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <p class="trailers__cta">Assista no <img src="[youtube-logo]" alt="YouTube" class="trailers__yt-logo" /></p>
        </div>
      </li>

      <!-- Slide 2 -->
      <li id="trailers-slide-2" class="trailers__slide" data-index="1">
        <div class="trailers__card">
          <div class="trailers__header-card">
            <img src="[logo-crunchyroll]" alt="" class="trailers__logo" />
            <div>
              <h3 class="trailers__video-title">[Título Vídeo 2]</h3>
              <p class="trailers__video-source">Crunchyroll</p>
            </div>
          </div>
          <div class="trailers__player">
            <iframe
              class="trailers__iframe"
              title="[Título Vídeo 2]"
              data-src="https://www.youtube-nocookie.com/embed/CE5RQyafYaE"
              src="about:blank"
              width="560"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <p class="trailers__cta">Assista no <img src="[youtube-logo]" alt="YouTube" class="trailers__yt-logo" /></p>
        </div>
      </li>

      <!-- Slide 3 -->
      <li id="trailers-slide-3" class="trailers__slide" data-index="2">
        <div class="trailers__card">
          <div class="trailers__header-card">
            <img src="[logo-crunchyroll]" alt="" class="trailers__logo" />
            <div>
              <h3 class="trailers__video-title">[Título Vídeo 3]</h3>
              <p class="trailers__video-source">Crunchyroll</p>
            </div>
          </div>
          <div class="trailers__player">
            <iframe
              class="trailers__iframe"
              title="[Título Vídeo 3]"
              data-src="https://www.youtube-nocookie.com/embed/WXJN3ZPFW2o"
              src="about:blank"
              width="560"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <p class="trailers__cta">Assista no <img src="[youtube-logo]" alt="YouTube" class="trailers__yt-logo" /></p>
        </div>
      </li>

      <!-- Slide 4 -->
      <li id="trailers-slide-4" class="trailers__slide" data-index="3">
        <div class="trailers__card">
          <div class="trailers__header-card">
            <img src="[logo-crunchyroll]" alt="" class="trailers__logo" />
            <div>
              <h3 class="trailers__video-title">[Título Vídeo 4]</h3>
              <p class="trailers__video-source">Crunchyroll</p>
            </div>
          </div>
          <div class="trailers__player">
            <iframe
              class="trailers__iframe"
              title="[Título Vídeo 4]"
              data-src="https://www.youtube-nocookie.com/embed/anFoJ9WOkWQ"
              src="about:blank"
              width="560"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <p class="trailers__cta">Assista no <img src="[youtube-logo]" alt="YouTube" class="trailers__yt-logo" /></p>
        </div>
      </li>

    </ul>

    <!-- Controles -->
    <div class="trailers__controls">
      <!-- Seta esquerda -->
      <button
        class="trailers__arrow trailers__arrow--prev"
        aria-label="Vídeo anterior"
        type="button"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <!-- Dots indicadores -->
      <div class="trailers__dots" role="tablist" aria-label="Navegação de slides">
        <button
          id="trailers-dot-1"
          class="trailers__dot trailers__dot--active"
          role="tab"
          aria-selected="true"
          aria-controls="trailers-slide-1"
          type="button"
          aria-label="Ir para slide 1"
        ></button>
        <button
          id="trailers-dot-2"
          class="trailers__dot"
          role="tab"
          aria-selected="false"
          aria-controls="trailers-slide-2"
          type="button"
          aria-label="Ir para slide 2"
        ></button>
        <button
          id="trailers-dot-3"
          class="trailers__dot"
          role="tab"
          aria-selected="false"
          aria-controls="trailers-slide-3"
          type="button"
          aria-label="Ir para slide 3"
        ></button>
        <button
          id="trailers-dot-4"
          class="trailers__dot"
          role="tab"
          aria-selected="false"
          aria-controls="trailers-slide-4"
          type="button"
          aria-label="Ir para slide 4"
        ></button>
      </div>

      <!-- Seta direita -->
      <button
        class="trailers__arrow trailers__arrow--next"
        aria-label="Próximo vídeo"
        type="button"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Live region -->
  <div id="trailers-carousel-live" aria-live="polite" aria-atomic="true" class="sr-only"></div>

</section>
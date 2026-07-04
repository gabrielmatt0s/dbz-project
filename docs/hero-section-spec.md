# Hero Section Spec

## 1) Objetivo

Especificar a Hero como composicao de poster para **Dragon Ball Z - A Saga de Freeza**, usando somente os elementos visiveis no print anexado e as regras do `DESIGN.md`.

Resultado esperado:

- Fundo em video de destruicao de Namekusei.
- Goku Super Saiyajin a esquerda.
- Freeza a direita.
- Glows decorativos amarelo/laranja e roxo.
- Bloco central de texto do poster.
- Indicador de scroll para `#personagens`.

Nao adicionar botoes, badges, textos, icones, ornamentos, particulas ou elementos que nao aparecam no print ou que nao estejam listados como asset obrigatorio neste spec.

## 2) Inventario visual item a item

1. Fundo visual
   - Cenario de destruicao de Namekusei.
   - Terreno escuro, rochoso e devastado.
   - Horizonte com silhuetas de montanhas.
   - Ceu dramatico alaranjado com nuvens densas.
   - Iluminacao quente central no horizonte.
   - Areas avermelhadas no solo, sugerindo brasas/lava.

2. Goku
   - Goku Super Saiyajin posicionado na lateral esquerda.
   - Figura parcialmente cortada pela borda esquerda e inferior.
   - Perfil voltado para a direita, olhando para Freeza.
   - Cabelo amarelo intenso com aura/energia quente.
   - Classe obrigatoria: `.hero__figure--goku`.

3. Freeza
   - Freeza posicionado na lateral direita.
   - Figura parcialmente cortada pela borda direita e inferior.
   - Perfil voltado para a esquerda, olhando para Goku.
   - Aura/energia roxa ao redor da figura.
   - Classe obrigatoria: `.hero__figure--freeza`.

4. Glows decorativos
   - Glow quente associado ao Goku.
   - Glow roxo associado ao Freeza.
   - Classes obrigatorias: `.hero__goku-glow` e `.hero__freeza-glow`.
   - Ambos com `aria-hidden`.

5. Overlay dramatico
   - Escurecimento geral para legibilidade do texto central.
   - Vinheta lateral/inferior percebida no print.
   - Deve preservar o contraste entre fundo, personagens e poster.

6. Poster central
   - Alinhamento central horizontal.
   - Conteudo posicionado acima do centro vertical exato.
   - Hierarquia: pill, titulo linha 1, titulo linha 2, tagline.

7. Pill
   - Texto: "A Saga Lendária".
   - Pill estreita, escura/translucida, com cantos totalmente arredondados.
   - Texto com aparencia condensada, em caixa alta visual, com destaque laranja.

8. Titulo
   - Linha 1: "Dragon Ball Z".
   - Linha 2: "A Saga de Freeza".
   - Linha 1 branca.
   - Linha 2 amarela/dourada.
   - Ambas com peso visual forte, escala de poster e sombra para leitura.

9. Tagline
   - Texto: "A batalha que forjou uma lenda".
   - Texto pequeno, branco, condensado, centralizado, em caixa alta visual.

10. Indicador de scroll
    - Texto: "Role para começar".
    - Link para `#personagens`.
    - Label pequeno centralizado e circulo abaixo com seta/chevron para baixo.
    - Nao adicionar outro CTA.

11. Linha inferior
    - Ha uma linha/barra muito fina na base do print, com pequeno trecho laranja proximo ao centro.
    - Suposicao a confirmar: pode ser artefato do navegador/player ou indicador externo ao layout da Hero. Nao implementar como elemento da Hero sem confirmacao.

## 3) HTML (arvore/classes)

Arvore sem codigo implementavel, apenas estrutura e classes esperadas:

- `section.hero`
- `.hero__bg`
- `.hero__bg-video`
  - video de fundo com autoplay, loop, muted, playsinline e preload auto
- `.hero__overlay`
- `.hero__goku-glow`
- `.hero__freeza-glow`
- `.hero__figures`
- `.hero__figure.hero__figure--goku`
  - video do Goku com autoplay, loop, muted, playsinline e preload auto
- `.hero__figure.hero__figure--freeza`
  - video do Freeza com autoplay, loop, muted, playsinline e preload auto
- `.hero__overlay-front`
- `.hero__poster`
- `.hero__pill`
- `.hero__title`
- `.hero__title-line.hero__title-line--main`
- `.hero__title-line.hero__title-line--saga`
- `.hero__tagline`
- `.hero__scroll`
- `.hero__scroll-label`
- `.hero__scroll-icon`

Observacoes:

- `.hero__scroll` e o unico link/acao da Hero e deve apontar para `#personagens`.
- `.hero__scroll-icon` representa apenas o circulo com chevron para baixo visivel no print.
- Nao incluir navegacao, CTA secundario, logo, contador, badge extra ou ornamentos adicionais.

## 4) Camadas

Ordem obrigatoria das camadas, do fundo para a frente:

1. Fundo
   - Video `assets/videos/hero-bg-namekusei.mp4`.
   - Deve ocupar toda a area da Hero.

2. Overlay
   - Veu dramatico para escurecer a cena e sustentar leitura.
   - Usar somente `--bg-overlay` e tokens de texto/acento do `:root`.

3. Glows
   - `.hero__goku-glow` associado ao lado esquerdo.
   - `.hero__freeza-glow` associado ao lado direito.
   - Decorativos e sem impacto semantico.

4. Videos
   - Video do Goku sobre o lado esquerdo.
   - Video do Freeza sobre o lado direito.
   - Devem preservar a composicao de confronto vista no print.

5. Overlay-front
   - Camada frontal sutil para reforcar contraste do poster e vinheta inferior/lateral.
   - Nao deve ocultar os personagens.

6. Poster
   - Pill, titulo e tagline centralizados.
   - Deve ficar acima dos personagens na pilha visual para leitura.

7. Seta
   - Indicador de scroll centralizado no rodape visual da Hero.
   - Deve permanecer separado do poster.

## 5) Tokens

Usar somente tokens declarados no `:root` do `DESIGN.md`. Nao criar cores, sombras, fontes ou tokens novos para a Hero.

Mapeamento obrigatorio:

- Fundo base e fallback: `--bg-deep`.
- Overlay principal: `--bg-overlay`.
- Texto principal da linha 1, tagline e label de scroll: `--text-primary`.
- Texto secundario apenas se necessario para estados discretos: `--text-muted` ou `--text-faint`.
- Pill e detalhes quentes: `--accent-star`, `--accent-star-dim`, `--accent-star-glow`.
- Linha 2 do titulo: `--cosmic-rose`.
- Glow/energia de Freeza: `--cosmic-purple`.
- Foco acessivel: `--ring-focus`.
- Bordas sutis, caso necessarias no circulo da seta ou pill: `--border-subtle` ou `--border-strong`.
- Fonte do h1 completo: `--font-hero-stamp`.
- Fonte da pill, tagline e scroll label: `--font-hero-saga`.
- Movimento/easing, se houver: `--ease-out-expo` e `--ease-spring`.

Regras de tipografia:

- `.hero__title`, `.hero__title-line--main` e `.hero__title-line--saga`: `--font-hero-stamp`.
- `.hero__pill`, `.hero__tagline` e `.hero__scroll-label`: `--font-hero-saga`.
- A Hero nao usa `--font-display` no h1.
- A aparencia em caixa alta do print deve ser tratamento visual, mantendo a copy especificada neste documento.

## 6) Assets mapeados

1. Fundo
   - Funcao: video de fundo da destruicao de Namekusei.
   - Caminho: `assets/videos/hero-bg-namekusei.mp4`.
   - Tipo: `video/mp4`.
   - Elemento esperado: video com autoplay, loop, muted, playsinline e preload auto.
   - Classe sugerida na arvore: `.hero__bg-video`.

2. Goku
   - Funcao: figura esquerda flutuando.
   - Caminho: `assets/videos/goku-hero.mp4`.
   - Tipo: `video/mp4`.
   - Elemento esperado: video com autoplay, loop, muted, playsinline e preload auto.
   - Classe obrigatoria: `.hero__figure--goku`.

3. Freeza
   - Funcao: figura direita flutuando.
   - Caminho: `assets/videos/freeza-hero.mp4`.
   - Tipo: `video/mp4`.
   - Elemento esperado: video com autoplay, loop, muted, playsinline e preload auto.
   - Classe obrigatoria: `.hero__figure--freeza`.

4. Glow do Goku
   - Funcao: reforco decorativo quente no lado esquerdo.
   - Elemento obrigatorio: `.hero__goku-glow`.
   - Acessibilidade: `aria-hidden`.

5. Glow do Freeza
   - Funcao: reforco decorativo roxo no lado direito.
   - Elemento obrigatorio: `.hero__freeza-glow`.
   - Acessibilidade: `aria-hidden`.

## 7) Suposicoes

- Suposicao a confirmar: a copy deve permanecer exatamente como informada no pedido ("A Saga Lendária", "Dragon Ball Z", "A Saga de Freeza", "A batalha que forjou uma lenda", "Role para começar"), mesmo que o print apresente alguns textos em caixa alta visual.
- Suposicao a confirmar: a barra fina inferior visivel no print nao pertence a Hero e nao deve ser implementada como elemento proprio.
- Suposicao a confirmar: o circulo com seta abaixo do label de scroll pode ser representado por um chevron visual simples, desde que nao seja tratado como CTA adicional.
- Suposicao a confirmar: o efeito de flutuacao dos videos de Goku e Freeza deve ser discreto, mantendo as posicoes do print.

## 8) Responsividade

Desktop:

- Manter composicao de confronto: Goku preso ao lado esquerdo e Freeza ao lado direito.
- Poster central deve permanecer legivel sobre o fundo, sem colidir com os rostos.
- Titulo em duas linhas conforme o print: linha 1 "Dragon Ball Z", linha 2 "A Saga de Freeza".
- Indicador de scroll fica centralizado na parte inferior da Hero.

Tablet:

- Preservar os personagens nas laterais, aceitando cortes maiores nas bordas.
- Reduzir a escala visual do poster apenas o necessario para evitar sobreposicao.
- Manter a linha 2 do titulo em `--cosmic-rose`.

Mobile:

- Evitar overflow horizontal.
- Manter o poster central como prioridade de leitura.
- Goku e Freeza podem ficar mais recortados nas laterais para preservar o confronto.
- Se nao houver espaco para os personagens completos, priorizar rostos/perfis e glows conforme o print.
- O link de scroll deve continuar apontando para `#personagens`.

## 9) Comportamentos

Estado estatico:

- Videos em loop, sem audio e sem controles visiveis.
- Hero ocupa a primeira dobra.
- Poster central sempre visivel.
- Glows decorativos nao recebem foco e nao sao anunciados por leitores de tela.
- Link de scroll e o unico elemento interativo da Hero.

Pronto para o scroll da secao 7:

- `.hero__scroll` aponta para `#personagens`, a proxima secao definida no `DESIGN.md`.
- O indicador pode ter movimento sutil de bob, conforme o `DESIGN.md`, usando somente tokens de motion do `:root`.
- Em `prefers-reduced-motion: reduce`, remover bob/flutuacao e manter o conteudo estatico.
- Preparar a estrutura para que GSAP/ScrollTrigger possa animar entrada/saida da Hero sem exigir elementos extras.

## 10) Checklist

- [ ] Nenhum texto alem dos cinco textos definidos aparece na Hero.
- [ ] Copy transcrita exatamente conforme este spec.
- [ ] Fundo usa `assets/videos/hero-bg-namekusei.mp4`.
- [ ] Goku usa `assets/videos/goku-hero.mp4` e classe `.hero__figure--goku`.
- [ ] Freeza usa `assets/videos/freeza-hero.mp4` e classe `.hero__figure--freeza`.
- [ ] `.hero__goku-glow` existe e esta com `aria-hidden`.
- [ ] `.hero__freeza-glow` existe e esta com `aria-hidden`.
- [ ] Camadas seguem a ordem: fundo, overlay, glows, videos, overlay-front, poster, seta.
- [ ] H1 usa `--font-hero-stamp`.
- [ ] Pill, tagline e scroll label usam `--font-hero-saga`.
- [ ] Linha 1 do titulo usa `--text-primary`.
- [ ] Linha 2 do titulo usa `--cosmic-rose`.
- [ ] Seta/scroll usa `--accent-star` e/ou tokens de borda do `:root`.
- [ ] Nenhuma cor fora do `:root` foi criada.
- [ ] Nenhum token novo foi criado.
- [ ] Nao ha CTA adicional, logo, nav, badge extra, particulas ou ornamento fora do print.
- [ ] O link de scroll aponta para `#personagens`.
- [ ] Mobile nao gera overflow horizontal.

## 11) Aceitacao

A Hero sera aceita quando:

- A primeira dobra reproduzir a composicao do print: Goku a esquerda, Freeza a direita, fundo de Namekusei destruido e poster central.
- Todos os textos aparecerem exatamente como especificado:
  - "A Saga Lendária"
  - "Dragon Ball Z"
  - "A Saga de Freeza"
  - "A batalha que forjou uma lenda"
  - "Role para começar"
- Nenhum texto, botao, badge, icone, ornamento ou asset adicional for introduzido.
- Todos os assets obrigatorios estiverem mapeados e posicionados em suas funcoes.
- A camada visual respeitar a ordem definida neste spec.
- O design usar somente tokens do `:root` descritos no `DESIGN.md`.
- O indicador de scroll funcionar como link para `#personagens`.
- A composicao permanecer legivel e sem sobreposicoes incoerentes em desktop, tablet e mobile.

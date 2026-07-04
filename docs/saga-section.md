# Jornada Section Spec

## 1) Objetivo

Especificar a seção **A Saga** (`#saga`, classe base `jornada`) como uma jornada horizontal animada por GSAP/ScrollTrigger, fiel aos prints anexados e ao `DESIGN.md`.

Fonte da verdade: **prints da seção "A Saga" + copy listada neste documento**. Não adicionar textos, rótulos, botões, descrições, imagens, badges ou ornamentos que não estejam nos prints ou no `DESIGN.md`.

Comportamento principal:

- O primeiro painel/card de abertura ocupa **100% da largura e 100% da altura da viewport**.
- Ao rolar, a viewport fica pinada e o trilho se move no eixo X com scrub.
- Os cards de capítulos com imagens aparecem em sequência horizontal.
- Em mobile, a experiência cai para coluna vertical, sem pin horizontal e sem overflow lateral.
- Toda cor, fonte, sombra, borda, espaçamento, raio, tamanho e motion devem usar tokens definidos em `:root`.

## 2) Inventário

### Textos fixos

- `A JORNADA EM NAMEKUSEI`
- `DBZ`
- `PERSONAGENS`
- `TRAILERS`
- `A SAGA`
- `01/06`
- `02/06`
- `A Saga do Freeza`
- `A BATALHA QUE FORJOU UMA LENDA`
- `ROLE PARA ATRAVESSAR`

### Capítulos

Capítulo 01:

- Eyebrow: `CAPÍTULO 01`
- Título: `Chegada em Namekusei`
- Texto: `Gohan, Kuririn e Bulma viajam até o distante planeta Namekusei em busca das Esferas do Dragão para reviver seus amigos — mas Freeza e seus soldados já estão lá com o mesmo objetivo.`

Capítulo 02:

- Eyebrow: `CAPÍTULO 02`
- Título: `O Esquadrão Ginyu ataca`
- Texto: `Freeza convoca a temida força de elite. O Capitão Ginyu troca de corpo com Goku, e só a astúcia dos Guerreiros Z impede o desastre antes da chegada do verdadeiro perigo.`

Capítulo 03:

- Eyebrow: `CAPÍTULO 03`
- Título: `A morte de Kuririn`
- Texto: `No auge da batalha, Freeza assassina Kuririn diante de Goku. A perda do amigo de toda uma vida acende uma fúria capaz de despertar uma lenda adormecida.`

Capítulo 04:

- Eyebrow: `CAPÍTULO 04`
- Título: `O Despertar do Super Saiyajin`
- Texto: `Cabelos dourados, aura flamejante: pela primeira vez em mil anos, um Saiyajin alcança a transformação lendária. Goku enfim encara Freeza de igual para igual.`

Capítulo 05:

- Eyebrow: `CAPÍTULO 05`
- Título: `A Batalha Final`
- Texto: `Goku Super Saiyajin contra Freeza em 100% de seu poder. Um confronto colossal que define o destino do universo enquanto Namekusei se desfaz a cada golpe.`

Capítulo 06:

- Eyebrow: `CAPÍTULO 06`
- Título: `A destruição de Namekusei`
- Texto: `Com o planeta à beira da explosão, Goku enfrenta seus últimos instantes contra o tirano e prova que a esperança — e a coragem — sempre encontram um caminho.`

### Elementos visuais

- Fundo cósmico escuro em degradê azul/roxo, com textura sutil.
- Halo/gradiente quente discreto na região inferior central.
- Traços grandes e translúcidos de ideogramas/símbolos ao fundo.
- Navegação superior central em formato de cápsula, com divisórias internas e item `A SAGA` ativo.
- Rótulo superior esquerdo `A JORNADA EM NAMEKUSEI`.
- HUD superior direito com contador no formato `01/06`, `02/06`, etc.
- Linha horizontal de progresso/timeline atravessando a tela.
- Fill da timeline na cor de acento.
- Esferas do Dragão sobre a timeline, uma por capítulo, com brilho/halo.
- Hastes verticais curtas abaixo das esferas.
- Numerais grandes translúcidos ao fundo: `01`, `02`, `03`, `04`, `05`, `06`.
- Painel inicial com título `A Saga do Freeza`, subtítulo e chamada de scroll.
- Seta laranja ao lado de `ROLE PARA ATRAVESSAR`.
- Cards de capítulos com fundo escuro translúcido, borda fina e destaque colorido no topo.
- Imagem do planeta Namekusei no capítulo 01.
- Imagem do Esquadrão Ginyu reunido no capítulo 02.
- Imagem de Freeza ao lado de Kuririn gritando no capítulo 03.
- Imagem de Goku Super Saiyajin com aura dourada no capítulo 04.
- Imagem de batalha energética entre Goku e Freeza no capítulo 05.
- Imagem de Namekusei/planeta em destruição no espaço no capítulo 06.

## 3) HTML

Não gerar markup final neste spec. A estrutura esperada deve prever GSAP/ScrollTrigger e separar conteúdo, HUD e trilho animável.

Estrutura semântica:

- Seção raiz: `section#saga.jornada`, com `aria-labelledby` apontando para o título principal.
- Camada fixa/pinável: wrapper interno responsável por ocupar a viewport no desktop.
- Background da seção: camada própria para gradiente, textura, ideogramas translúcidos e numerais parallax.
- HUD da jornada:
  - label superior esquerdo com `A JORNADA EM NAMEKUSEI`;
  - contador superior direito com valor dinâmico `01/06` até `06/06`;
  - timeline horizontal com trilho, fill e seis marcadores de Esfera do Dragão.
- Trilho horizontal:
  - primeiro painel: painel de abertura em viewport cheia;
  - seis painéis/cards de capítulo, cada um com imagem, eyebrow, título e descrição.
- Navegação superior:
  - se a navegação global já existir, ela apenas aparece sobre a seção com `A SAGA` ativo;
  - se a seção precisar declarar o estado visual, usar somente os textos `DBZ`, `PERSONAGENS`, `TRAILERS`, `A SAGA`.

Painel de abertura:

- Deve ser o primeiro item do trilho.
- Deve ocupar uma viewport inteira no desktop.
- Deve conter somente:
  - eyebrow `A JORNADA EM NAMEKUSEI`;
  - título `A Saga do Freeza`;
  - subtítulo `A BATALHA QUE FORJOU UMA LENDA`;
  - chamada `ROLE PARA ATRAVESSAR`;
  - seta visual.

Cards de capítulo:

- Cada card deve ser uma unidade de conteúdo independente.
- Cada card deve expor um índice lógico de 1 a 6 para o contrato JS.
- Cada card deve receber `--ch-accent` conforme o capítulo.
- A imagem fica no topo do card; abaixo entram eyebrow, título e descrição.
- O conteúdo textual deve ser exatamente o inventário deste spec.

## 4) CSS por bloco

### Base da seção

Desktop:

- A seção deve ocupar altura suficiente para o pin horizontal definido pelo JS.
- O wrapper pinável deve ocupar `100vh`.
- O fundo deve cobrir toda a viewport durante o pin.
- O trilho horizontal deve ser organizado em linha, sem quebra.
- O primeiro painel deve ocupar `100vw` e `100vh`.
- Os cards seguintes devem aparecer como painéis horizontais espaçados, alinhados visualmente na metade inferior da viewport, como nos prints.

Mobile:

- A seção vira fluxo vertical.
- O wrapper deixa de ser pinável.
- O trilho vira coluna.
- O painel de abertura ocupa a largura disponível e altura mínima confortável, sem forçar overflow horizontal.
- Cards ocupam a largura disponível em coluna única.

### Fundo e atmosfera

- Usar somente tokens de `:root` para cores e opacidades.
- O fundo deve combinar `--bg-deep`, `--bg-mid`, `--bg-overlay`, `--cosmic-purple`, `--cosmic-cyan`, `--accent-star-dim` e/ou `--accent-star-glow`.
- Ideogramas/símbolos devem ser decorativos, translúcidos e não interativos.
- Numerais gigantes devem ficar atrás da timeline e dos cards, com baixa opacidade.
- Nenhum elemento decorativo pode disputar leitura com título, HUD ou cards.

### HUD

Desktop:

- O label `A JORNADA EM NAMEKUSEI` fica no topo esquerdo.
- O contador fica no topo direito.
- A timeline atravessa horizontalmente a viewport na região superior.
- O fill acompanha o progresso do scroll.
- As Esferas do Dragão ficam alinhadas à timeline, com glow controlado.

Mobile:

- O HUD deve ser simplificado para leitura vertical.
- A timeline pode virar indicador compacto/vertical ou permanecer como barra horizontal no topo da seção, desde que não cause overflow.
- O contador continua visível e atualizado.

### Painel de abertura

- Layout desktop deve posicionar o bloco de texto à esquerda/centro-esquerda, com respiro amplo.
- `Freeza` no título deve receber tratamento de acento conforme tokens do design.
- Título deve usar `--font-display`, pois a seção não é a Hero global.
- Eyebrow, subtítulo e chamada de scroll devem usar estilo de utility label em caixa alta.
- A seta é visual, sem criar novo texto.

### Trilho e cards

Desktop:

- O trilho deve ser o único elemento movido no eixo X pelo JS.
- Cards devem ter largura estável por token de jornada e não depender do conteúdo para dimensionar.
- O espaçamento entre painéis deve ser constante e tokenizado.
- Cards devem manter proporção visual semelhante aos prints: imagem no topo, texto abaixo, borda fina, topo com filete de acento.

Mobile:

- Cards empilham em coluna.
- Imagens mantêm proporção definida por token.
- Títulos e descrições não devem truncar copy.

### Imagens

- Todas as imagens devem ter dimensão/aspect-ratio estável.
- Usar `object-fit: cover`.
- Não aplicar filtros que descaracterizem o conteúdo dos prints.
- Cada imagem deve ter texto alternativo descritivo baseado no inventário visual, sem acrescentar informação narrativa nova.

### Estados e foco

- Estados de foco devem usar `--ring-focus`.
- Elementos não clicáveis não devem receber foco.
- Se a timeline tiver marcadores interativos, eles precisam ter foco visível e nome acessível com o capítulo correspondente.

## 5) Tokens

Regra obrigatória: CSS da seção deve consumir somente variáveis do `:root`. Não usar cores, fontes, medidas principais, shadows, easings ou opacidades hardcoded nos blocos da seção.

Tokens globais permitidos pelo `DESIGN.md`:

- Fontes: `--font-body`, `--font-display`, `--font-hero-stamp`, `--font-hero-saga`.
- Cores base: `--bg-deep`, `--bg-mid`, `--bg-surface`, `--bg-surface-raised`, `--bg-overlay`.
- Texto: `--text-primary`, `--text-muted`, `--text-faint`.
- Acentos: `--accent-star`, `--accent-star-dim`, `--accent-star-glow`, `--cosmic-cyan`, `--cosmic-purple`, `--cosmic-rose`.
- Bordas/foco: `--border-subtle`, `--border-strong`, `--ring-focus`.
- Motion: `--ease-out-expo`, `--ease-spring`.

Tokens de jornada, todos definidos em `:root`:

- Breakpoint e layout: `--jornada-bp`, `--jornada-gap`, `--jornada-panel-width`, `--jornada-card-radius`.
- Mídia: `--jornada-media-ratio`, `--jornada-media-radius`.
- Texto: `--jornada-desc-maxw`, `--jornada-fs-heading`, `--jornada-fs-desc`, `--jornada-fs-counter`.
- Timeline/HUD: `--jornada-rail-weight`, `--jornada-dot-size`, `--jornada-hud-maxw`, `--jornada-timeline-mobile`.
- Decorativos: `--jornada-numeral-opacity`, `--jornada-numeral-size`, `--jornada-numeral-size-mobile`, `--jornada-kanji-opacity`.
- Motion runtime: `--jornada-parallax-strength`, `--jornada-scrub-lerp`, `--jornada-reveal-y`.
- Runtime setado por JS: `--x`, `--px`, `--progress`.

Mapeamento de `--ch-accent`:

- Capítulo 01: `--cosmic-cyan`
- Capítulo 02: `--cosmic-purple`
- Capítulo 03: `--accent-star`
- Capítulo 04: `--cosmic-rose`
- Capítulo 05: `--cosmic-cyan`
- Capítulo 06: `--accent-star`

## 6) Contrato JS: pin + trilho X com scrub, HUD (fill + counter), parallax dos numerais, revelação por capítulo

### Pin + trilho X com scrub

- Ativar ScrollTrigger somente em desktop/tablet acima de `--jornada-bp`.
- O trigger é a seção `#saga`.
- O elemento pinado é o wrapper interno da jornada.
- O elemento animado no eixo X é apenas o trilho horizontal.
- A distância horizontal deve ser calculada pela diferença entre a largura total do trilho e a largura da viewport.
- O scrub deve ser contínuo e suave, respeitando `--jornada-scrub-lerp`.
- O JS deve atualizar `--x`, `--px` e `--progress` na seção raiz para sincronizar CSS, HUD e efeitos.
- Ao sair de desktop para mobile, matar/recriar ScrollTrigger e limpar transforms inline que possam gerar overflow.

### HUD: fill + counter

- O fill da timeline lê `--progress` ou recebe escala horizontal proporcional ao progresso.
- O contador exibe o capítulo ativo no formato `NN/06`.
- O capítulo ativo é calculado a partir da posição do trilho ou do painel mais próximo do centro da viewport.
- O contador deve iniciar em `01/06`.
- O contador deve terminar em `06/06`.
- Marcadores da timeline refletem estado: passado, ativo e futuro, sem criar textos visíveis novos.

### Parallax dos numerais

- Cada numeral grande (`01` a `06`) se move em ritmo diferente do card correspondente.
- Movimento deve usar apenas `transform` e opacidade.
- O parallax não pode prejudicar leitura dos cards.
- Em `prefers-reduced-motion: reduce`, numerais ficam estáticos.

### Revelação por capítulo

- Cada capítulo revela card, imagem e textos quando entra na zona ativa.
- Revelação deve usar `opacity` e `transform` com deslocamento baseado em `--jornada-reveal-y`.
- A animação não deve alterar dimensões dos cards.
- Uma vez revelado, o conteúdo pode permanecer visível para evitar flicker durante scrub reverso.
- Em mobile, a revelação pode ser feita por IntersectionObserver ou removida em reduced motion.

## 7) Responsividade/acessibilidade

Responsividade:

- Mobile abaixo de `--jornada-bp`: layout vertical obrigatório.
- Não deve existir overflow horizontal em mobile.
- Textos devem quebrar linha naturalmente, sem truncamento.
- Cards e imagens precisam ter dimensões estáveis para evitar layout shift.
- O painel de abertura deve continuar sendo o primeiro bloco da experiência.
- A timeline e o HUD não podem cobrir conteúdo legível em telas pequenas.

Acessibilidade:

- `section#saga` deve ter nome acessível pelo título `A Saga do Freeza`.
- A ordem DOM deve seguir a ordem narrativa: abertura, capítulo 01, capítulo 02, capítulo 03, capítulo 04, capítulo 05, capítulo 06.
- Elementos decorativos devem ser ignorados por tecnologia assistiva.
- Imagens devem ter alt text curto e fiel ao que aparece visualmente.
- O contador visual não deve ser a única forma de compreender a ordem; cada card traz `CAPÍTULO NN`.
- Respeitar `prefers-reduced-motion: reduce`: sem pin scrub, sem parallax, sem revelações obrigatórias.
- Contraste deve seguir os tokens de texto do design: `--text-primary`, `--text-muted`, `--text-faint`.

## 8) Checklist

- A seção usa `#saga` e classe base `jornada`.
- O primeiro painel ocupa viewport inteira no desktop.
- O scroll horizontal só acontece em desktop/tablet acima de `--jornada-bp`.
- Mobile usa coluna vertical e não tem overflow horizontal.
- O trilho horizontal é o único elemento deslocado em X pelo JS.
- HUD contém label, timeline/fill, marcadores e contador.
- Counter usa formato `01/06` até `06/06`.
- Numerais `01` a `06` aparecem grandes, translúcidos e ao fundo.
- Cada capítulo usa exatamente a copy definida no inventário.
- Cada capítulo tem imagem, eyebrow, título e descrição.
- Cada capítulo usa `--ch-accent` conforme o mapeamento.
- Cards têm borda, fundo escuro translúcido e filete superior colorido.
- Todas as cores e medidas principais vêm de tokens do `:root`.
- Nenhum texto, botão, CTA, badge ou elemento visual extra foi adicionado.
- `prefers-reduced-motion` remove pin, scrub e parallax.
- Navegação superior mantém `A SAGA` como item ativo quando visível.

## 9) Aceitação

A implementação será aceita quando:

- Comparada aos prints, a seção reproduzir a mesma composição geral: fundo cósmico, HUD superior, timeline com esferas, numerais ao fundo, painel inicial e cards horizontais.
- O primeiro estado mostrar o painel `A Saga do Freeza` ocupando a viewport, com o primeiro card de capítulo aparecendo à direita como nos prints.
- Ao rolar no desktop, a viewport permanecer pinada enquanto os cards avançam horizontalmente.
- O HUD atualizar fill e contador conforme o capítulo ativo.
- Os capítulos 01 a 06 aparecerem na ordem correta, com copy exata.
- Em mobile, a mesma narrativa aparecer em coluna vertical sem scroll lateral.
- A seção usar apenas tokens definidos em `:root`.
- A experiência funcionar com GSAP/ScrollTrigger sem depender de valores hardcoded no JS que deveriam ser tokens.
- Com `prefers-reduced-motion: reduce`, o conteúdo permanecer totalmente acessível e legível sem animações.

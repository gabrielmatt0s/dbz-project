# Nav Section Spec

## 1) Objetivo

A navegacao flutuante deve funcionar como uma barra fixa de acesso rapido as secoes principais, sem introduzir itens novos.

Itens visiveis, na ordem solicitada:
- `DBZ`
- `PERSONAGENS`
- `A SAGA`
- `TRAILERS`

Objetivos funcionais:
- Permanecer fixa sobre o conteudo, centralizada horizontalmente no topo da viewport.
- Ficar oculta no topo da pagina e fazer reveal somente apos o usuario ultrapassar o threshold de scroll.
- Navegar por ancoras internas para as secoes correspondentes.
- Atualizar o link ativo conforme a secao dominante na viewport.
- Preservar o clima do DESIGN.md: superficie cosmica elevada, contraste alto, brilho controlado, motion em `transform` e `opacity`.

Mapeamento de ancoras:
- `DBZ` aponta para `#hero`.
- `PERSONAGENS` aponta para `#personagens`.
- `A SAGA` aponta para `#saga`.
- `TRAILERS` aponta para `#trailers`.

## 2) Estrutura HTML

A estrutura deve ser semantica, compacta e previsivel:
- Container principal com classe base `.floating-nav`.
- Lista de navegacao em `ul`.
- Cada item clicavel dentro de um `li`.
- Cada link recebe `data-section` com o id da secao sem `#`.
- Separadores visuais entre itens devem existir como elementos dedicados com `aria-hidden="true"`.
- A navegacao deve ter rotulo acessivel, por exemplo via `aria-label`.

Contrato estrutural:
- O `ul` e a unica lista da nav.
- Cada `li` contem um link ou um separador.
- Links usam exatamente os textos definidos neste spec.
- Separadores aparecem somente entre itens, nunca antes do primeiro ou depois do ultimo.
- Nao adicionar CTA, icones, dropdowns, logo expandido, labels auxiliares ou itens que nao aparecem na navegacao definida.

## 3) Estados

Estado inicial no topo:
- `.floating-nav` permanece visualmente oculta.
- Deve usar `opacity` e `transform` para a transicao.
- Deve evitar bloquear cliques do conteudo enquanto oculta, usando o estado de interacao apropriado.

Estado visivel:
- Ao passar do threshold, adicionar `.visible` na nav.
- `.visible` revela a barra com fade e leve deslocamento vertical.
- A transicao usa `--ease-out-expo`, coerente com o motion do DESIGN.md.

Estado ativo:
- O link ativo recebe `.floating-nav__link--active`.
- O ativo deve destacar apenas o link correspondente a secao atual.
- A cor do texto ativo usa `--accent-star`.
- Links inativos usam `--text-faint` ou `--text-muted`, mantendo contraste suficiente sobre a superficie.
- Hover pode aproximar o inativo de `--text-primary` e/ou usar fundo suave com `--accent-star-dim`.

## 4) Estilos por Bloco Mapeados a Tokens

`.floating-nav`:
- Posicao fixa no topo, acima das secoes e midias.
- Fundo baseado em `--bg-surface-raised` com tratamento translucido usando apenas tokens existentes.
- Quando houver overlay, usar `--bg-overlay` como referencia de veus escuros.
- Borda com `--border-strong` ou `--border-subtle`.
- Texto padrao em `--text-muted`.
- Sombra/brilho somente com `--accent-star-glow`, com intensidade controlada.
- `backdrop-filter` deve aplicar blur discreto, preservando legibilidade.
- `z-index` deve ser alto o suficiente para ficar acima da Hero, videos, personagens e jornada horizontal, mas sem criar uma escala paralela de camadas. Documentar o valor escolhido junto da implementacao.

`.floating-nav__list`:
- Layout horizontal.
- Alinhamento central.
- Sem bullets.
- Espacamento compacto, com respiro lateral suficiente para manter o formato pill visto no print.

`.floating-nav__item`:
- Deve manter a ordem visual definida: `DBZ`, `PERSONAGENS`, `A SAGA`, `TRAILERS`.
- Nao deve carregar cor propria; a cor vem do link ou separador.

`.floating-nav__link`:
- Fonte `--font-body`.
- Caixa alta.
- Letter spacing com `--ls-label`.
- Peso entre 600 e 700, em linha com utility labels do DESIGN.md.
- Cor inativa em `--text-faint` ou `--text-muted`.
- Cor ativa em `--accent-star`.
- Fundo de hover, quando usado, em `--accent-star-dim`.
- Transicoes em `color`, `background-color`, `opacity` e `transform`, usando `--ease-out-expo`.

`.floating-nav__separator`:
- Linha vertical curta, discreta.
- Cor derivada de `--border-subtle`.
- Deve ter `aria-hidden="true"` e nao receber foco.
- Altura visual semelhante ao print: menor que a altura total da barra.

Contraste:
- O texto ativo em `--accent-star` precisa permanecer legivel sobre a superficie elevada.
- O item `DBZ`, se tratado como link inativo no topo da nav, deve continuar visivel sem competir com o ativo.
- Nenhum estado deve depender apenas de brilho; cor, peso e/ou opacidade devem sustentar a leitura.

## 5) Comportamento JS

Threshold de reveal:
- Calcular com base na altura do `#hero`.
- Formula: altura do `#hero` multiplicada por `0.6`.
- Fallback quando `#hero` nao existir ou nao tiver altura confiavel: `window.innerHeight * 0.6`.
- Fallback final: `300`.

Reveal:
- Enquanto `window.scrollY` for menor que o threshold, a nav permanece sem `.visible`.
- Quando `window.scrollY` for maior ou igual ao threshold, adicionar `.visible`.
- Atualizar o estado tambem em `resize`, pois a altura da Hero pode mudar.

Links e ancoras:
- Cada link usa seu `data-section` para localizar a secao.
- A navegacao deve fazer scroll suave apenas se o comportamento global do projeto permitir e respeitar `prefers-reduced-motion`.
- O hash pode ser atualizado se isso ja for padrao do projeto; caso contrario, evitar comportamento extra.

Link ativo:
- Usar observacao de secoes ou calculo por posicao de scroll para definir a secao atual.
- Apenas um `.floating-nav__link--active` por vez.
- A secao ativa deve corresponder ao link cujo `data-section` referencia a secao dominante na viewport.
- Se nenhuma secao estiver dominante, manter o ultimo ativo valido ou cair para `hero`, conforme a posicao de scroll.

Performance:
- Eventos de scroll devem ser leves.
- Preferir `requestAnimationFrame` para consolidar leituras/escritas visuais se o projeto nao usar `IntersectionObserver`.
- Nao animar propriedades de layout para reveal; usar `transform` e `opacity`.

## 6) Responsividade e Foco

Desktop:
- Nav centralizada no topo, em formato pill.
- Itens permanecem em uma unica linha.
- Separadores visiveis entre todos os itens.

Mobile:
- A nav deve caber na largura da viewport sem overflow horizontal.
- Reduzir gaps, padding e tamanho de fonte por tokens/escala existente, sem criar cores novas.
- Manter todos os itens definidos acessiveis.
- Se a largura ficar critica, permitir compactacao de espacamento antes de esconder itens.
- Nao transformar em menu hamburguer, pois isso introduz comportamento e visual ausentes do print.

Foco:
- Links devem receber estilo `:focus-visible`.
- O foco usa `--ring-focus`.
- O foco deve ter contraste claro contra `--bg-surface-raised`/`--bg-overlay`.
- O outline nao deve ser removido sem substituto visivel.
- Separadores nao entram na ordem de tab.

Motion reduzido:
- Em `prefers-reduced-motion: reduce`, remover slide e manter apenas troca instantanea ou fade minimo.
- Scroll suave deve ser desativado ou substituido por navegacao instantanea.

## 7) Checklist de Implementacao

- Criar a estrutura `.floating-nav` com `ul > li`.
- Inserir somente os quatro links: `DBZ`, `PERSONAGENS`, `A SAGA`, `TRAILERS`.
- Mapear `data-section` para `hero`, `personagens`, `saga`, `trailers`.
- Inserir separadores com `aria-hidden="true"` somente entre links.
- Estilizar a barra com tokens do `:root`: `--bg-surface-raised`, `--bg-overlay`, `--border-subtle`, `--border-strong`, `--text-muted`, `--text-faint`, `--text-primary`, `--accent-star`, `--accent-star-dim`, `--accent-star-glow`, `--ring-focus`, `--font-body`, `--ls-label`, `--ease-out-expo`.
- Implementar estado oculto no topo e `.visible` apos threshold.
- Calcular threshold como `#hero.offsetHeight * 0.6`, com fallback para `innerHeight * 0.6` e depois `300`.
- Implementar atualizacao de link ativo por secao.
- Verificar foco por teclado com `Tab` e `Shift+Tab`.
- Verificar `prefers-reduced-motion`.
- Testar desktop, tablet e mobile sem overflow horizontal.
- Confirmar que nenhum item extra foi adicionado.

## 8) Criterios de Aceitacao Visuais

- A nav aparece como uma pill flutuante cosmica, coerente com `Cosmic Surface Raised`.
- A barra fica oculta no topo da pagina e surge apos o scroll definido pelo threshold.
- O reveal combina fade e deslocamento sutil, sem salto de layout.
- A ordem visual corresponde a sequencia solicitada: `DBZ`, `PERSONAGENS`, `A SAGA`, `TRAILERS`.
- O item ativo usa `--accent-star`, como o destaque laranja do print anexado.
- Links inativos ficam mais discretos, mas ainda legiveis.
- Separadores sao linhas verticais finas e discretas entre os itens.
- A borda da pill usa contraste sutil, sem criar cor fora do design system.
- O blur nao compromete a leitura dos links.
- A nav permanece acima da Hero, videos e secoes animadas.
- Em mobile, todos os itens continuam acessiveis em uma linha e sem corte de texto.
- O foco visivel e claro, com `--ring-focus`, sem deslocar o layout.
- A implementacao nao introduz novos tokens de cor, novas secoes, novos links ou variacoes visuais fora do DESIGN.md.

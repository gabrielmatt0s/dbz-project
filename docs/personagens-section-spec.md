# personagens-section-spec.md

> **Fonte da verdade:** print fornecido pelo usuário + DESIGN.md.

------------------------------------------------------------------------

# 1. Objetivo

Construir a seção **Personagens** representando os principais
personagens da Saga de Namekusei.

A composição deve reproduzir a estética observada no print:

-   fundo com grade tecnológica;
-   personagens "flutuando" em posições livres;
-   nenhuma estrutura de cards;
-   nenhuma galeria;
-   nenhuma malha em grid para os personagens;
-   foco visual totalmente na composição espacial.

Todo o visual deve seguir os tokens existentes definidos no `:root` do
DESIGN.md. Não criar novas cores, fontes ou espaçamentos.

------------------------------------------------------------------------

# 2. Inventário

## Header

### Eyebrow

`OS GUERREIROS Z`

### Título

`Personagens`

### Subtítulo

`OS HERÓIS E VILÕES DA BATALHA EM NAMEKUSEI`

------------------------------------------------------------------------

## Background

Obrigatório:

``` html
<div class="personagens__particles-bg">
    <div id="personagens-grid" class="personagens__grid"></div>
</div>
```

O HTML apenas disponibiliza o container.

A geração da grade, blips e animações pertence ao JavaScript.

------------------------------------------------------------------------

## Assets obrigatórios

  Classe                Arquivo                           Caption
  --------------------- --------------------------------- ---------------
  personagem--goku      assets/images/goku-perso.png      Goku
  personagem--vegeta    assets/images/vegeta-perso.png    Vegeta
  personagem--gohan     assets/images/gohan-perso.png     Gohan
  personagem--kuririn   assets/images/kuririn-perso.png   Kuririn
  personagem--ginyu     assets/images/ginyu-perso.png     Capitão Ginyu
  personagem--freeza    assets/images/freeza-perso.png    Freeza
  personagem--piccolo   assets/images/piccolo-perso.png   Piccolo
  personagem--dodoria   assets/images/dodoria-perso.png   Dodoria
  personagem--zarbon    assets/images/zarbon-perso.png    Zarbon

------------------------------------------------------------------------

# 3. HTML (árvore / classes)

``` text
section.personagens

    div.personagens__particles-bg
        div#personagens-grid.personagens__grid

    div.personagens__container

        header.personagens__header

            p.personagens__eyebrow
            h2.personagens__title
            p.personagens__subtitle

        div.personagens__stage

            figure.personagem.personagem--goku
            figure.personagem.personagem--vegeta
            figure.personagem.personagem--gohan
            figure.personagem.personagem--kuririn
            figure.personagem.personagem--ginyu
            figure.personagem.personagem--freeza
            figure.personagem.personagem--piccolo
            figure.personagem.personagem--dodoria
            figure.personagem.personagem--zarbon

Cada figure contém:

- img loading="lazy"
- figcaption
```

------------------------------------------------------------------------

# 4. Camadas

1.  **Background** --- grade tecnológica, radar, blips e glow.
2.  **Header** --- eyebrow, título e subtítulo centralizados.
3.  **Stage** --- nove personagens em composição livre.

------------------------------------------------------------------------

# 5. Tokens

Utilizar exclusivamente tokens do `:root` do DESIGN.md.

-   Cores
    -   --bg-deep
    -   --bg-mid
    -   --text-primary
    -   --text-muted
    -   --accent-star
    -   --cosmic-rose
    -   --border-subtle
-   Fontes
    -   --font-display
    -   --font-body
-   Motion
    -   --ease-out-expo
    -   --ease-spring

Nenhuma cor hardcoded.

------------------------------------------------------------------------

# 6. Suposições

-   Não existem botões.
-   Não existem links.
-   Não existem ícones.
-   Não existem descrições.
-   Apenas o nome abaixo de cada personagem.

------------------------------------------------------------------------

# 7. Responsividade

Desktop: - composição livre.

Tablet: - manter composição irregular.

Mobile: - abandonar posicionamento absoluto; - fluxo vertical simples; -
evitar sobreposição.

------------------------------------------------------------------------

# 8. Trilho

A seção deve possuir altura suficiente para:

-   composição completa;
-   fundo animado;
-   parallax.

------------------------------------------------------------------------

# 9. Checklist

-   [ ] Eyebrow correta.
-   [ ] Título correto.
-   [ ] Subtítulo correto.
-   [ ] 9 figures.
-   [ ] loading="lazy" em todas.
-   [ ] Fundo apenas com container da grade.
-   [ ] Nenhum botão.
-   [ ] Nenhum card.
-   [ ] Apenas tokens do :root.

------------------------------------------------------------------------

# 10. Aceitação (anti-regressão)

-   [ ] Não é grid.
-   [ ] Não é mosaico.
-   [ ] Não é galeria.
-   [ ] Personagens espalhados em quadrantes diferentes.
-   [ ] ≥3 escalas distintas.
-   [ ] Variação vertical clara.
-   [ ] Coordenadas independentes.
-   [ ] Header centralizado.
-   [ ] Fundo preenchido posteriormente pelo JavaScript.

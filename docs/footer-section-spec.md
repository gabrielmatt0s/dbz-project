# footer-section-spec.md

```markdown
# Footer Section — Specification

## 1. Objetivo
Seção de rodapé (`<footer>`) contendo o título da saga e disclaimer legal/educacional. Design minimalista com fundo escuro, texto centralizado e linha divisória superior.

---

## 2. Inventário de Conteúdo

### 2.1 Textos
- **Título:** "Dragon Ball Z: A Saga do Freeza"
- **Disclaimer:** "Projeto conceitual para fins educacionais. Dragon Ball, Dragon Ball Z e personagens relacionados são criação de Akira Toriyama e marcas registradas da Bird Studio / Shueisha e Toei Animation."

### 2.2 Links
- Nenhum link presente

### 2.3 Elementos Visuais
- Linha divisória horizontal superior (border-top)
- Fundo azul escuro/marinho
- Tipografia em cores claras para contraste
- Layout centralizado

---

## 3. Estrutura HTML Semântica

```html
<footer class="footer">
  <div class="footer__container">
    <h2 class="footer__title">Dragon Ball Z: A Saga do Freeza</h2>
    <p class="footer__disclaimer">
      Projeto conceitual para fins educacionais. Dragon Ball, Dragon Ball Z e personagens relacionados são criação de Akira Toriyama e marcas registradas da Bird Studio / Shueisha e Toei Animation.
    </p>
  </div>
</footer>
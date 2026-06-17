# 🚀 NovaEra — Landing Page Profissional

Landing page responsiva desenvolvida com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**, sem frameworks ou bibliotecas externas. Projeto criado para portfólio, demonstrando boas práticas de front-end.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🔗 Demo

> Adicione aqui o link após o deploy (Vercel/Netlify/GitHub Pages).

## ✨ Funcionalidades

- **Design responsivo** — adaptado para mobile, tablet e desktop (mobile-first com breakpoints em 480px, 768px e 968px)
- **Menu mobile** com animação de ícone hamburguer → X, bloqueio de scroll do body e fechamento via clique no link ou tecla `ESC`
- **Animações on-scroll** usando `IntersectionObserver` (mais performático que listeners de `scroll`)
- **Contadores animados** que sobem de 0 até o valor final quando entram na viewport (easing ease-out)
- **Formulário de contato** com validação client-side em tempo real (nome, e-mail com regex, mensagem com tamanho mínimo) e feedback visual de erro/sucesso
- **Header dinâmico** que ganha sombra ao rolar a página
- **Botão "voltar ao topo"** que aparece após determinado scroll
- Suporte a `prefers-reduced-motion` para acessibilidade

## 🗂️ Estrutura do projeto

```
landing-page/
├── index.html          # Estrutura semântica da página
├── css/
│   ├── reset.css        # Normalização entre navegadores
│   └── style.css        # Design tokens, layout e responsividade
├── js/
│   └── script.js         # Toda a interatividade, em funções isoladas
└── README.md
```

## 🧠 Decisões técnicas

- **HTML semântico**: uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` em vez de `<div>` genéricas, melhorando SEO e acessibilidade.
- **CSS organizado com Design Tokens**: cores, espaçamentos, sombras e transições centralizados em variáveis CSS (`:root`), facilitando manutenção e possíveis temas (dark mode, por exemplo).
- **JavaScript modular**: cada funcionalidade vive em sua própria função (`initHeaderScroll`, `initMobileMenu`, etc.), todas chamadas a partir de um único `DOMContentLoaded`, sem variáveis globais soltas.
- **Performance**: `IntersectionObserver` em vez de listeners de scroll para animações e contadores; `requestAnimationFrame` para a animação dos números.
- **Formulário sem backend**: a função `submitForm()` simula uma chamada assíncrona com `setTimeout` — é o ponto de entrada para plugar uma API real (Formspree, EmailJS, backend próprio etc.) futuramente.

## 🛠️ Como rodar localmente

Não precisa de instalação. Basta abrir o `index.html` no navegador, ou usar uma extensão como o **Live Server** (VS Code) para recarregamento automático.

```bash
git clone https://github.com/seu-usuario/landing-page-novaera.git
cd landing-page-novaera
# abra o index.html no navegador
```

## 📌 Possíveis melhorias futuras

- Integrar o formulário a um serviço real de envio de e-mails
- Adicionar testes de acessibilidade (axe, Lighthouse)
- Dark mode usando as variáveis CSS já estruturadas
- Internacionalização (i18n)

---

Desenvolvido como parte de um portfólio de front-end.

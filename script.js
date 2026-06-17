/* =========================================================
   NOVA ERA — LANDING PAGE
   JavaScript: menu mobile, scroll reveal, contadores,
   validação de formulário e botão voltar ao topo
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initContactForm();
  initBackToTop();
  initFooterYear();
});

/* ---------------------------------------------------------
   1. HEADER: adiciona sombra/borda após rolar a página
--------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const toggleHeaderClass = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  toggleHeaderClass();
  window.addEventListener('scroll', toggleHeaderClass, { passive: true });
}

/* ---------------------------------------------------------
   2. MENU MOBILE: abre/fecha o menu e trava o scroll do body
--------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!menuToggle || !nav) return;

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    menuToggle.classList.add('active');
    nav.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  menuToggle.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');
    isActive ? closeMenu() : openMenu();
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------------------------------------------------------
   3. SCROLL REVEAL: anima elementos com a classe .fade-in
   quando entram na viewport, usando IntersectionObserver
--------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  // Fallback para navegadores sem suporte
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   4. CONTADORES ANIMADOS: anima números de 0 até o valor
   definido em data-count quando entram na tela
--------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easing suave (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ---------------------------------------------------------
   5. FORMULÁRIO DE CONTATO: validação client-side
   (sem envio real — pronto para integrar com backend/API)
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => {
        if (!value.trim()) return 'Por favor, informe seu nome.';
        if (value.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        return '';
      },
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Por favor, informe seu e-mail.';
        if (!emailRegex.test(value.trim())) return 'Informe um e-mail válido.';
        return '';
      },
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => {
        if (!value.trim()) return 'Escreva uma mensagem para enviarmos seu pedido.';
        if (value.trim().length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
        return '';
      },
    },
  };

  const showError = (field, message) => {
    field.input.classList.toggle('invalid', Boolean(message));
    field.error.textContent = message;
  };

  // Validação em tempo real (ao sair do campo)
  Object.values(fields).forEach((field) => {
    field.input.addEventListener('blur', () => {
      const error = field.validate(field.input.value);
      showError(field, error);
    });

    field.input.addEventListener('input', () => {
      if (field.input.classList.contains('invalid')) {
        const error = field.validate(field.input.value);
        showError(field, error);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.values(fields).forEach((field) => {
      const error = field.validate(field.input.value);
      showError(field, error);
      if (error) isValid = false;
    });

    if (!isValid) {
      // Foca no primeiro campo inválido para acessibilidade
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitForm(form, fields);
  });
}

function submitForm(form, fields) {
  const submitBtn = form.querySelector('.form-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMsg = document.getElementById('formSuccess');

  const originalText = btnText.textContent;
  submitBtn.disabled = true;
  btnText.textContent = 'Enviando...';

  // Simula uma chamada assíncrona (substitua por fetch() para uma API real)
  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = originalText;

    successMsg.classList.add('show');
    form.reset();
    Object.values(fields).forEach((field) => {
      field.input.classList.remove('invalid');
      field.error.textContent = '';
    });

    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1200);
}

/* ---------------------------------------------------------
   6. BOTÃO VOLTAR AO TOPO
--------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  window.addEventListener(
    'scroll',
    () => {
      button.classList.toggle('show', window.scrollY > 480);
    },
    { passive: true }
  );

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   7. ANO DINÂMICO NO RODAPÉ
--------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

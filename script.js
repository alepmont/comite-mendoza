document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    document.querySelectorAll('#mainNav a').forEach((link) => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  (() => {
    const slides = document.querySelectorAll('.slide');
    const dotsWrap = document.getElementById('slideDots');

    if (!slides.length || !dotsWrap) return;

    let current = 0;
    let timer;

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(index));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      resetTimer();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    const nextButton = document.getElementById('nextSlide');
    const prevButton = document.getElementById('prevSlide');

    if (nextButton) nextButton.addEventListener('click', next);
    if (prevButton) prevButton.addEventListener('click', prev);

    resetTimer();
  })();

  (() => {
    const steps = document.querySelectorAll('.quiz-step');
    const progressWrap = document.getElementById('quizProgress');
    const final = document.getElementById('quizFinal');

    if (!steps.length || !progressWrap || !final) return;

    let current = 0;
    const answers = [];

    steps.forEach(() => {
      const seg = document.createElement('div');
      seg.className = 'seg';
      progressWrap.appendChild(seg);
    });

    const segs = progressWrap.querySelectorAll('.seg');

    steps.forEach((step, index) => {
      step.querySelectorAll('.quiz-options button').forEach((button) => {
        button.addEventListener('click', () => {
          answers[index] = button.textContent;
          segs[index].classList.add('done');
          step.classList.remove('active');

          if (index + 1 < steps.length) {
            current = index + 1;
            steps[current].classList.add('active');
          } else {
            final.classList.add('active');
          }
        });
      });
    });

    const restartButton = document.getElementById('quizRestart');

    if (restartButton) {
      restartButton.addEventListener('click', () => {
        final.classList.remove('active');
        segs.forEach((seg) => seg.classList.remove('done'));
        steps.forEach((step) => step.classList.remove('active'));
        current = 0;
        steps[0].classList.add('active');
        answers.length = 0;
      });
    }
  })();

  (() => {
    const montoBtns = document.querySelectorAll('#montoGrid button');
    const otroWrap = document.getElementById('montoOtro');
    const otroInput = document.getElementById('montoInput');
    const freqBtns = document.querySelectorAll('.aporta-frecuencia button');
    const aportarButton = document.getElementById('btnAportar');

    if (!montoBtns.length || !otroWrap || !otroInput || !freqBtns.length || !aportarButton) return;

    let montoSeleccionado = null;

    montoBtns.forEach((button) => {
      button.addEventListener('click', () => {
        montoBtns.forEach((item) => item.classList.remove('selected'));
        button.classList.add('selected');

        if (button.dataset.monto === 'otro') {
          otroWrap.style.display = 'block';
          montoSeleccionado = null;
        } else {
          otroWrap.style.display = 'none';
          montoSeleccionado = button.dataset.monto;
        }
      });
    });

    freqBtns.forEach((button) => {
      button.addEventListener('click', () => {
        freqBtns.forEach((item) => item.classList.remove('selected'));
        button.classList.add('selected');
      });
    });

    aportarButton.addEventListener('click', () => {
      const monto = montoSeleccionado || otroInput.value;

      if (!monto) {
        alert('Elegí o ingresá un monto para continuar.');
        return;
      }

      alert('Gracias por tu aporte de $' + monto + '. (Conectar esta acción con la plataforma de pago real.)');
    });
  })();

  const contactForm = document.getElementById('contactForm');
  const formOk = document.getElementById('formOk');

  if (contactForm && formOk) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.reset();
      formOk.style.display = 'block';
    });
  }
});

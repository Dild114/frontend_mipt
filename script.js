document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const contentWrapper = document.querySelector('.content-wrapper');
  let navbarHeight = navbar.offsetHeight;
  window.addEventListener('resize', () => {
    navbarHeight = navbar.offsetHeight;
  });
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-image');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const counter = document.getElementById('slide-counter');
  const closeBtn = document.getElementById('modal-close');
  const images = Array.from(document.querySelectorAll('.project img'));
  let currentIndex = 0;
  images.forEach(img => img.addEventListener('click', () => {
    currentIndex = +img.dataset.index;
    updateModal();
    modal.classList.add('show');
  }));
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateModal();
    }
  });
  nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateModal();
    }
  });
  function updateModal() {
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
    counter.textContent = `${currentIndex + 1}/${images.length}`;
prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
nextBtn.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
}
// Закрытие по клику вне картинки
modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
});
const formModal = document.getElementById('contact-modal');
const contactTrigger = document.getElementById('contact-trigger');
const formClose = document.getElementById('form-close');
const closeBottom = document.getElementById('close-bottom');
const form = document.getElementById('contactForm');
const btn = document.getElementById('submit-btn');
const successMsg = document.getElementById('success-message');
contactTrigger.addEventListener('click', () => {
    formModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});
[formClose, closeBottom, formModal].forEach(element => {
    element.addEventListener('click', e => {
        if (e.target === formModal || e.target === formClose || e.target === closeBottom) {
            formModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});
const validators = {
    name: v => /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(v),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: v => /^([а-яёА-ЯЁ\s]+|[a-zA-Z\s]+)$/.test(v)
};
form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    ['name', 'email', 'message'].forEach(field => {
        const val = document.getElementById(field).value.trim();
        const err = document.getElementById(field + '-error');
        if (!validators[field](val)) {
            err.textContent = 'Некорректно';
            valid = false;
        } else {
            err.textContent = '';
        }
    });
    if (!valid) return;
    btn.textContent = 'Отправляем...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Успешно отправлено!';
        successMsg.style.display = 'block';
        setTimeout(() => {
            form.reset();
            btn.textContent = 'Отправить';
            btn.disabled = false;
            successMsg.style.display = 'none';
            formModal.classList.remove('show');
        }, 3000);
    }, 1000);
});
const ad = document.getElementById('ad-popup');
if (!localStorage.getItem('adClosed')) {
    setTimeout(() => {
        ad.style.display = 'block';
    }, 30000);
}
document.getElementById('ad-close').addEventListener('click', () => {
    ad.style.display = 'none';
    localStorage.setItem('adClosed', '1');
});
const endDate = new Date('2026-06-15T00:00:00');
const d = document.getElementById('days');
const h = document.getElementById('hours');
const m = document.getElementById('minutes');
const s = document.getElementById('seconds');
function plural(n, forms) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 == 1) return forms[0];
    return forms[2];
}

function tick() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
        document.getElementById('countdown').textContent = 'Вы уже получили диплом!';
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    d.textContent = `${days} ${plural(days, ['день', 'дня', 'дней'])}`;
    h.textContent = `${hours} ${plural(hours, ['час', 'часа', 'часов'])}`;
    m.textContent = `${minutes} ${plural(minutes, ['минута', 'минуты', 'минут'])}`;
    s.textContent = `${seconds} ${plural(seconds, ['секунда', 'секунды', 'секунд'])}`;
}

setInterval(tick, 1000);
tick();
const bubbles = document.querySelectorAll('.floating-bubbles circle');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y !== lastScroll) {
        bubbles.forEach((b, i) => {
            const baseX = +b.getAttribute('cx');
            const baseY = +b.getAttribute('cy');
            const offsetY = Math.sin((y / 100) + i) * 5;
            b.style.transform = `translate(0, ${offsetY}px)`;
        });
        lastScroll = y;
    }
});
document.addEventListener('mousemove', e => {
    bubbles.forEach((b, i) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * (i + 1) * 10;
        const dy = (e.clientY / window.innerHeight - 0.5) * (i + 1) * 10;
        b.style.transform = `translate(${dx}px, ${dy}px)`;
    });
});
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});
});
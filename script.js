const links = document.querySelectorAll('.pl-nav-link');
links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('pl-nav-link--active'));
    link.classList.add('pl-nav-link--active');
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".pl-nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("pl-nav-link--active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("pl-nav-link--active");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('pl-burger-btn');
    const close = document.getElementById('pl-close-btn');
    const menu = document.getElementById('pl-mobile-menu');
    const overlay = document.getElementById('pl-overlay');

    if (!burger || !menu) return;

    const toggleMenu = (open) => {
        menu.classList.toggle('is-open', open);
        overlay.classList.toggle('is-visible', open);
        document.body.style.overflow = open ? 'hidden' : 'auto';
    };

    burger.onclick = () => toggleMenu(true);
    close.onclick = () => toggleMenu(false);
    overlay.onclick = () => toggleMenu(false);

    document.querySelectorAll('.pl-nav-link').forEach(link => {
        link.onclick = () => toggleMenu(false);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.pl-nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active-section');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-section');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
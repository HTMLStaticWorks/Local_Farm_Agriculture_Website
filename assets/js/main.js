/**
 * MAIN JS - LOCAL FARM & CSA WEBSITE
 * Handing navigation, theme, RTL, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initStickyHeader();
    initScrollAnimations();
    initFormValidation();
    initMobileMenu();
});

// 1. Theme Management (Light/Dark)
function initTheme() {
    const themeToggle = document.querySelector('#theme-toggle-btn');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// 2. RTL Support
function initRTL() {
    const rtlToggle = document.querySelector('#rtl-toggle');
    if (!rtlToggle) return;

    rtlToggle.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
    });
}

// 3. Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.navbar-custom');
    const backToTop = document.querySelector('#back-to-top');
    if (!header && !backToTop) return;

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('navbar-sticky');
            } else {
                header.classList.remove('navbar-sticky');
            }
        }

        // Back to Top Button
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 4. Scroll Animations (AOS style)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
}

// 5. Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

// 6. Mobile Menu (Hamburger)
function initMobileMenu() {
    const hamburger = document.querySelector('.navbar-toggler');
    const offcanvas = document.querySelector('#mobileNav');
    
    if (hamburger && offcanvas) {
        // Logic for specialized mobile menu if needed
    }
}

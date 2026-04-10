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
    initPasswordToggle();
});

// 1. Theme Management (Light/Dark)
function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    if (themeToggles.length === 0) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
}

// 2. RTL Support
function initRTL() {
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle');
    if (rtlToggles.length === 0) return;

    // Load initial state
    const isRTL = localStorage.getItem('isRTL') === 'true';
    if (isRTL) {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('isRTL', newDir === 'rtl' ? 'true' : 'false');
        });
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

// 6. Mobile Menu & Click-Triggered Dropdowns
function initMobileMenu() {
    // 7. Click-Triggered Dropdowns
    const clickDropdowns = document.querySelectorAll('.click-triggered .dropdown-toggle');
    clickDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth >= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const menu = this.nextElementSibling;

                // Close other open click-triggered dropdowns
                document.querySelectorAll('.click-triggered').forEach(other => {
                    if (other !== parent) {
                        other.classList.remove('show');
                        const otherMenu = other.querySelector('.dropdown-menu');
                        if (otherMenu) otherMenu.classList.remove('show');
                    }
                });

                parent.classList.toggle('show');
                if (menu) menu.classList.toggle('show');
            }
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.click-triggered')) {
            document.querySelectorAll('.click-triggered').forEach(dropdown => {
                dropdown.classList.remove('show');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
            });
        }
    });
}

// 7. Password Visibility Toggle
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.password-toggle');
    toggles.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    });
}

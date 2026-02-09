// ===== Theme Switcher =====
(function() {
    const root = document.documentElement;
    const switcher = document.getElementById('theme-switcher');

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        const resolved = theme === 'system' ? getSystemTheme() : theme;
        root.setAttribute('data-theme', resolved);
        switcher.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    const saved = localStorage.getItem('aitiasoft-theme') || 'light';
    applyTheme(saved);

    switcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-btn');
        if (!btn) return;
        const theme = btn.dataset.theme;
        localStorage.setItem('aitiasoft-theme', theme);
        applyTheme(theme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('aitiasoft-theme') === 'system') applyTheme('system');
    });
})();

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Navbar Scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.about-card, .solution-card, .tech-card, .industry-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    observer.observe(el);
});

// ===== Hero Animation =====
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }, 200);
}
if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { heroSubtitle.style.opacity = '1'; }, 500);
}

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            btn.style.opacity = '1';
            this.reset();
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.style.background = '';
            }, 3000);
        }, 1000);
    });
}

// ===== Mobile Menu =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '24px';
            navLinks.style.background = 'var(--bg)';
            navLinks.style.borderBottom = '1px solid var(--border)';
        }
    });
}

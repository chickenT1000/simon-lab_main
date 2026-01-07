document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuBtn.textContent = nav.classList.contains('active') ? '\u2715' : '\u2630';
        });
    }

    // Language selector
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
    }

    // Email obfuscation - decode on page load
    document.querySelectorAll('.email-contact').forEach(function(el) {
        const user = el.dataset.user;
        const domain = el.dataset.domain;
        if (user && domain) {
            const email = user + '@' + domain;
            el.innerHTML = '<a href="ma' + 'ilto:' + email + '">' + email + '</a>';
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (nav && menuBtn && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            menuBtn.textContent = '\u2630';
        }
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (nav) {
                        nav.classList.remove('active');
                        if (menuBtn) menuBtn.textContent = '\u2630';
                    }
                }
            }
        });
    });

    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (lightbox && lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

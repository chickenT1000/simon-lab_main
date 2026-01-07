const I18n = {
    currentLang: 'en',
    translations: {},

    async init() {
        this.currentLang = this.detectLanguage();
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.updateLangSelector();
        this.bindLangLinks();
    },

    detectLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && ['en', 'pl', 'de'].includes(urlLang)) {
            localStorage.setItem('simon-lab-lang', urlLang);
            return urlLang;
        }

        const storedLang = localStorage.getItem('simon-lab-lang');
        if (storedLang && ['en', 'pl', 'de'].includes(storedLang)) {
            return storedLang;
        }

        const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
        if (['pl', 'de'].includes(browserLang)) {
            localStorage.setItem('simon-lab-lang', browserLang);
            return browserLang;
        }

        localStorage.setItem('simon-lab-lang', 'en');
        return 'en';
    },

    async loadTranslations(lang) {
        try {
            const basePath = window.location.pathname.includes('/apps/') ? '../' : '';
            const response = await fetch(`${basePath}lang/${lang}.json`);
            this.translations = await response.json();
        } catch (e) {
            console.error('Failed to load translations:', e);
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    },

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getNestedValue(this.translations, key);
            if (translation) {
                if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = this.getNestedValue(this.translations, key);
            if (translation) {
                el.title = translation;
            }
        });

        const pageTitle = this.getNestedValue(this.translations, 'meta.title');
        if (pageTitle) {
            document.title = pageTitle;
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        const descTranslation = this.getNestedValue(this.translations, 'meta.description');
        if (metaDesc && descTranslation) {
            metaDesc.setAttribute('content', descTranslation);
        }
    },

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    },

    updateLangSelector() {
        const langCurrent = document.querySelector('.lang-current');
        if (langCurrent) {
            langCurrent.textContent = this.currentLang.toUpperCase();
        }

        document.querySelectorAll('.lang-dropdown a[data-lang]').forEach(link => {
            link.classList.remove('active');
            const lang = link.getAttribute('data-lang');
            if (lang === this.currentLang) {
                link.classList.add('active');
            }
        });
    },

    setLanguage(lang) {
        localStorage.setItem('simon-lab-lang', lang);
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.location.href = url.toString();
    },

    bindLangLinks() {
        document.querySelectorAll('.lang-dropdown a[data-lang]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.setLanguage(lang);
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => I18n.init());

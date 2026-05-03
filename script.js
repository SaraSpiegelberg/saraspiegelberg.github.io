const translations = {
    pt: {
        "nav-about": "Sobre",
        "nav-skills": "Habilidades",
        "nav-portfolio": "Projetos",
        "hero-eyebrow": "IT Specialist & Game Developer",
        "hero-pro": "Engenharia de sistemas com <i>visão criativa</i>.",
        "hero-games": "Construindo mundos através do <i>código</i>.",
        "hero-desc": "Eu sou a Sara. Ajudo empresas a escalar sua infraestrutura e transformo ideias criativas em jogos imersivos.",
        "hero-btn-1": "Explorar Projetos",
        "hero-btn-2": "Fale comigo",
        "about-title": "Uma trajetória híbrida",
        "about-p": "Minha carreira é marcada pela união de dois mundos: a robustez necessária para manter infraestruturas críticas e a abstração exigida no desenvolvimento de jogos. Essa dualidade me permite resolver problemas complexos com uma visão única e técnica.",
        "stat-1": "Anos de Experiência",
        "stat-2": "Projetos Entregues",
        "skills-title": "Expertise",
        "skills-p": "Dominando as ferramentas que moldam o futuro digital.",
        "skill-1-t": "Infraestrutura",
        "skill-1-p": "Active Directory, Cloud Azure, Redes e Segurança.",
        "skill-2-t": "Linguagens",
        "skill-2-p": "Python, PHP, JavaScript, GDScript.",
        "skill-3-t": "Jogos",
        "skill-3-p": "Godot Engine, Arquitetura de Sistemas, UI/UX.",
        "portfolio-title": "Projetos em Destaque",
        "pro-p1-t": "IT Security Scanner",
        "pro-p1-p": "Sistema automatizado de varredura e auditoria de redes corporativas em tempo real.",
        "pro-p2-t": "Azure Hub Auto-Deploy",
        "pro-p2-p": "Scripts de automação para provisionamento de infraestrutura escalável na nuvem.",
        "proj-link": "Ver Detalhes →",
        "contact-title": "Vamos construir o amanhã?",
        "contact-p": "Estou aberta a novas parcerias e desafios técnicos.",
        "form-name": "Seu Nome",
        "form-email": "Seu E-mail",
        "form-msg": "Sua Mensagem",
        "form-submit": "Enviar Mensagem",
        "footer-text": "&copy; 2026 Sara Spiegelberg. Todos os direitos reservados."
    },
    en: {
        "nav-about": "About",
        "nav-skills": "Skills",
        "nav-portfolio": "Projects",
        "hero-eyebrow": "IT Specialist & Game Developer",
        "hero-pro": "System engineering with a <i>creative vision</i>.",
        "hero-games": "Building worlds through <i>code</i>.",
        "hero-desc": "I am Sara. I help companies scale their infrastructure and transform creative ideas into immersive games.",
        "hero-btn-1": "Explore Projects",
        "hero-btn-2": "Contact me",
        "about-title": "A hybrid trajectory",
        "about-p": "My career is marked by the union of two worlds: the robustness needed to maintain critical infrastructure and the abstraction required in game development. This duality allows me to solve complex problems with a unique technical vision.",
        "stat-1": "Years of Experience",
        "stat-2": "Projects Delivered",
        "skills-title": "Expertise",
        "skills-p": "Mastering the tools that shape the digital future.",
        "skill-1-t": "Infrastructure",
        "skill-1-p": "Active Directory, Cloud Azure, Networking and Security.",
        "skill-2-t": "Languages",
        "skill-2-p": "Python, PHP, JavaScript, GDScript.",
        "skill-3-t": "Games",
        "skill-3-p": "Godot Engine, Systems Architecture, UI/UX.",
        "portfolio-title": "Featured Projects",
        "pro-p1-t": "IT Security Scanner",
        "pro-p1-p": "Automated system for real-time scanning and auditing of corporate networks.",
        "pro-p2-t": "Azure Hub Auto-Deploy",
        "pro-p2-p": "Automation scripts for provisioning scalable cloud infrastructure.",
        "proj-link": "View Details →",
        "contact-title": "Let's build tomorrow?",
        "contact-p": "I'm open to new partnerships and technical challenges.",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-msg": "Your Message",
        "form-submit": "Send Message",
        "footer-text": "&copy; 2026 Sara Spiegelberg. All rights reserved."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.classList.add('js-loaded');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.innerHTML = translations[lang][key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });
        localStorage.setItem('portfolio-lang', lang);
    };

    const autoDetectLang = async () => {
        const savedLang = localStorage.getItem('portfolio-lang');
        if (savedLang) {
            setLanguage(savedLang);
            return;
        }

        try {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'pt') {
                setLanguage('pt');
            } else {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setLanguage(data.country_code === 'BR' ? 'pt' : 'en');
            }
        } catch (e) {
            setLanguage('en');
        }
    };

    autoDetectLang();

    langToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-option')) {
            setLanguage(e.target.getAttribute('data-lang'));
        }
    });

    const savedTheme = localStorage.getItem('portfolio-theme') || 'pro';
    body.dataset.theme = savedTheme;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.dataset.theme;
        const newTheme = currentTheme === 'pro' ? 'games' : 'pro';
        body.dataset.theme = newTheme;
        localStorage.setItem('portfolio-theme', newTheme);
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < window.innerHeight * 0.9) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

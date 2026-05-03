const translations = {
    pt: {
        "nav-about": "Sobre",
        "nav-skills": "Habilidades",
        "nav-portfolio": "Projetos",
        "nav-contact": "Contato",
        "hero-eyebrow": "IT Specialist & Game Developer",
        "hero-pro": "Engenharia de sistemas com <em>visão criativa.</em>",
        "hero-games": "Construindo mundos através do <em>código.</em>",
        "hero-desc": "Eu sou a Sara. Ajudo empresas a escalar sua infraestrutura e transformo ideias criativas em jogos imersivos.",
        "hero-btn-1": "Explorar Projetos",
        "hero-btn-2": "Fale comigo",
        "about-title": "Uma trajetória <em>híbrida</em>",
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
        "contact-title": "Vamos construir <em>o amanhã?</em>",
        "contact-p": "Estou aberta a novas parcerias e desafios técnicos.",
        "form-name": "Seu Nome",
        "form-email": "Seu E-mail",
        "form-msg": "Sua Mensagem",
        "form-submit": "Enviar Mensagem",
        "footer-text": "© 2026 Sara Spiegelberg. Todos os direitos reservados."
    },
    en: {
        "nav-about": "About",
        "nav-skills": "Skills",
        "nav-portfolio": "Projects",
        "nav-contact": "Contact",
        "hero-eyebrow": "IT Specialist & Game Developer",
        "hero-pro": "System engineering with a <em>creative vision.</em>",
        "hero-games": "Building worlds through <em>code.</em>",
        "hero-desc": "I am Sara. I help companies scale their infrastructure and transform creative ideas into immersive games.",
        "hero-btn-1": "Explore Projects",
        "hero-btn-2": "Contact me",
        "about-title": "A hybrid <em>trajectory</em>",
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
        "contact-title": "Let's build <em>tomorrow?</em>",
        "contact-p": "I'm open to new partnerships and technical challenges.",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-msg": "Your Message",
        "form-submit": "Send Message",
        "footer-text": "© 2026 Sara Spiegelberg. All rights reserved."
    }
};

document.addEventListener('DOMContentLoaded', () => {

    /* ── Tema ── */
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('sara-theme') || 'pro';
    body.dataset.theme = saved;

    themeBtn.addEventListener('click', () => {
        const next = body.dataset.theme === 'pro' ? 'games' : 'pro';
        body.dataset.theme = next;
        localStorage.setItem('sara-theme', next);
    });

    /* ── Idioma ── */
    const applyLang = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = translations[lang]?.[el.dataset.i18n];
            if (v !== undefined) el.innerHTML = v;
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const v = translations[lang]?.[el.dataset.i18nPh];
            if (v !== undefined) el.placeholder = v;
        });
        document.querySelectorAll('.lang-opt').forEach(o => {
            o.classList.toggle('active', o.dataset.lang === lang);
        });
        localStorage.setItem('sara-lang', lang);
    };

    const detectLang = async () => {
        const stored = localStorage.getItem('sara-lang');
        if (stored) { applyLang(stored); return; }
        try {
            const bl = navigator.language.split('-')[0];
            if (bl === 'pt') { applyLang('pt'); return; }
            const r = await fetch('https://ipapi.co/json/');
            const d = await r.json();
            applyLang(d.country_code === 'BR' ? 'pt' : 'en');
        } catch {
            applyLang('en');
        }
    };

    detectLang();

    document.getElementById('lang-toggle').addEventListener('click', e => {
        if (e.target.classList.contains('lang-opt')) applyLang(e.target.dataset.lang);
    });

    /* ── Menu mobile ── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });

    /* ── Reveal on scroll ── */
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('on'), i * 60);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* ── Formulário assíncrono ── */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-fill');
            const orig = btn.textContent;
            btn.textContent = 'Enviando…';
            btn.disabled = true;
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });
                if (res.ok) {
                    btn.textContent = 'Mensagem enviada!';
                    form.reset();
                    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3500);
                } else {
                    throw new Error();
                }
            } catch {
                btn.textContent = 'Erro. Tente novamente.';
                setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3500);
            }
        });
    }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Sticky nav background
const nav = document.getElementById('top-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAncors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) current = section.getAttribute('id');
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        current = sections[sections.length - 1].getAttribute('id');
    }
    navAncors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});

// Contact form submit — Formspree
const form = document.getElementById('contact-form');
const sendIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');

    // حالة الإرسال
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    try {
        const data = new FormData(form);
        const res = await fetch('https://formspree.io/f/xgaenprk', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            // نجاح
            btn.innerHTML = '✓ Message sent!';
            btn.style.background = '#16a34a';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = `Send message ${sendIconSVG}`;
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        } else {
            throw new Error('server error');
        }
    } catch {
        // فشل
        btn.innerHTML = '✗ Failed — try again';
        btn.style.background = '#dc2626';
        setTimeout(() => {
            btn.innerHTML = `Send message ${sendIconSVG}`;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }
});

// Scroll reveal
const revealEls = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .section-text p');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => {
    el.classList.add('hidden-initially');
    revealObserver.observe(el);
});

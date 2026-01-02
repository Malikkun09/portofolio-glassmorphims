document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const mainContent = document.getElementById('mainContent');

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.add('loaded');

                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }

        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
    }, 100);

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const skillBars = document.querySelectorAll('.skill-progress');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                mainContent.style.opacity = '0.3';
                mainContent.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 300);
                }, 300);
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 100) {
            animateSkillBars();
        }
    });

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const rotateX = (mouseY - centerY) / 50;
            const rotateY = (mouseX - centerX) / 50;

            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.animation = 'slideInLeft 1s ease forwards';
        heroImage.style.animation = 'slideInRight 1s ease forwards';
    }

    window.addEventListener('beforeunload', function(e) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease';
    });
});

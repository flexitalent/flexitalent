document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-lg', 'bg-brand-dark/95');
                navbar.classList.remove('bg-brand-dark/80');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-brand-dark/95');
                navbar.classList.add('bg-brand-dark/80');
            }
        }
    });

    // Scroll Reveal 
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach((el) => {
            if (el.getBoundingClientRect().top < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;
    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const step = target / 100;
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };
    
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            if (statsSection.getBoundingClientRect().top < window.innerHeight && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
        });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-gradient-to-r', 'from-brand-primary', 'to-brand-secondary', 'text-white');
                    b.classList.add('bg-white/5', 'text-gray-300');
                });
                btn.classList.add('bg-gradient-to-r', 'from-brand-primary', 'to-brand-secondary', 'text-white');
                btn.classList.remove('bg-white/5', 'text-gray-300');
                
                const filterValue = btn.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                    } else {
                        item.style.opacity = '0'; item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
});

// BLUWAVE INTERNATIONAL - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADER
    // ========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });
    
    // ========================================
    // THEME TOGGLE
    // ========================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        let theme = html.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // GO TO TOP BUTTON
    // ========================================
    const goToTopBtn = document.getElementById('goToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    });
    
    goToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate numbers if it's a stat number
                if (entry.target.classList.contains('stat-number') || 
                    entry.target.querySelector('.stat-number')) {
                    animateNumbers(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // ========================================
    // NUMBER ANIMATION
    // ========================================
    function animateNumbers(element) {
        const numbers = element.querySelectorAll('.stat-number');
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    num.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    num.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // PRODUCT FILTER (if on products page)
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCategories = document.querySelectorAll('.product-category');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCategories.forEach(category => {
                if (filter === 'all' || category.id === filter) {
                    category.style.display = 'block';
                    category.classList.add('animate-on-scroll');
                    setTimeout(() => {
                        category.classList.add('animated');
                    }, 100);
                } else {
                    category.style.display = 'none';
                    category.classList.remove('animated');
                }
            });
        });
    });
    
    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    submitBtn.disabled = false;
                }, 3000);
                
                // You can add actual form submission here
                console.log('Form data:', data);
            }, 1500);
        });
    }
    
    // ========================================
    // CAROUSEL AUTO-PLAY CONTROL
    // ========================================
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    });
    
    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ========================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========================================
    // MOBILE MENU TOGGLE ENHANCEMENT
    // ========================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
    
    // ========================================
    // LAZY LOADING IMAGES (Placeholder)
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // PERFORMANCE: DEBOUNCE FUNCTION
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events for better performance
    const handleScroll = debounce(function() {
        // Scroll handling code
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    console.log('BLUWAVE INTERNATIONAL Website Loaded Successfully!');
});


   
   // Initialize Bootstrap Carousel manually to ensure it works
   document.addEventListener('DOMContentLoaded', function() {
       const carouselElement = document.getElementById('homeSlider');
       if (carouselElement) {
           const carousel = new bootstrap.Carousel(carouselElement, {
               interval: 5000,
               wrap: true,
               keyboard: true,
               pause: 'hover'
           });
           
           // Test if controls are working
           const prevButton = carouselElement.querySelector('.carousel-control-prev');
           const nextButton = carouselElement.querySelector('.carousel-control-next');
           
           if (prevButton && nextButton) {
               console.log('Carousel controls found and initialized');
           } else {
               console.error('Carousel controls not found');
           }
       }
   });

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format phone number
function formatPhoneNumber(input) {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return input;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        showToast('Copied to clipboard!');
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.BluwaveUtils = {
    formatPhoneNumber,
    validateEmail,
    copyToClipboard,
    showToast
};
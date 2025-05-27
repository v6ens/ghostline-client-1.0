// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with anchors
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove background opacity based on scroll
        navbar.style.background = '#000';

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.plan-card, .gallery-item, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Plan card hover effects
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gallery item click effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // You can add modal or lightbox functionality here
            console.log('Gallery item clicked:', this.querySelector('h4').textContent);
        });
    });

    // Buy button interactions
    const buyButtons = document.querySelectorAll('.plan-btn, .buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Simulate purchase flow
            showPurchaseModal(this);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .plan-btn, .buy-btn {
            position: relative;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(13, 13, 21, 0.95);
                flex-direction: column;
                padding: 1rem;
                backdrop-filter: blur(10px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for floating blocks
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const blocks = document.querySelectorAll('.block');

        blocks.forEach((block, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = scrolled * speed;
            block.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // You can uncomment this to add a typing effect to the hero title
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     typeWriter(heroTitle, 'Ghostline', 150);
    // }
});

// Purchase modal function
function showPurchaseModal(button) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Purchase Confirmation</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>You are about to purchase a Ghostline plan.</p>
                <p>This is a demo - no actual purchase will be made.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary close-modal">Cancel</button>
                <button class="btn btn-primary confirm-purchase">Confirm</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .purchase-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }

        .modal-content {
            background: #1e1635;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            animation: scaleIn 0.3s ease forwards;
        }

        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            color: #cdccd5;
            margin: 0;
        }

        .close-modal {
            background: none;
            border: none;
            color: #888;
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
        }

        .close-modal:hover {
            color: #cdccd5;
        }

        .modal-body {
            padding: 1.5rem;
            color: #888;
        }

        .modal-footer {
            padding: 1.5rem;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }

        @keyframes scaleIn {
            to {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(modalStyle);

    // Close modal events
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
            modalStyle.remove();
        });
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });

    // Confirm purchase
    const confirmBtn = modal.querySelector('.confirm-purchase');
    confirmBtn.addEventListener('click', () => {
        alert('Thank you for your interest! This is a demo website.');
        modal.remove();
        modalStyle.remove();
    });
}

// Add some console easter eggs for developers
console.log('%cGhostline Clone', 'color: #4b39b3; font-size: 24px; font-weight: bold;');
console.log('%cWebsite successfully cloned! 🎮', 'color: #4a89d1; font-size: 14px;');
console.log('Original: https://ghostline-client-1-0.vercel.app/');

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`%cPage loaded in ${Math.round(loadTime)}ms`, 'color: #4ade80;');
});

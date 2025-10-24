// ===================================
// DYNAMIC CONTENT RENDERING
// ===================================

// Render Projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card fade-in';
        projectCard.setAttribute('data-category', project.category);

        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const linkHTML = project.url
            ? `<a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer">View on GitHub →</a>`
            : '';

        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">
                    <span class="project-icon"><i class="fa ${project.icon}" aria-hidden="true"></i></span>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                ${linkHTML}
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });

    // Re-observe project cards for animations
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            if (typeof observer !== 'undefined') {
                observer.observe(card);
            }
        });
    }, 100);
}

// Render Certificates
function renderCertificates() {
    const certificatesGrid = document.getElementById('certificatesGrid');
    if (!certificatesGrid) return;

    certificatesGrid.innerHTML = '';

    certificates.forEach(cert => {
        const certCard = document.createElement('article');
        certCard.className = 'certificate-card fade-in';

        const linkHTML = cert.url
            ? `<a href="${cert.url}" class="certificate-link" target="_blank" rel="noopener">View Credential →</a>`
            : '';

        certCard.innerHTML = `
            <div class="certificate-icon">
                <span class="cert-emoji"><i class="fa ${cert.icon}" aria-hidden="true"></i></span>
            </div>
            <div class="certificate-content">
                <h3 class="certificate-title">${cert.title}</h3>
                <p class="certificate-issuer">${cert.issuer}</p>
                ${linkHTML}
            </div>
        `;

        certificatesGrid.appendChild(certCard);
    });

    // Re-observe certificate cards for animations
    setTimeout(() => {
        document.querySelectorAll('.certificate-card').forEach((cert, index) => {
            cert.style.transitionDelay = `${index * 0.1}s`;
            if (typeof observer !== 'undefined') {
                observer.observe(cert);
            }
        });
    }, 100);
}

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderCertificates();

    // Update project count dynamically
    const projectCountElement = document.getElementById('projectCount');
    if (projectCountElement && typeof projects !== 'undefined') {
        projectCountElement.setAttribute('data-target', projects.length);
    }
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for background
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach((skill, index) => {
    skill.classList.add('fade-in');
    skill.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(skill);
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isDecimal = element.hasAttribute('data-decimal');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target;
            }
        }
    };

    updateCounter();
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// PARALLAX EFFECT ON HERO BACKGROUND
// ===================================
const heroBackground = document.querySelector('.background-image');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===================================
// FORM SUBMISSION HANDLER (Formspree)
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formStatus = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;

        // Update button state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
                formStatus.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';

                // Reset form
                contactForm.reset();

                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                // Error from server
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error handling
            submitBtn.textContent = 'Try Again';
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            formStatus.textContent = 'Oops! Something went wrong. Please try again or email me directly.';
            formStatus.className = 'form-status error';

            console.error('Form submission error:', error);
        }
    });
}

// ===================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ===================================
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 50);
// }

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// SMOOTH REVEAL ON PAGE LOAD
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===================================
// PERFORMANCE: THROTTLE SCROLL EVENTS
// ===================================
function throttle(func, wait) {
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

// Apply throttling to scroll events if needed
// window.addEventListener('scroll', throttle(() => {
//     // Your scroll code here
// }, 100));

// ===================================
// PROJECT FILTER FUNCTIONALITY
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the filter value
        const filterValue = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all') {
                card.classList.remove('hidden');
                // Add fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else if (category === filterValue) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cWelcome to my portfolio!', 'color: #c57138; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666; font-size: 14px;');
console.log('%cLooking to hire? Let\'s connect!', 'color: #c57138; font-size: 14px;');

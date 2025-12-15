// Dot Grid
const dotGrid = document.querySelector('.dot-grid');
const dotSize = 10;
const dotSpacing = 50;

// Create dots
function createDots() {
    const cols = Math.ceil(window.innerWidth / dotSpacing);
    const rows = Math.ceil(window.innerHeight / dotSpacing);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.left = `${i * dotSpacing}px`;
            dot.style.top = `${j * dotSpacing}px`;
            dotGrid.appendChild(dot);
        }
    }
}

// Mouse Movement Effect
function handleMouseMove(e) {
    const dots = document.querySelectorAll('.dot');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    dots.forEach(dot => {
        const dotX = parseFloat(dot.style.left);
        const dotY = parseFloat(dot.style.top);
        const distance = Math.sqrt((mouseX - dotX) ** 2 + (mouseY - dotY) ** 2);
        const scale = Math.max(0.5, 4 - distance / 50);
        dot.style.transform = `scale(${scale})`;
    });
}

// Typing Animation
function typeText(element, text, speed) {
    let i = 0;
    element.textContent = '';
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            element.classList.remove('typing');
        }
    }, speed);
}

// Scroll-Triggered Animations
const uniformElements = document.querySelectorAll('.uniform-element');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            const h2 = entry.target.querySelector('.hero h1');
            const originalText = h2.textContent;
            h2.textContent = '';
            h2.classList.add('typing');
            typeText(h2, originalText, 50);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

uniformElements.forEach(element => {
    observer.observe(element);
});

// FAQ Toggle Functionality
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// Initialize
window.addEventListener('load', () => {
    createDots();
    document.addEventListener('mousemove', handleMouseMove);
    const heroHeading = document.querySelector('.hero h1');
    heroHeading.classList.add('typing');
    typeText(heroHeading, heroHeading.textContent, 50);

    // Initialize FAQ functionality
    setupFAQ();
});

// Handle window resize
window.addEventListener('resize', () => {
    dotGrid.innerHTML = '';
    createDots();
});

// Also initialize FAQ when DOM is fully loaded (in case elements are added dynamically)
document.addEventListener('DOMContentLoaded', setupFAQ);


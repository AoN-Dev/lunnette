// ========================================
// PORTFOLIO JAVASCRIPT - REFACTORED
// ========================================

// DOM Elements
const sections = document.querySelectorAll('.section');
const navbar = document.getElementById('navbar');
const logoIcon = document.getElementById('logoIcon');
const logoText = document.getElementById('logoText');

// Hero Section Elements (Section 1)
const heroPhotoCards = document.querySelectorAll('.hero-photo-card');
const heroPhotoContainer = document.getElementById('heroPhotoContainer');

// Contact Section Elements (Section 4)
const contactPhotoCards = document.querySelectorAll('.contact-photo-card');
const contactPhotoDeck = document.getElementById('contactPhotoDeck');

// Popup Elements
const popup = document.getElementById('popupDeck');
const popupTitle = document.getElementById('popupDeckTitle');

// ========================================
// CONFIGURATION
// ========================================

// Color schemes for each section
const sectionColors = {
    0: { bg: '#fd6c9e', icon: 'linear-gradient(45deg, #e770ab, rgb(21, 97, 116))', text: 'Jessa Lagura' },
    1: { bg: 'rgba(102, 126, 234, 0.9)', icon: 'linear-gradient(45deg, #ff9a9e, #fecfef)', text: 'Careers' },
    2: { bg: 'rgba(255, 154, 158, 0.9)', icon: 'linear-gradient(45deg, #4facfe, #00f2fe)', text: 'Hobbies' },
    3: { bg: 'rgba(168, 237, 234, 0.9)', icon: 'linear-gradient(45deg, rgb(206, 80, 80), #ffa500)', text: 'LET\'S CONNECT' }
};

// Hero section photo positions for shuffling
const heroPhotoPositions = [
    { x: -150, y: -100, rotation: -15 },
    { x: 90, y: -80, rotation: 10 },
    { x: -80, y: 120, rotation: 8 },
    { x: 160, y: 100, rotation: -12 }
];

// Contact section photo positions for shuffling
const contactPhotoPositions = [
    { x: -100, y: -80, rotation: -15 },
    { x: 80, y: -60, rotation: 10 },
    { x: -60, y: 100, rotation: 8 },
    { x: 120, y: 80, rotation: -12 },
    { x: 0, y: 0, rotation: 0 }
];

// ========================================
// HERO SECTION ANIMATION (Section 1)
// ========================================

let heroShuffleInterval;

function shuffleHeroPhotos() {
    heroPhotoCards.forEach((card, index) => {
        const randomIndex = Math.floor(Math.random() * heroPhotoPositions.length);
        const pos = heroPhotoPositions[randomIndex];
        
        setTimeout(() => {
            card.style.transition = 'transform 1.0s ease';
            card.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`;
        }, index * 200);
    });
}

function startHeroShuffling() {
    // Clear any existing interval
    if (heroShuffleInterval) {
        clearInterval(heroShuffleInterval);
    }
    
    // Start shuffling
    heroShuffleInterval = setInterval(() => {
        shuffleHeroPhotos();
    }, 3000);
    
    // Initial shuffle
    shuffleHeroPhotos();
}

function stopHeroShuffling() {
    if (heroShuffleInterval) {
        clearInterval(heroShuffleInterval);
        heroShuffleInterval = null;
    }
}

function moveHeroPhotosBack() {
    heroPhotoCards.forEach((card, index) => {
        card.style.transition = 'transform 0.8s ease';
        card.style.transform = 'translate(0px, 0px) rotate(0deg)';
        card.classList.remove('in-category');
    });
}

// ========================================
// CONTACT SECTION ANIMATION (Section 4)
// ========================================

let contactShuffleInterval;

function shuffleContactPhotos() {
    contactPhotoCards.forEach((card) => {
        const pos = contactPhotoPositions[Math.floor(Math.random() * contactPhotoPositions.length)];
        card.style.transition = 'transform 1.2s ease';
        card.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`;
    });
}

function startContactShuffling() {
    // Clear any existing interval
    if (contactShuffleInterval) {
        clearInterval(contactShuffleInterval);
    }
    
    // Start shuffling
    contactShuffleInterval = setInterval(() => {
        shuffleContactPhotos();
    }, 2000);
    
    // Initial shuffle
    shuffleContactPhotos();
}

function stopContactShuffling() {
    if (contactShuffleInterval) {
        clearInterval(contactShuffleInterval);
        contactShuffleInterval = null;
    }
}

// ========================================
// DECK POPUP FUNCTIONALITY
// ========================================

function openDeckPopup(index) {
    const titleMap = {
        1: "Portrait Works",
        2: "Event Coverage", 
        3: "Photo Edits",
        4: "Product Designs"
    };

    const deckImages = {
        1: ['images/p5.jpg', 'images/p3.jpg', 'images/p4.jpg', 'images/s18.jpg'],
        2: ['images/e3.jpg', 'images/e4.jpg', 'images/e6.jpg', 'images/e2.jpg'],
        3: ['images/e1.jpg', 'images/34.jpg', 'images/s12.jpg', 'images/s.jpg'],
        4: ['images/tu.jpg', 'images/df.jpg', 'images/03.jpg']
    };

    const container = document.getElementById("deckContainer");
    const popupTitle = document.getElementById("popupDeckTitle");
    const popup = document.getElementById("popupDeck");

    container.innerHTML = "";
    popupTitle.textContent = titleMap[index];

    const images = deckImages[index];
    images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(img);
    });

    popup.style.display = "block";
}

function closeDeckPopup() {
    const popup = document.getElementById("popupDeck");
    if (popup) {
        popup.style.display = "none";
    }
}

// ========================================
// INTERSECTION OBSERVER
// ========================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '-50px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            const colorScheme = sectionColors[sectionIndex];
            
            // Update navbar styling
            if (colorScheme) {
                navbar.style.background = colorScheme.bg;
                logoIcon.style.background = colorScheme.icon;
                logoText.textContent = colorScheme.text;
            }
            
            // Handle animations based on section
            switch(sectionIndex) {
                case 0: // Hero section
                    stopContactShuffling();
                    moveHeroPhotosBack();
                    setTimeout(() => {
                        startHeroShuffling();
                    }, 500);
                    break;
                    
                case 1: // Skills section
                    stopHeroShuffling();
                    stopContactShuffling();
                    break;
                    
                case 2: // Contact section (actually section 4 in HTML)
                    stopHeroShuffling();
                    setTimeout(() => {
                        startContactShuffling();
                    }, 300);
                    break;
                    
                default:
                    stopHeroShuffling();
                    stopContactShuffling();
                    break;
            }
            
            // Add entrance animations to current section elements
            const currentElements = entry.target.querySelectorAll('.section-title, .section-subtitle, .client-logos');
            currentElements.forEach((el, index) => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = `slideUp 1s ease ${index * 0.2}s forwards`;
            });
        }
    });
}, observerOptions);

// ========================================
// SCROLL EFFECTS
// ========================================

let isScrolling = false;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax effect for floating elements
            document.querySelectorAll('.floating-element').forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Logo animation on scroll
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                logoIcon.style.transform = 'rotate(180deg) scale(0.8)';
            } else {
                // Scrolling up
                logoIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            isScrolling = false;
        });
        isScrolling = true;
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize intersection observer
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Start hero shuffling after page load
    setTimeout(() => {
        startHeroShuffling();
    }, 1000);
    
    console.log('Portfolio JavaScript initialized successfully!');
});


window.addEventListener('beforeunload', () => {
    stopHeroShuffling();
    stopContactShuffling();
});
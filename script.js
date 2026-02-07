// ========================================
// Falling Chocolates Animation
// ========================================
function createFallingChocolate() {
    const chocolatesContainer = document.getElementById('chocolatesContainer');
    const chocolate = document.createElement('div');
    chocolate.classList.add('falling-chocolate');
    
    // Different chocolate emojis
    const chocolates = ['🍫', '🍬', '🍭', '🍩', '🧁', '🍰'];
    chocolate.innerHTML = chocolates[Math.floor(Math.random() * chocolates.length)];
    
    // Random horizontal position
    chocolate.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 7 + 8;
    chocolate.style.animationDuration = duration + 's';
    
    // Random delay
    chocolate.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size
    const size = Math.random() * 10 + 20;
    chocolate.style.fontSize = size + 'px';
    
    chocolatesContainer.appendChild(chocolate);
    
    // Remove after animation
    setTimeout(() => {
        chocolate.remove();
    }, (duration + 2) * 1000);
}

function initializeFallingChocolates() {
    const initialChocolates = 15;
    for (let i = 0; i < initialChocolates; i++) {
        setTimeout(() => {
            createFallingChocolate();
        }, i * 300);
    }
}

function continuousFallingChocolates() {
    setInterval(() => {
        createFallingChocolate();
    }, 2000);
}

// ========================================
// Button-based Chocolate Unwrapping
// ========================================
function setupChocolateUnwrapping() {
    const unwrapButton = document.getElementById('unwrapButton');
    const wrapperSingle = document.getElementById('wrapperSingle');
    const chocolateBar = document.getElementById('chocolateBar');
    const unwrappedMessage = document.getElementById('unwrappedMessage');
    
    let isUnwrapping = false;
    let hasUnwrapped = false;
    
    unwrapButton.addEventListener('click', function() {
        if (isUnwrapping || hasUnwrapped) return;
        
        isUnwrapping = true;
        unwrapButton.classList.add('unwrapping');
        unwrapButton.querySelector('span').textContent = '🍫 Unwrapping... 🍫';
        
        // Animate through all stages
        const stages = [
            { class: 'peel-10', delay: 200 },
            { class: 'peel-30', delay: 400 },
            { class: 'peel-50', delay: 600 },
            { class: 'peel-70', delay: 800 },
            { class: 'peel-90', delay: 1000 },
            { class: 'peel-100', delay: 1200 }
        ];
        
        stages.forEach((stage, index) => {
            setTimeout(() => {
                wrapperSingle.className = 'wrapper-single ' + stage.class;
                
                // Show chocolate at 50%
                if (index >= 2) {
                    chocolateBar.classList.add('revealed');
                }
                
                // Final stage
                if (index === stages.length - 1) {
                    unwrappedMessage.classList.add('show');
                    unwrapButton.classList.add('hidden');
                    hasUnwrapped = true;
                    
                    // Celebration!
                    setTimeout(() => {
                        createChocolateExplosion();
                    }, 500);
                }
            }, stage.delay);
        });
    });
}

// ========================================
// Wrapper Photo Handler
// ========================================
function setupWrapperPhoto() {
    const wrapperPhoto = document.querySelector('.wrapper-photo');
    const wrapperPlaceholder = document.querySelector('.wrapper-placeholder');
    
    if (!wrapperPhoto || !wrapperPlaceholder) return;
    
    // Check if image loads successfully
    wrapperPhoto.addEventListener('load', function() {
        if (this.complete && this.naturalHeight !== 0) {
            wrapperPlaceholder.style.display = 'none';
            wrapperPhoto.style.display = 'block';
        }
    });
    
    // Check for error
    wrapperPhoto.addEventListener('error', function() {
        wrapperPlaceholder.style.display = 'block';
        wrapperPhoto.style.display = 'none';
    });
    
    // Trigger load check
    if (wrapperPhoto.complete) {
        if (wrapperPhoto.naturalHeight !== 0) {
            wrapperPlaceholder.style.display = 'none';
            wrapperPhoto.style.display = 'block';
        }
    }
}

// ========================================
// Chocolate Explosion Effect
// ========================================
function createChocolateExplosion() {
    const chocolates = ['🍫', '✨', '💕', '🍬', '💖', '⭐'];
    const chocolateWrapper = document.getElementById('chocolateWrapper');
    const rect = chocolateWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = chocolates[Math.floor(Math.random() * chocolates.length)];
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.fontSize = (Math.random() * 20 + 20) + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            const angle = (i / 30) * Math.PI * 2;
            const distance = Math.random() * 150 + 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1.5) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1500 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 20);
    }
}

// ========================================
// Interactive Button
// ========================================
function setupChocolateButton() {
    const chocolateButton = document.getElementById('chocolateButton');
    const specialMessage = document.getElementById('specialMessage');
    let isMessageVisible = false;
    
    chocolateButton.addEventListener('click', function() {
        if (!isMessageVisible) {
            specialMessage.classList.add('show');
            chocolateButton.querySelector('span').textContent = 'You\'re So Sweet! 🍫💕';
            isMessageVisible = true;
            
            createChocolateBurst(chocolateButton);
        } else {
            specialMessage.classList.remove('show');
            chocolateButton.querySelector('span').textContent = 'Click for Something Sweet';
            isMessageVisible = false;
        }
    });
}

// ========================================
// Chocolate Burst Effect
// ========================================
function createChocolateBurst(button) {
    const chocolates = ['🍫', '🍬', '🍭', '💕', '💖', '✨'];
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = chocolates[Math.floor(Math.random() * chocolates.length)];
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = '24px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (i / 20) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(0)',
                opacity: 1
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1.5)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// ========================================
// Scroll Animations
// ========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.message-section, .gallery-section, .reasons-section, .interactive-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ========================================
// Photo Placeholder Handler
// ========================================
function setupPhotoPlaceholders() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        const img = card.querySelector('.gallery-photo');
        const placeholder = card.querySelector('.photo-placeholder');
        
        img.addEventListener('load', function() {
            if (this.complete && this.naturalHeight !== 0) {
                placeholder.style.display = 'none';
                img.style.display = 'block';
            }
        });
        
        img.addEventListener('error', function() {
            placeholder.style.display = 'flex';
            img.style.display = 'none';
        });
        
        if (img.complete) {
            if (img.naturalHeight !== 0) {
                placeholder.style.display = 'none';
                img.style.display = 'block';
            }
        }
    });
}

// ========================================
// Random Sparkles on Scroll
// ========================================
let sparkleTimeout;
function createScrollSparkles() {
    clearTimeout(sparkleTimeout);
    
    sparkleTimeout = setTimeout(() => {
        const sparkle = document.createElement('div');
        const sparkles = ['✨', '💫', '⭐', '🍫'];
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = '0px';
        sparkle.style.fontSize = (Math.random() * 12 + 16) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1';
        sparkle.style.opacity = '0.7';
        
        document.body.appendChild(sparkle);
        
        const duration = Math.random() * 2000 + 2000;
        sparkle.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 0.7
            },
            {
                transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        setTimeout(() => sparkle.remove(), duration);
    }, 50);
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize falling chocolates
    initializeFallingChocolates();
    continuousFallingChocolates();
    
    // Setup chocolate unwrapping
    setupChocolateUnwrapping();
    
    // Setup wrapper photo
    setupWrapperPhoto();
    
    // Setup interactive button
    setupChocolateButton();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup photo placeholders
    setupPhotoPlaceholders();
    
    // Add scroll sparkles
    window.addEventListener('scroll', createScrollSparkles);
    
    console.log('🍫 Made with chocolate and love! ✨');
});

// ========================================
// Photo Card Hover Effects
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const chocolates = ['🍫', '💕', '💖', '✨'];
            
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.textContent = chocolates[i];
                    particle.style.position = 'fixed';
                    particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                    particle.style.fontSize = '18px';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '9999';
                    
                    document.body.appendChild(particle);
                    
                    particle.animate([
                        { transform: 'translateY(0) scale(0)', opacity: 1 },
                        { transform: 'translateY(-40px) scale(1.2)', opacity: 0 }
                    ], {
                        duration: 900,
                        easing: 'ease-out'
                    });
                    
                    setTimeout(() => particle.remove(), 900);
                }, i * 100);
            }
        });
    });
});

// ========================================
// Reason Cards Animation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const reasonCards = document.querySelectorAll('.reason-card');
    
    reasonCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInScale 0.6s ease-out both`;
        }, index * 150);
    });
});

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(style);

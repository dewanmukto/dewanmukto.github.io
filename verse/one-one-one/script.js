// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize custom cursor
    initializeCustomCursor();
    
    // Update footer with current year
    updateFooterYear();
    
    // Initialize character modals
    initializeCharacterModals();
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Faction card interactions
    const factionCards = document.querySelectorAll('.faction-card');
    
    factionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover effects
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const faction = this.dataset.faction;
            showFactionDetails(faction);
        });
    });
    
    // Character card animations
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const placeholder = this.querySelector('.character-placeholder');
            placeholder.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const placeholder = this.querySelector('.character-placeholder');
            placeholder.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Parallax effect for cosmic background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const cosmicBg = document.querySelector('.cosmic-bg');
        const rate = scrolled * -0.5;
        
        cosmicBg.style.transform = `translateY(${rate}px)`;
    });
    
    // Animate stats bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statFills = entry.target.querySelectorAll('.stat-fill');
                statFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const factionSection = document.querySelector('.factions');
    if (factionSection) {
        observer.observe(factionSection);
    }
    
    // Add floating particles animation
    createFloatingParticles();
    
    // Initialize typewriter effect for hero title
    typewriterEffect();
});

// Initialize loading screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Initialize custom cursor
function initializeCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const interactiveElements = document.querySelectorAll('a, button, .character-card, .faction-card, .nav-link');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Update footer with current year
function updateFooterYear() {
    const footerText = document.getElementById('footerText');
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} Dewan Mukto and respective intellectual property owners.`;
}

// Character data
const characterData = {
    'Akira Tenshin': {
        faction: 'Akaminé Warrior',
        factionClass: 'akamine-text',
        imageClass: 'akamine-char',
        initial: 'A',
        description: 'A legendary swordsman who channels the power of his ancestors through ancient blade techniques. Born into a family of traditional warriors, Akira has mastered the art of ancestral communion, allowing him to draw upon the wisdom and strength of generations past.',
        stats: {
            strength: 95,
            speed: 88,
            defense: 92,
            magic: 75,
            intelligence: 85,
            charisma: 70
        },
        abilities: [
            {
                name: 'Ancestral Blade',
                description: 'Channels the spirits of warrior ancestors to enhance sword strikes with ethereal energy.'
            },
            {
                name: 'Spirit Vision',
                description: 'Sees through illusions and detects evil presence by communing with ancestral spirits.'
            },
            {
                name: 'Honor Strike',
                description: 'A devastating attack that grows stronger based on the user\'s adherence to the warrior code.'
            },
            {
                name: 'Guardian\'s Resolve',
                description: 'Becomes nearly invulnerable when protecting innocent lives or upholding tradition.'
            }
        ]
    },
    'Luna Shadowmend': {
        faction: 'Alkyne Diplomat',
        factionClass: 'alkyne-text',
        imageClass: 'alkyne-char',
        initial: 'L',
        description: 'A demon whisperer who bridges the gap between worlds, seeking harmony through understanding. Luna possesses the rare ability to communicate with demons and has dedicated her life to finding peaceful solutions to conflicts between humans and the supernatural.',
        stats: {
            strength: 65,
            speed: 90,
            defense: 70,
            magic: 95,
            intelligence: 98,
            charisma: 92
        },
        abilities: [
            {
                name: 'Demon Bond',
                description: 'Forms temporary alliances with demons, gaining access to their unique abilities.'
            },
            {
                name: 'Shadow Magic',
                description: 'Manipulates shadows and darkness to create illusions, teleport, and hide from enemies.'
            },
            {
                name: 'Peace Weaver',
                description: 'Calms hostile entities and can temporarily stop conflicts through diplomatic magic.'
            },
            {
                name: 'Dimensional Whisper',
                description: 'Communicates across parallel dimensions to gather information and call for aid.'
            }
        ]
    },
    'Zara Voltforge': {
        faction: 'Sirutov Commander',
        factionClass: 'sirutov-text',
        imageClass: 'sirutov-char',
        initial: 'Z',
        description: 'A tech-enhanced guardian who leads rescue operations across parallel dimensions. Zara combines cutting-edge technology with tactical brilliance to protect civilians and coordinate large-scale operations against supernatural threats.',
        stats: {
            strength: 80,
            speed: 85,
            defense: 95,
            magic: 60,
            intelligence: 95,
            charisma: 88
        },
        abilities: [
            {
                name: 'Quantum Shield',
                description: 'Generates protective barriers that can deflect both physical and magical attacks.'
            },
            {
                name: 'Tech Fusion',
                description: 'Integrates with advanced technology to enhance physical capabilities and access data networks.'
            },
            {
                name: 'Dimensional Gate',
                description: 'Opens portals between dimensions for rapid deployment and strategic positioning.'
            },
            {
                name: 'Command Protocol',
                description: 'Coordinates team actions with perfect precision, boosting allies\' effectiveness in combat.'
            }
        ]
    }
};

// Initialize character modals
function initializeCharacterModals() {
    const characterCards = document.querySelectorAll('.character-card');
    const modal = document.getElementById('characterModal');
    const closeModal = document.getElementById('closeModal');
    
    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const characterName = card.querySelector('.character-name').textContent;
            openCharacterModal(characterName);
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Open character modal
function openCharacterModal(characterName) {
    const character = characterData[characterName];
    if (!character) return;
    
    const modal = document.getElementById('characterModal');
    
    // Update modal content
    document.getElementById('modalCharacterName').textContent = characterName;
    document.getElementById('modalCharacterFaction').textContent = character.faction;
    document.getElementById('modalCharacterFaction').className = `modal-character-faction ${character.factionClass}`;
    document.getElementById('modalCharacterDescription').textContent = character.description;
    
    // Update character image
    const modalImage = document.getElementById('modalCharacterImage');
    const modalInitial = document.getElementById('modalCharacterInitial');
    modalImage.className = `modal-character-image ${character.imageClass}`;
    modalInitial.textContent = character.initial;
    
    // Update stats
    document.getElementById('statStrength').textContent = character.stats.strength;
    document.getElementById('statSpeed').textContent = character.stats.speed;
    document.getElementById('statDefense').textContent = character.stats.defense;
    document.getElementById('statMagic').textContent = character.stats.magic;
    document.getElementById('statIntelligence').textContent = character.stats.intelligence;
    document.getElementById('statCharisma').textContent = character.stats.charisma;
    
    // Update abilities
    const abilitiesContainer = document.getElementById('modalAbilities');
    abilitiesContainer.innerHTML = '';
    
    character.abilities.forEach(ability => {
        const abilityElement = document.createElement('div');
        abilityElement.className = 'ability';
        abilityElement.innerHTML = `
            <div class="ability-name">${ability.name}</div>
            <div class="ability-description">${ability.description}</div>
        `;
        abilitiesContainer.appendChild(abilityElement);
    });
    
    // Show modal
    modal.classList.add('active');
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Show faction details (could be expanded to show modal or detailed view)
function showFactionDetails(faction) {
    const factionData = {
        akamine: {
            name: 'The Akaminé',
            description: 'Warriors of tradition and honor, guided by ancestral wisdom.',
            specialties: ['Combat Mastery', 'Ancestral Magic', 'Honor Code', 'Traditional Weapons']
        },
        alkyne: {
            name: 'The Alkyne',
            description: 'Diplomatic demon slayers seeking harmony between worlds.',
            specialties: ['Demon Communication', 'Shadow Magic', 'Diplomacy', 'Peaceful Resolution']
        },
        sirutov: {
            name: 'The Sirutov',
            description: 'Technologically advanced guardians protecting all life.',
            specialties: ['Advanced Technology', 'Military Strategy', 'Rescue Operations', 'Unity']
        }
    };
    
    const data = factionData[faction];
    if (data) {
        // Could implement a modal or detailed view here
        console.log(`Selected faction: ${data.name}`);
        // For now, just add a subtle animation
        const card = document.querySelector(`[data-faction="${faction}"]`);
        card.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }
}

// Create floating particles effect
function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#4ecdc4' : '#ffc107'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0.7;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add CSS for random floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatRandom {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg); 
                opacity: 0.7; 
            }
            25% { 
                transform: translateY(-20px) translateX(10px) rotate(90deg); 
                opacity: 1; 
            }
            50% { 
                transform: translateY(-10px) translateX(-15px) rotate(180deg); 
                opacity: 0.5; 
            }
            75% { 
                transform: translateY(-30px) translateX(5px) rotate(270deg); 
                opacity: 0.8; 
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Typewriter effect for hero title
function typewriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Add cursor blink effect
            title.style.borderRight = '3px solid #4ecdc4';
            title.style.animation = 'blink 1s infinite';
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                title.style.borderRight = 'none';
                title.style.animation = 'none';
            }, 3000);
        }
    }, 100);
    
    // Add blink animation
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 50% { border-color: #4ecdc4; }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(blinkStyle);
}

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.world-feature, .character-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.world-feature, .character-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});
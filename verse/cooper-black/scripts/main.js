// Main application logic and initialization

class CooperBlackArchive {
  constructor() {
    this.characters = window.characterData || [];
    this.hexContainer = null;
    this.isLoading = true;
    
    this.init();
  }
  
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hexContainer = document.getElementById('hexContainer');
      this.showLoadingScreen();
      this.preloadImages().then(() => {
        this.createHexGrid();
        this.hideLoadingScreen();
        this.setupEventListeners();
      });
    });
  }
  
  showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('loadingProgress');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 150);
  }
  
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      this.isLoading = false;
      
      // Trigger entrance animations
      setTimeout(() => {
        this.animateGridEntrance();
      }, 300);
    }, 800);
  }
  
  async preloadImages() {
    const imagePromises = [];
    
    this.characters.forEach(character => {
      character.images.forEach(imageSrc => {
        imagePromises.push(new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = imageSrc;
        }));
      });
    });
    
    return Promise.all(imagePromises);
  }
  
  createHexGrid() {
    if (!this.hexContainer) return;
    
    this.hexContainer.innerHTML = '';
    
    // Create 3-2-3-2 pattern
    const pattern = [3, 2, 3, 2];
    let characterIndex = 0;
    
    pattern.forEach((count, rowIndex) => {
      const row = document.createElement('div');
      row.className = 'hex-row';
      
      // Offset every second row (rows 1 and 3, 0-indexed)
      if (rowIndex % 2 === 1) {
        row.classList.add('offset');
      }
      
      for (let i = 0; i < count && characterIndex < this.characters.length; i++) {
        const character = this.characters[characterIndex];
        const hexCard = this.createHexCard(character, characterIndex);
        row.appendChild(hexCard);
        characterIndex++;
      }
      
      this.hexContainer.appendChild(row);
    });
  }
  
  createHexCard(character, index) {
    const hexCard = document.createElement('div');
    hexCard.className = 'hex-card';
    hexCard.style.opacity = '0';
    
    hexCard.innerHTML = `
      <img src="${character.mainImg}" alt="${character.name}" class="hex-image" loading="lazy">
      <div class="hex-name">${character.name}</div>
    `;
    
    // Add hover effects
    hexCard.addEventListener('mouseenter', () => {
      this.onCardHover(hexCard, character);
    });
    
    hexCard.addEventListener('mouseleave', () => {
      this.onCardLeave(hexCard, character);
    });
    
    // Add click handler
    hexCard.addEventListener('click', () => {
      this.onCardClick(character);
    });
    
    return hexCard;
  }
  
  onCardHover(card, character) {
    // Update background based on faction
    this.updateBackground(character.faction);
    
    // Add subtle screen flash
    if (window.effectManager && Math.random() < 0.4) {
      window.effectManager.triggerScreenFlash();
    }
  }
  
  onCardLeave(card, character) {
    this.resetBackground();
  }
  
  onCardClick(character) {
    if (window.characterModal) {
      window.characterModal.open(character);
    }
    
    // Sound effect simulation (visual feedback)
    if (window.effectManager) {
      window.effectManager.triggerScreenFlash();
    }
  }
  
  updateBackground(faction) {
    const tessellationTiles = document.getElementById('tessellationTiles');
    tessellationTiles.className = 'tessellation-tiles';
    
    switch (faction) {
      case 'MBC':
        tessellationTiles.classList.add('mbc');
        break;
      case 'MIW':
        tessellationTiles.classList.add('miw');
        break;
      case 'USMC':
        tessellationTiles.classList.add('usmc');
        break;
      case '5474N':
        tessellationTiles.classList.add('n5474');
        break;
      default:
        tessellationTiles.classList.add('other');
        break;
    }
  }
  
  resetBackground() {
    const tessellationTiles = document.getElementById('tessellationTiles');
    tessellationTiles.className = 'tessellation-tiles';
  }
  
  animateGridEntrance() {
    const cards = this.hexContainer.querySelectorAll('.hex-card');
    
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
      }, index * 80);
    });
  }
  
  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.refreshGrid();
      }
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }
  
  refreshGrid() {
    const cards = this.hexContainer.querySelectorAll('.hex-card');
    
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = 'fadeInUp 0.6s ease forwards';
      }, index * 40);
    });
  }
  
  handleResize() {
    // Recalculate any responsive elements
    if (window.particleSystem) {
      window.particleSystem.resize();
    }
  }
}

// Initialize the application
const app = new CooperBlackArchive();

// Global error handling
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
});

// Performance monitoring
if (typeof performance !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    }, 0);
  });
}

// Export for global access
window.cooperBlackArchive = app;
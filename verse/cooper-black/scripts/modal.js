// Modal functionality and slideshow management

class CharacterModal {
  constructor() {
    this.modal = document.getElementById('modalOverlay');
    this.closeBtn = document.getElementById('modalClose');
    this.currentCharacter = null;
    this.slideshowInterval = null;
    this.currentSlide = 0;
    
    this.init();
  }
  
  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.close();
      }
    });
  }
  
  open(character) {
    this.currentCharacter = character;
    this.populateModal(character);
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    this.startSlideshow();
    
    // Update background based on faction
    this.updateBackground(character.faction);
    
    // Add glitch effect to title
    setTimeout(() => {
      const title = document.getElementById('modalName');
      if (window.effectManager) {
        window.effectManager.applyGlitchEffect(title);
      }
    }, 100);
  }
  
  close() {
    this.modal.classList.remove('show');
    document.body.style.overflow = '';
    this.stopSlideshow();
    this.currentCharacter = null;
    this.resetBackground();
  }
  
  populateModal(character) {
    document.getElementById('modalName').textContent = character.name;
    document.getElementById('modalNameValue').textContent = character.name;
    document.getElementById('modalFaction').textContent = character.faction;
    document.getElementById('modalWeapon').textContent = character.weapon;
    document.getElementById('modalSkill').textContent = character.skill;
    document.getElementById('modalBio').textContent = character.bio;
    
    // Setup slideshow
    this.setupSlideshow(character.images);
  }
  
  setupSlideshow(images) {
    const slideshow = document.getElementById('imageSlideshow');
    
    slideshow.innerHTML = '';
    
    images.forEach((imageSrc, index) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.className = `slideshow-image ${index === 0 ? 'active' : ''}`;
      img.alt = `${this.currentCharacter.name} image ${index + 1}`;
      slideshow.appendChild(img);
    });
    
    this.currentSlide = 0;
  }
  
  startSlideshow() {
    if (this.currentCharacter && this.currentCharacter.images.length > 1) {
      this.slideshowInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }
  
  stopSlideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
      this.slideshowInterval = null;
    }
  }
  
  nextSlide() {
    const images = document.querySelectorAll('.slideshow-image');
    const nextIndex = (this.currentSlide + 1) % this.currentCharacter.images.length;
    
    // Remove active class from current slide
    images[this.currentSlide].classList.remove('active');
    
    // Add active class to new slide with motion blur effect
    setTimeout(() => {
      images[nextIndex].classList.add('active');
    }, 100);
    
    this.currentSlide = nextIndex;
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
}

// Initialize modal when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  window.characterModal = new CharacterModal();
});
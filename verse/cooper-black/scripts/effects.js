// Special effects and interactions

class EffectManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupClickEffects();
    this.setupGlitchEffects();
    this.setupDiagonalBackground();
  }
  
  setupClickEffects() {
    document.addEventListener('click', (e) => {
      this.createShockwaveEffect(e.clientX, e.clientY);
      
      if (window.particleSystem) {
        window.particleSystem.addBurst(e.clientX, e.clientY);
      }
    });
  }
  
  createShockwaveEffect(x, y) {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.left = (x - 15) + 'px';
    shockwave.style.top = (y - 15) + 'px';
    
    document.body.appendChild(shockwave);
    
    setTimeout(() => {
      shockwave.remove();
    }, 700);
  }
  
  setupGlitchEffects() {
    const glitchElements = [
      '.hex-name', 
      '.character-name', 
      '.stat-value', 
      '.section-title', 
      '.logo'
    ];
    
    setInterval(() => {
      const randomSelector = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      const elements = document.querySelectorAll(randomSelector);
      
      if (elements.length > 0 && Math.random() < 0.2) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        this.applyGlitchEffect(randomElement);
      }
    }, 5000);
  }
  
  applyGlitchEffect(element) {
    if (!element || !element.textContent) return;
    
    const originalText = element.textContent;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iterations = 0;
    
    element.classList.add('animate-glitch');
    
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');
      
      iterations += 1/3;
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
        element.classList.remove('animate-glitch');
      }
    }, 50);
  }
  
  setupDiagonalBackground() {
    const layers = document.querySelectorAll('.diagonal-text-layer');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });
    
    const updateParallax = () => {
      layers.forEach((layer, index) => {
        const speed = parseFloat(layer.dataset.speed);
        const x = (mouseX - 0.5) * speed * 30;
        const y = (mouseY - 0.5) * speed * 15;
        
        layer.style.transform = `rotate(-45deg) translate3d(${x}px, ${y}px, 0)`;
      });
      
      requestAnimationFrame(updateParallax);
    };
    
    updateParallax();
  }
  
  createScanline() {
    const scanline = document.createElement('div');
    scanline.style.cssText = `
      position: fixed;
      top: ${Math.random() * window.innerHeight}px;
      left: -100px;
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ffd700, transparent);
      z-index: 9997;
      animation: scanline 2s linear;
      pointer-events: none;
      box-shadow: 0 0 10px #ffd700;
    `;
    
    document.body.appendChild(scanline);
    
    setTimeout(() => {
      scanline.remove();
    }, 2000);
  }
  
  triggerScreenFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 215, 0, 0.1);
      z-index: 9996;
      pointer-events: none;
    `;
    
    document.body.appendChild(flash);
    
    flash.animate([
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 150,
      easing: 'ease-in-out'
    }).addEventListener('finish', () => {
      flash.remove();
    });
  }
}

// Initialize effects when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  window.effectManager = new EffectManager();
  
  // Periodic special effects
  setInterval(() => {
    if (Math.random() < 0.08) {
      window.effectManager.createScanline();
    }
  }, 8000);
});
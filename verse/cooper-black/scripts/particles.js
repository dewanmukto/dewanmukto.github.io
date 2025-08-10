// Particle System - Background particle effects

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 30;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }
  
  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      color: this.getRandomColor(),
      pulse: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2
    };
  }
  
  getRandomColor() {
    const colors = ['#ffd700', '#ffed4e', '#ff8c00', '#2563eb'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  update() {
    this.particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Pulse effect
      particle.angle += particle.pulse;
      particle.opacity = (Math.sin(particle.angle) + 1) * 0.15 + 0.05;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    });
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = particle.color;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
    
    // Draw connections between nearby particles
    this.drawConnections();
  }
  
  drawConnections() {
    this.particles.forEach((particle, index) => {
      for (let i = index + 1; i < this.particles.length; i++) {
        const otherParticle = this.particles[i];
        const distance = Math.hypot(
          particle.x - otherParticle.x,
          particle.y - otherParticle.y
        );
        
        if (distance < 120) {
          const opacity = 1 - (distance / 120);
          this.ctx.save();
          this.ctx.globalAlpha = opacity * 0.15;
          this.ctx.strokeStyle = '#ffd700';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    });
  }
  
  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
  
  addBurst(x, y) {
    for (let i = 0; i < 8; i++) {
      const particle = this.createParticle();
      particle.x = x + (Math.random() - 0.5) * 40;
      particle.y = y + (Math.random() - 0.5) * 40;
      particle.speedX = (Math.random() - 0.5) * 2;
      particle.speedY = (Math.random() - 0.5) * 2;
      particle.size = Math.random() * 4 + 2;
      particle.opacity = 0.6;
      particle.color = '#ffd700';
      
      this.particles.push(particle);
      
      // Remove after animation
      setTimeout(() => {
        const index = this.particles.indexOf(particle);
        if (index > -1) {
          this.particles.splice(index, 1);
        }
      }, 1500);
    }
  }
}

// Initialize particle system when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    window.particleSystem = new ParticleSystem(canvas);
  }
});
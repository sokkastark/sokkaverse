import React, { useEffect, useRef } from 'react';

const ParticleEffect = () => {
  const canvasRef = useRef(null); // Reference to the canvas HTML element

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists
    const ctx = canvas.getContext('2d');

    let particles = [];
    const numParticles = 80; // Number of particles (adjust for density)
    const particleColor = 'rgba(0, 255, 102, 0.4)'; // Subtle green color with transparency
    const maxRadius = 1.5; // Max size of particles

    // Particle class definition
    class Particle {
      constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx; // velocity x
        this.dy = dy; // velocity y
        this.opacity = Math.random() * 0.8 + 0.2; // Random opacity for subtle variations
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor.replace(/[^,]+(?=\))/, this.opacity); // Set fill style with individual opacity
        ctx.fill();
      }

      update() {
        // Move particle
        this.x += this.dx;
        this.y += this.dy;

        // Wrap around edges (if particle goes off one side, it reappears on the other)
        if (this.x - this.radius > canvas.width) {
          this.x = -this.radius;
        } else if (this.x + this.radius < 0) {
          this.x = canvas.width + this.radius;
        }
        if (this.y - this.radius > canvas.height) {
          this.y = -this.radius;
        } else if (this.y + this.radius < 0) {
          this.y = canvas.height + this.radius;
        }

        this.draw();
      }
    }

    // Initialize particles
    function init() {
      particles = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * maxRadius;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 0.2 + 0.05; // Random slow speed
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        particles.push(new Particle(x, y, radius, dx, dy));
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas

      particles.forEach(particle => {
        particle.update();
      });
    }

    // Handle resize
    const handleResize = () => {
      init(); // Re-initialize particles and resize canvas on window resize
    };

    init(); // Initial setup
    animate(); // Start animation loop

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <canvas ref={canvasRef} className="particle-effect-canvas"></canvas>
  );
};

export default ParticleEffect;
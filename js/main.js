/**
 * Indian Wedding Invitation - Enhanced Interactive Experience
 * Mobile-first approach with rich cultural animations
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initializeCurtainReveal();
    initializeSparkles();
    initializeMarigoldPetals();
    initializeReveals();
    initializeDiyaAnimations();
    initializeInteractions();
    initializeActions();
    initializeFireworks();
    initializeTouchEffects();
  }, { passive: true });

  /**
   * Curtain Reveal Animation
   */
  function initializeCurtainReveal() {
    if (prefersReducedMotion) {
      const curtains = document.querySelectorAll('.curtain-left, .curtain-right');
      curtains.forEach(curtain => curtain.style.display = 'none');
      return;
    }

    // Remove curtains after animation completes
    setTimeout(() => {
      const curtains = document.querySelectorAll('.curtain-left, .curtain-right');
      curtains.forEach(curtain => {
        curtain.style.display = 'none';
      });
    }, 2500);
  }

  /**
   * Enhanced Sparkles with Indian Wedding Colors
   */
  function initializeSparkles() {
    if (prefersReducedMotion) return;

    const canvas = document.getElementById('sparkles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = isMobile ? 30 : 60;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          hue: Math.random() < 0.5 ? 45 : 30, // Gold and orange hues
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw sparkle
        const opacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse));
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Create gradient for sparkle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, 1)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add cross sparkle effect
        ctx.strokeStyle = `hsla(${particle.hue}, 100%, 70%, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size * 2, particle.y);
        ctx.lineTo(particle.x + particle.size * 2, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size * 2);
        ctx.lineTo(particle.x, particle.y + particle.size * 2);
        ctx.stroke();
        
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('resize', resize, { passive: true });
    resize();
    animate();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  /**
   * Marigold Petals Falling Animation
   */
  function initializeMarigoldPetals() {
    if (prefersReducedMotion) return;

    const canvas = document.getElementById('petals');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let petals = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createPetal() {
      return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 2 + 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.5 + 0.5,
        color: Math.random() < 0.7 ? '#FFA500' : '#FFD700' // Orange and gold marigolds
      };
    }

    function drawPetal(petal) {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      
      // Draw marigold petal shape
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Add texture
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(-petal.size * 0.3, -petal.size * 0.2, petal.size * 0.3, petal.size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new petals occasionally
      if (Math.random() < 0.05 && petals.length < (isMobile ? 15 : 30)) {
        petals.push(createPetal());
      }

      // Update and draw petals
      petals = petals.filter(petal => {
        // Update position
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;
        
        // Remove if off screen
        if (petal.y > canvas.height + 20) {
          return false;
        }

        drawPetal(petal);
        return true;
      });

      animationId = requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('resize', resize, { passive: true });
    resize();
    animate();

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  /**
   * Reveal Animations on Scroll
   */
  function initializeReveals() {
    if (prefersReducedMotion) return;

    const elements = document.querySelectorAll(
      '.header > *, .event-details, .actions, .family-section, .blessing-text, .footer'
    );

    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /**
   * Enhanced Diya Animations
   */
  function initializeDiyaAnimations() {
    if (prefersReducedMotion) return;

    const diyas = document.querySelectorAll('.diya');
    
    diyas.forEach((diya, index) => {
      // Add random delay to flame flicker
      const flame = diya.querySelector('.flame');
      if (flame) {
        flame.style.animationDelay = `${index * 0.2}s`;
      }

      // Add glow effect on hover/touch
      if (!isMobile) {
        diya.addEventListener('mouseenter', () => {
          diya.style.filter = 'drop-shadow(0 0 20px rgba(255, 153, 51, 1))';
        });

        diya.addEventListener('mouseleave', () => {
          diya.style.filter = 'drop-shadow(0 0 10px rgba(255, 153, 51, 0.8))';
        });
      }
    });
  }

  /**
   * Interactive Elements
   */
  function initializeInteractions() {
    // Ganesha blessing interaction
    const ganeshaSymbol = document.querySelector('.ganesha-symbol');
    if (ganeshaSymbol) {
      ganeshaSymbol.addEventListener('click', () => {
        ganeshaSymbol.style.animation = 'none';
        setTimeout(() => {
          ganeshaSymbol.style.animation = 'divineGlow 3s ease-in-out infinite';
        }, 10);
        
        // Create blessing particles
        createBlessingParticles(ganeshaSymbol);
      });
    }

    // Couple names interaction
    const coupleNames = document.querySelector('.couple-names');
    if (coupleNames) {
      coupleNames.addEventListener('click', () => {
        triggerFireworks(3);
      });
    }
  }

  /**
   * Create Blessing Particles
   */
  function createBlessingParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = ['✨', '🌟', '⭐', '💫'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: blessingFloat 2s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }
  }

  /**
   * Action Buttons
   */
  function initializeActions() {
    const venue = 'SANJEEVA SHETTY MULTIPURPOSE HALL, KADALAKERE, MOODABIDRI';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

    const title = 'Wedding: Prathiksha & Hariprasad';
    const start = '20251024T114200';
    const end = '20251024T134200';
    const details = 'Join us in celebrating the joyous union of Prathiksha & Hariprasad at this auspicious occasion.';
    const calendarUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${start}/${end}` +
      `&details=${encodeURIComponent(details)}` +
      `&location=${encodeURIComponent(venue)}`;

    // Maps button
    const mapsBtn = document.getElementById('mapsBtn');
    if (mapsBtn) {
      mapsBtn.addEventListener('click', () => {
        animateButton(mapsBtn);
        window.open(mapsUrl, '_blank', 'noopener');
      });
    }

    // Calendar button
    const calendarBtn = document.getElementById('calendarBtn');
    if (calendarBtn) {
      calendarBtn.addEventListener('click', () => {
        animateButton(calendarBtn);
        window.open(calendarUrl, '_blank', 'noopener');
      });
    }

    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        animateButton(shareBtn);
        
        const shareData = {
          title: 'Wedding Invitation',
          text: '🎊 You are invited to the wedding of Prathiksha & Hariprasad! 🎊\n\n📅 Date: October 24, 2025\n⏰ Time: 11:42 AM\n📍 Venue: Sanjeeva Shetty Multipurpose Hall, Moodabidri',
          url: window.location.href
        };

        try {
          if (navigator.share && isMobile) {
            await navigator.share(shareData);
          } else {
            // Fallback to clipboard
            const text = `${shareData.text}\n\n🔗 ${shareData.url}`;
            await navigator.clipboard.writeText(text);
            showToast('Invitation link copied! 📋');
          }
        } catch (err) {
          console.log('Share failed:', err);
          showToast('Please copy the link manually');
        }
      });
    }
  }

  /**
   * Button Animation
   */
  function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 200);
  }

  /**
   * Toast Notification
   */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: #8B0000;
      padding: 12px 24px;
      border-radius: 50px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: toastSlideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'toastSlideDown 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /**
   * Fireworks Effect
   */
  function initializeFireworks() {
    if (prefersReducedMotion) return;

    // Create CSS for fireworks animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blessingFloat {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(
            ${Math.random() * 200 - 100}px,
            -150px
          ) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes toastSlideUp {
        from {
          transform: translateX(-50%) translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes toastSlideDown {
        from {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(-50%) translateY(100%);
          opacity: 0;
        }
      }
      
      .firework {
        position: fixed;
        pointer-events: none;
        z-index: 9997;
      }
      
      .firework-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        animation: fireworkExplode 1s ease-out forwards;
      }
      
      @keyframes fireworkExplode {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Trigger Fireworks
   */
  function triggerFireworks(count = 1) {
    if (prefersReducedMotion) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        createFirework(x, y);
      }, i * 300);
    }
  }

  /**
   * Create Single Firework
   */
  function createFirework(x, y) {
    const container = document.querySelector('.fireworks-container');
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00CED1'];
    const particleCount = isMobile ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.transform = `translate(${tx}px, ${ty}px)`;
      particle.style.boxShadow = `0 0 6px ${particle.style.backgroundColor}`;
      
      firework.appendChild(particle);
    }
    
    container.appendChild(firework);
    
    // Remove after animation
    setTimeout(() => firework.remove(), 1000);
  }

  /**
   * Touch Effects for Mobile
   */
  function initializeTouchEffects() {
    if (!isMobile) return;

    let touchTimeout;
    
    document.addEventListener('touchstart', (e) => {
      clearTimeout(touchTimeout);
      
      // Create ripple effect at touch point
      const touch = e.touches[0];
      createRipple(touch.clientX, touch.clientY);
    }, { passive: true });

    function createRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
        pointer-events: none;
        z-index: 9996;
        transform: translate(-50%, -50%);
        animation: rippleExpand 0.6s ease-out forwards;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rippleExpand {
          to {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `;
      
      if (!document.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', 'true');
        document.head.appendChild(style);
      }
      
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  }

  /**
   * Performance Monitoring
   */
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Log performance metrics
      if (window.performance && performance.getEntriesByType) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }
      }
    });
  }

})();

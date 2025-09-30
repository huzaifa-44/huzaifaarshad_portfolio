// Generative backgrounds for portfolio project cards (Canvas-based)

$(document).ready(function() {
    class PortfolioCanvas {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.numParticles = 15;
            this.particleSize = 1.5;
            this.particleSpeed = 0.2;
            this.connectionDistance = 60;
            this.animationFrameId = null;

            this.resizeCanvas();
            this.initParticles();
            this.animate = this.animate.bind(this); // Bind 'this' for requestAnimationFrame
            this.startAnimation();

            $(window).on('resize', () => this.resizeCanvas());
        }

        resizeCanvas() {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
            this.initParticles(); // Re-initialize particles on resize
        }

        initParticles() {
            this.particles = [];
            for (let i = 0; i < this.numParticles; i++) {
                this.particles.push(new Particle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    this.particleSpeed
                ));
            }
        }

        drawConnections() {
            for (let i = 0; i < this.numParticles; i++) {
                for (let j = i + 1; j < this.numParticles; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                    if (dist < this.connectionDistance) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = `rgba(255, 0, 230, ${p1.alpha * p2.alpha * (1 - dist / this.connectionDistance)})`; // Neon pink
                        this.ctx.lineWidth = 0.3;
                        this.ctx.stroke();
                    }
                }
            }
        }

        animate() {
            this.animationFrameId = requestAnimationFrame(this.animate);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'; // Faint trail effect
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.drawConnections();
            this.particles.forEach(p => {
                p.update(this.canvas.width, this.canvas.height);
                p.draw(this.ctx, this.particleSize);
            });
        }

        startAnimation() {
            if (!this.animationFrameId) {
                this.animate();
            }
        }

        stopAnimation() {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }
    }

    // Particle class (reused from hero-scene, but adapted for local scope)
    class Particle {
        constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * speed;
            this.vy = (Math.random() - 0.5) * speed;
            this.alpha = Math.random() * 0.5 + 0.5; // Slightly less opaque
            this.color = `rgba(255, 0, 230, ${this.alpha})`; // Neon pink
        }

        update(width, height) {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) {
                this.vx *= -1;
            }
            if (this.y < 0 || this.y > height) {
                this.vy *= -1;
            }
        }

        draw(ctx, size) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialize a PortfolioCanvas for each .portfolio-canvas element
    $('.portfolio-canvas').each(function() {
        new PortfolioCanvas(this);
    });
});

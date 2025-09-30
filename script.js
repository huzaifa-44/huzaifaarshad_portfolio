// script.js

$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });

    // Fade-in animations for About section
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('is-visible');
            }
        });
    });
    // Trigger on load in case elements are already in view
    $(window).scroll();

    // Contact Form Validation and Focus Animation
    $('#contact-form input, #contact-form textarea').on('focus', function() {
        $(this).css({
            'border-color': 'var(--primary-color)',
            'box-shadow': '0 0 10px rgba(0, 230, 230, 0.5)',
            'background-color': 'rgba(0, 230, 230, 0.05)'
        });
    }).on('blur', function() {
        $(this).css({
            'border-color': 'var(--glass-border)',
            'box-shadow': 'none',
            'background-color': 'rgba(255, 255, 255, 0.05)'
        });
        // Basic validation on blur
        if ($(this).prop('required') && $(this).val() === '') {
            $(this).css({
                'border-color': 'red',
                'box-shadow': '0 0 10px rgba(255, 0, 0, 0.5)'
            });
        } else if ($(this).attr('type') === 'email' && !isValidEmail($(this).val())) {
            $(this).css({
                'border-color': 'orange',
                'box-shadow': '0 0 10px rgba(255, 165, 0, 0.5)'
            });
        }
    });

    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        $(this).find('input[required], textarea[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                $(this).css({
                    'border-color': 'red',
                    'box-shadow': '0 0 10px rgba(255, 0, 0, 0.5)'
                });
            }
        });
        $(this).find('input[type="email"]').each(function() {
            if (!isValidEmail($(this).val())) {
                isValid = false;
                $(this).css({
                    'border-color': 'orange',
                    'box-shadow': '0 0 10px rgba(255, 165, 0, 0.5)'
                });
            }
        });

        if (isValid) {
            alert('Message sent successfully! (Simulated)');
            // In a real application, you would send this data to a server.
            // For this exercise, we'll simulate XML storage.
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            };
            console.log('Contact Form Data (XML simulation):', objectToXml('contact_submission', formData));
            $(this)[0].reset();
        } else {
            alert('Please fill in all required fields and ensure valid inputs.');
        }
    });

    // Newsletter Signup Validation and XML Storage Simulation
    $('#newsletter-form').on('submit', function(event) {
        event.preventDefault();
        const emailInput = $('#newsletter-email');
        if (isValidEmail(emailInput.val())) {
            alert('Subscribed successfully! (Simulated)');
            const newsletterData = {
                email: emailInput.val()
            };
            console.log('Newsletter Data (XML simulation):', objectToXml('newsletter_signup', newsletterData));
            emailInput.val('');
        } else {
            alert('Please enter a valid email address.');
            emailInput.css({
                'border-color': 'red',
                'box-shadow': '0 0 10px rgba(255, 0, 0, 0.5)'
            });
        }
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function objectToXml(rootName, obj) {
        let xml = `<${rootName}>`;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                xml += `<${key}>${obj[key]}</${key}>`;
            }
        }
        xml += `</${rootName}>`;
        return xml;
    }

    // Load Technologies from XML
    function loadTechnologies() {
        $.ajax({
            type: "GET",
            url: "data/technologies.xml",
            dataType: "xml",
            success: function(xml) {
                const technologiesGrid = $('#technologies-grid');
                $(xml).find('category').each(function() {
                    const categoryName = $(this).attr('name');
                    $(this).find('tech').each(function() {
                        const techName = $(this).attr('name');
                        const techIcon = $(this).attr('icon');
                        const techDescription = $(this).attr('description');

                        const techItem = `
                            <div class="tech-item">
                                <img src="${techIcon}" alt="${techName} Icon">
                                <span>${techName}</span>
                                <div class="tech-tooltip">${techDescription}</div>
                            </div>
                        `;
                        technologiesGrid.append(techItem);
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading technologies.xml:", status, error);
            }
        });
    }
    loadTechnologies();

    // Generative 3D Art for Hero Section (using Canvas for a particle galaxy effect)
    const heroCanvas = document.getElementById('hero-canvas');
    const heroCtx = heroCanvas.getContext('2d');
    let particles = [];
    const numParticles = 150; // More particles for a denser galaxy

    function resizeHeroCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z; // Z-coordinate for pseudo-3D effect
            this.size = Math.random() * 2 + 0.5; // Smaller particles
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.speedZ = (Math.random() - 0.5) * 0.01; // Slower Z-speed
            this.color = `hsl(${Math.random() * 360}, 80%, 70%)`; // Brighter, varied colors
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.z += this.speedZ;

            // Wrap particles around the screen
            if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;

            // Reset particle if it moves too far in Z or fades out
            if (this.z > 1 || this.z < 0 || this.opacity <= 0) {
                this.x = Math.random() * heroCanvas.width;
                this.y = Math.random() * heroCanvas.height;
                this.z = Math.random();
                this.opacity = Math.random();
                this.size = Math.random() * 2 + 0.5;
            }
            this.opacity -= 0.005; // Gradually fade out
        }

        draw() {
            const scale = 1 + this.z * 2; // Scale based on Z-position
            heroCtx.fillStyle = this.color;
            heroCtx.globalAlpha = this.opacity;
            heroCtx.beginPath();
            heroCtx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
            heroCtx.fill();
            heroCtx.globalAlpha = 1; // Reset alpha
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(
                Math.random() * heroCanvas.width,
                Math.random() * heroCanvas.height,
                Math.random() // Initial random Z
            ));
        }
    }

    function animateParticles() {
        heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        heroCtx.fillStyle = 'rgba(10, 10, 10, 0.1)'; // Faint trail effect
        heroCtx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeHeroCanvas);
    resizeHeroCanvas();
    initParticles();
    animateParticles();

    // Small generative backgrounds for Portfolio projects (animated shapes)
    $('.project-canvas').each(function() {
        const projectCanvas = this;
        const projectCtx = projectCanvas.getContext('2d');
        let animationFrameId;

        function resizeProjectCanvas() {
            projectCanvas.width = projectCanvas.parentElement.clientWidth;
            projectCanvas.height = projectCanvas.parentElement.clientHeight;
        }

        class Shape {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 10 + 5;
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;
                this.color = `hsla(${Math.random() * 360}, 70%, 60%, 0.2)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                if (this.x < 0 || this.x > projectCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > projectCanvas.height) this.speedY *= -1;
            }

            draw() {
                projectCtx.save();
                projectCtx.translate(this.x, this.y);
                projectCtx.rotate(this.rotation);
                projectCtx.fillStyle = this.color;
                projectCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size); // Draw a square
                projectCtx.restore();
            }
        }

        let shapes = [];
        const numShapes = 10;

        function initProjectShapes() {
            shapes = [];
            for (let i = 0; i < numShapes; i++) {
                shapes.push(new Shape(
                    Math.random() * projectCanvas.width,
                    Math.random() * projectCanvas.height
                ));
            }
        }

        function animateProjectBackground() {
            projectCtx.clearRect(0, 0, projectCanvas.width, projectCanvas.height);
            projectCtx.fillStyle = 'rgba(10, 10, 10, 0.05)'; // Faint trail
            projectCtx.fillRect(0, 0, projectCanvas.width, projectCanvas.height);

            for (let i = 0; i < shapes.length; i++) {
                shapes[i].update();
                shapes[i].draw();
            }
            animationFrameId = requestAnimationFrame(animateProjectBackground);
        }

        $(window).on('resize', resizeProjectCanvas);
        resizeProjectCanvas();
        initProjectShapes();
        animateProjectBackground();
    });

    // Immersive 3D Scrolling (Parallax and scroll-triggered animations)
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();

    // Parallax for Hero Section background
    // Adjust parallax effect based on scroll position
    const parallaxSpeed = 0.3; // Controls how fast the background moves relative to scroll
    $('#hero-canvas').css('transform', 'translateY(' + scrolled * parallaxSpeed + 'px)');

        // Section reveal animations (already handled by CSS, just ensure class is toggled)
        $('section:not(#hero)').each(function() {
            var sectionTop = $(this).offset().top;
            var windowHeight = $(window).height();
            if (scrolled + windowHeight * 0.8 > sectionTop) {
                $(this).addClass('is-visible');
            } else {
                $(this).removeClass('is-visible');
            }
        });

        // Portfolio project card animations (3D tilt on scroll)
        $('.portfolio-carousel').each(function() {
            const $carousel = $(this);
            const carouselOffset = $carousel.offset().top;
            const carouselHeight = $carousel.outerHeight();
            const windowHeight = $(window).height();

            // Calculate how much of the carousel is in view
            const scrollFactor = Math.max(0, Math.min(1, (scrolled + windowHeight - carouselOffset) / (windowHeight + carouselHeight)));

            $carousel.find('.project-card').each(function() {
                const $card = $(this);
                const cardOffset = $card.offset().left;
                const scrollLeft = $carousel.scrollLeft();
                const containerWidth = $carousel.width();

                // Calculate position relative to the center of the carousel's visible area
                const cardCenter = cardOffset - scrollLeft + $card.width() / 2;
                const viewportCenter = containerWidth / 2;
                const distance = cardCenter - viewportCenter;

                // Apply 3D transform based on distance from center
                const maxRotation = 15; // degrees
                const maxScale = 1.05;
                const rotation = (distance / viewportCenter) * maxRotation * -1; // Invert rotation for better effect
                const scale = 1 - Math.abs(distance / (viewportCenter * 2)) * (maxScale - 1);
                const opacity = 1 - Math.abs(distance / (viewportCenter * 1.5)) * 0.4; // Fade out slightly at edges

                $card.css({
                    'transform': `perspective(1000px) rotateY(${rotation}deg) scale(${scale})`,
                    'opacity': Math.max(0.6, opacity) // Ensure minimum opacity
                });
            });
        });
    });

    // Initial scroll to apply animations
    $(window).scroll();
});

// General JavaScript functionalities for Kaelorva Solution Portfolio

$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - $('#main-header').outerHeight()
            }, 800);
        }
    });

    // Header sticky effect (already handled by CSS, but can add JS for more complex effects)
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#main-header').addClass('scrolled');
        } else {
            $('#main-header').removeClass('scrolled');
        }
    });

    // About Section fade-in animation on scroll
    const aboutSection = $('#about .fade-in');
    $(window).on('scroll', function() {
        const sectionTop = aboutSection.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();
        if (windowBottom > sectionTop + 50) { // Trigger when 50px of the section is visible
            aboutSection.addClass('active');
        }
    });

    // Contact Form Validation with jQuery
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        // Name validation
        const nameInput = $('#name');
        if (nameInput.val().trim() === '') {
            alert('Please enter your name.');
            nameInput.focus();
            isValid = false;
            return;
        }

        // Email validation
        const emailInput = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.val().trim())) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            isValid = false;
            return;
        }

        // Message validation
        const messageInput = $('#message');
        if (messageInput.val().trim() === '') {
            alert('Please enter your message.');
            messageInput.focus();
            isValid = false;
            return;
        }

        if (isValid) {
            alert('Thank you for your message! We will get back to you shortly.');
            // Here you would typically send the form data to a server
            // For this project, we'll just simulate success.
            this.reset(); // Clear the form
        }
    });

    // Newsletter Form Validation with jQuery (simulation)
    $('#newsletter-form').on('submit', function(event) {
        event.preventDefault();
        const emailInput = $(this).find('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput.val().trim())) {
            alert('Please enter a valid email address for the newsletter.');
            emailInput.focus();
        } else {
            alert('Thank you for subscribing to our newsletter!');
            // Simulate XML storage or API call
            console.log('Newsletter subscription email:', emailInput.val());
            emailInput.val(''); // Clear input
        }
    });

    // Input focus animation for contact form
    $('.glowing-form input, .glowing-form textarea').on('focus', function() {
        $(this).css({
            'border-color': 'var(--secondary-color)',
            'box-shadow': '0 0 15px rgba(255, 0, 230, 0.7)'
        });
    }).on('blur', function() {
        $(this).css({
            'border-color': 'rgba(255, 255, 255, 0.2)',
            'box-shadow': 'none'
        });
    });

    // Parallax Scrolling (simple example, more complex effects will be in hero-scene.js)
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + scrolled * 0.5 + 'px)');
        // Add more parallax effects for other sections here if needed
    });

    // Scroll-triggered animations for portfolio items (reveal)
    $('.portfolio-item').each(function() {
        const portfolioItem = $(this);
        $(window).on('scroll', function() {
            const itemTop = portfolioItem.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > itemTop + 100) {
                portfolioItem.css({
                    'opacity': 1,
                    'transform': 'translateY(0) scale(1)'
                });
            } else {
                portfolioItem.css({
                    'opacity': 0,
                    'transform': 'translateY(50px) scale(0.95)'
                });
            }
        });
        // Initial state for portfolio items
        portfolioItem.css({
            'opacity': 0,
            'transform': 'translateY(50px) scale(0.95)',
            'transition': 'opacity 0.8s ease-out, transform 0.8s ease-out'
        });
    });

    // Trigger initial scroll to check for elements already in view
    $(window).trigger('scroll');
});

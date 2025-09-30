// menu.js

$(document).ready(function() {
    const $hamburger = $('.hamburger-menu');
    const $megaMenuDropdown = $('.mega-menu-dropdown');
    const $mainNavMenu = $('.main-nav .menu');

    // Toggle Mega Menu on hamburger click
    $hamburger.on('click', function() {
        $(this).toggleClass('active');
        $megaMenuDropdown.toggleClass('active');
        $('body').toggleClass('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close Mega Menu when a link is clicked (for mobile)
    $megaMenuDropdown.find('a').on('click', function() {
        $hamburger.removeClass('active');
        $megaMenuDropdown.removeClass('active');
        $('body').removeClass('no-scroll');
    });

    // Show specific Mega Menu column on desktop when hovering over main nav links
    $mainNavMenu.find('li > a').on('mouseenter', function() {
        if ($(window).width() > 992) { // Only for desktop
            const trigger = $(this).data('megamenu-trigger');
            if (trigger) {
                $megaMenuDropdown.addClass('active');
                $megaMenuDropdown.find('.mega-menu-column').removeClass('active');
                $(`#mega-menu-${trigger}`).addClass('active');
            } else {
                $megaMenuDropdown.removeClass('active');
            }
        }
    });

    // Hide Mega Menu when mouse leaves either the main nav or the mega menu itself
    $('.sticky-header').on('mouseleave', function() {
        if ($(window).width() > 992) {
            setTimeout(function() {
                if (!$megaMenuDropdown.is(':hover') && !$mainNavMenu.is(':hover')) {
                    $megaMenuDropdown.removeClass('active');
                    $megaMenuDropdown.find('.mega-menu-column').removeClass('active');
                }
            }, 100); // Small delay to allow moving between nav item and mega menu
        }
    });

    $megaMenuDropdown.on('mouseleave', function() {
        if ($(window).width() > 992) {
            $megaMenuDropdown.removeClass('active');
            $megaMenuDropdown.find('.mega-menu-column').removeClass('active');
        }
    });

    // Keyboard accessibility for Mega Menu (example for hamburger)
    $hamburger.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Close menu if escape key is pressed
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $megaMenuDropdown.hasClass('active')) {
            $hamburger.removeClass('active');
            $megaMenuDropdown.removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });

    // Adjust menu display based on window resize
    $(window).on('resize', function() {
        if ($(window).width() > 992) {
            $hamburger.removeClass('active');
            $megaMenuDropdown.removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });
});

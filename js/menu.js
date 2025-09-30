// Mega Menu functionality for Kaelorva Solution Portfolio

$(document).ready(function() {
    const $hamburger = $('.hamburger-menu');
    const $navList = $('.nav-list');
    const $mainNav = $('#main-nav');
    const $hasSubmenu = $('.nav-item.has-submenu');
    const $megaMenu = $('.mega-menu');

    // Toggle hamburger menu and navigation on click
    $hamburger.on('click', function() {
        $(this).toggleClass('active');
        $navList.toggleClass('active');
        $('body').toggleClass('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close menu when a nav item is clicked (for mobile)
    $navList.find('a').on('click', function() {
        if ($hamburger.is(':visible')) { // Only close if hamburger menu is active (mobile view)
            $hamburger.removeClass('active');
            $navList.removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });

    // Mega Menu hover/focus functionality for desktop
    $hasSubmenu.on('mouseenter focusin', function() {
        if (!$hamburger.is(':visible')) { // Only for desktop view
            $(this).addClass('active'); // Add active class to parent nav-item
        }
    }).on('mouseleave focusout', function() {
        if (!$hamburger.is(':visible')) { // Only for desktop view
            $(this).removeClass('active'); // Remove active class from parent nav-item
        }
    });

    // Toggle mega menu on click for mobile
    $hasSubmenu.find('> a').on('click', function(e) {
        if ($hamburger.is(':visible')) { // Only for mobile view
            e.preventDefault(); // Prevent default link behavior
            const $parentItem = $(this).parent('.nav-item');
            $parentItem.toggleClass('active'); // Toggle active class on parent nav-item
            // Close other open submenus
            $hasSubmenu.not($parentItem).removeClass('active');
        }
    });

    // Keyboard accessibility for mega menu
    $hasSubmenu.find('> a').on('keydown', function(e) {
        const $this = $(this);
        const $parentItem = $this.parent('.nav-item');
        const $currentMegaMenu = $parentItem.find('.mega-menu');
        const $focusableElements = $currentMegaMenu.find('a, button');
        const firstFocusable = $focusableElements.first();
        const lastFocusable = $focusableElements.last();

        // Open mega menu on Enter or Space
        if ((e.key === 'Enter' || e.key === ' ') && !$hamburger.is(':visible')) {
            e.preventDefault();
            $parentItem.toggleClass('active'); // Toggle active class on parent nav-item
            if ($parentItem.hasClass('active')) {
                firstFocusable.focus();
            }
            // Close other open submenus
            $hasSubmenu.not($parentItem).removeClass('active');
        }

        // Close mega menu on Escape
        if (e.key === 'Escape' && $parentItem.hasClass('active')) {
            e.preventDefault();
            $parentItem.removeClass('active');
            $this.focus();
        }

        // Trap focus within mega menu
        if ($parentItem.hasClass('active')) {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if ($(document.activeElement).is(firstFocusable)) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else { // Tab
                    if ($(document.activeElement).is(lastFocusable)) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        }
    });

    // Close mega menu when clicking outside (for desktop)
    // Close mega menu when clicking outside (for desktop)
    $(document).on('click', function(event) {
        if (!$hamburger.is(':visible') && !$mainNav.is(event.target) && $mainNav.has(event.target).length === 0) {
            $hasSubmenu.removeClass('active'); // Close all submenus
        }
    });

    // Handle responsive menu display
    $(window).on('resize', function() {
        if (!$hamburger.is(':visible')) { // Desktop view
            $navList.removeClass('active');
            $('body').removeClass('no-scroll');
        } else { // Mobile view
            $hasSubmenu.removeClass('active'); // Ensure all submenus are closed on mobile if open
        }
    }).trigger('resize'); // Trigger on load to set initial state
});

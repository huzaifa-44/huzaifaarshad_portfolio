// XML parsing and dynamic loading of technology icons

$(document).ready(function() {
    const $techIconsGrid = $('#tech-icons-grid');

    function loadTechnologies() {
        $.ajax({
            type: 'GET',
            url: 'data/technologies.xml',
            dataType: 'xml',
            success: function(xml) {
                $(xml).find('category').each(function() {
                    const categoryName = $(this).attr('name');
                    // Optionally add category headers if desired
                    // $techIconsGrid.append(`<h3>${categoryName}</h3>`);

                    $(this).find('tech').each(function() {
                        const techName = $(this).find('name').text();
                        const techIcon = $(this).find('icon').text();
                        const techDescription = $(this).find('description').text();

                        const techItem = `
                            <div class="tech-icon-item">
                                <img src="${techIcon}" alt="${techName} Icon">
                                <span>${techName}</span>
                                <div class="tech-tooltip">${techDescription}</div>
                            </div>
                        `;
                        $techIconsGrid.append(techItem);
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error('Error loading technologies.xml:', status, error);
                $techIconsGrid.append('<p>Failed to load technologies. Please try again later.</p>');
            }
        });
    }

    loadTechnologies();
});

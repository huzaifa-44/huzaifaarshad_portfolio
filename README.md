# Kaelorva Solution - Premium Portfolio Website

This is a single-page portfolio website for Kaelorva Solution, built with HTML5, CSS3, Vanilla JavaScript, jQuery, and XML.

## Running the Project

1. Clone the repository.
2. Open `index.html` in your browser to view the website.
3. To run the API stubs for the contact and newsletter forms, navigate to the `server` directory and run the following commands:
   ```bash
   npm install express
   node index.js
   ```

## Editing

- **Colors and styles**: Edit the CSS variables in `css/styles.css`.
- **Technology stack**: Modify the `data/technologies.xml` file to add, remove, or update technologies.
- **3D Scene**: Adjust the parameters in `js/hero-scene.js` to change the particle count, colors, and seeds for the generative background.

## Accessibility

This website is designed with accessibility in mind. It respects `prefers-reduced-motion` and provides ARIA labels for interactive elements. All interactive elements are keyboard accessible.

## Design Notes

The current implementation uses a lightweight Three.js particle system for the hero background. For a more immersive experience, you can replace this with heavier GLTF models. The `js/hero-scene.js` file is designed to be modular, so you can easily swap out the scene with a different one.

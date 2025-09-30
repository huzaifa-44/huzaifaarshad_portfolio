const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', (req, res) => {
    console.log('Contact form submission:', req.body);
    res.json({ message: 'Message received!' });
});

app.post('/api/newsletter', (req, res) => {
    console.log('Newsletter signup:', req.body);
    res.json({ message: 'Thank you for subscribing!' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();

// Define route for rendering EJS template
router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to our website' });
});

router.get('/students', function(req, res) {
    res.render('students'); // renders students.ejs
  });

// Define route for sending text response
router.get('/text', (req, res) => {
    res.send('This is the home page');
});

// Export router
module.exports = router;

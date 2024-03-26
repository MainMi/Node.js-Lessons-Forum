const express = require('express');
const app = express();
const port = 3001;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Define routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Listen for requests on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

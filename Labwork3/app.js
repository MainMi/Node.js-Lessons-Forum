const express = require('express');
const path = require('path');

const app = express();
const config = require('./config/config');
const renderType = require('./constants/renderType')

app.set('view engine', 'ejs');

const apiRouter = require('./routes/apiRouter');
app.use('/', apiRouter);

app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    const { path, title, message, cssPath } = renderType.error.notFound
    res.render( path, { title, message, cssPath })
});

app.listen(config.PORT, () => {
    console.log(`Server running. Use our API on port: ${config.PORT}`);
});

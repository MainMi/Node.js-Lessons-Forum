const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const config = require('./config/config');
const renderType = require('./constants/renderType');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const { apiRouter, frontendRouter } = require('./router');
app.use('/api', apiRouter);
app.use('/', frontendRouter);

app.use(_mainErrorHandler);

app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    const { path, title, message, cssPath } = renderType.error.notFound
    res.render( path, { title, message, cssPath })
});

app.listen(config.PORT, () => {
    console.log(`Server running. Use our API on port: ${config.PORT}`);
});

function _mainErrorHandler(err, req, res, next) {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'test' || NODE_ENV === 'test-dev') {
        console.log('****************************');
        console.log(err);
        console.log('****************************');
    }
    res.status(err.status || 500).json({
        status: err.status || 500,
        errorStatus: err.errorStatus || 0,
        message: err.message || '',
    });
}

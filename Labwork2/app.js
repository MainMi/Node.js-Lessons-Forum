const express = require('express');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

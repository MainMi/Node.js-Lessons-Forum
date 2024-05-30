const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const config = require('./config/config');
const sequelize = require('./database')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { User, Topic, Comment, OAuth } = require('./models');

User.hasMany(Topic, { foreignKey: 'userId' });
Topic.belongsTo(User, { foreignKey: 'userId', as: 'createdByUser' });
Topic.belongsTo(User, { foreignKey: 'editedByUserId', as: 'editedByUser' });
Topic.belongsTo(User, { foreignKey: 'deletedByUserId', as: 'deletedByUser' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'createdByUser' });
Comment.belongsTo(User, { foreignKey: 'editedByUserId', as: 'editedByUser' });
Comment.belongsTo(User, { foreignKey: 'deletedByUserId', as: 'deletedByUser' });

Topic.hasMany(Comment, { foreignKey: 'topicId' });
Comment.belongsTo(Topic, { foreignKey: 'topicId' });

User.hasMany(OAuth, { foreignKey: 'userId' });
OAuth.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });

const apiRouter = require('./router/api.router');
app.use('/api', apiRouter);

app.use(_mainErrorHandler);

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

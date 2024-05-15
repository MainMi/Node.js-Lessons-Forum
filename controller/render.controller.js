const renderType = require('../constants/renderType');

module.exports = {
    defaultRenderPage: (req, res) => {
        const { path, title, message, cssPath } = renderType.home.default
        res.render(path, { title, message, cssPath });
    }
};

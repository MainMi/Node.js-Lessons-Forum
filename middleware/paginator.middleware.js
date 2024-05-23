const { validateWith } = require("../helpers");
const { getPaginatedValidator } = require("../validator");
const { checkIfAdminDynamically } = require("./user.middleware");

module.exports = {
    isPaginatedParamsValid: validateWith(getPaginatedValidator, 'query'),

    isAdminIfDeletedDataRequested: checkIfAdminDynamically('query', 'skipDeleted')
};
